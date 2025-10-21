import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("🔐 [Auth] Iniciando autenticação...");
          
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ [Auth] Credenciais vazias");
            return null;
          }

          console.log("📧 [Auth] Email:", credentials.email);

          // Validar domínio institucional
          /*if (!credentials.email.endsWith("@unilicungo.ac.mz")) {
            return null;
          }*/

          console.log("🔍 [Auth] Buscando usuário no banco...");
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            console.log("❌ [Auth] Usuário não encontrado no banco");
            return null;
          }

          console.log("✅ [Auth] Usuário encontrado:", user.id, user.email);

          if (!user.password) {
            console.log("❌ [Auth] Usuário sem senha cadastrada");
            return null;
          }

          console.log("🔑 [Auth] Verificando senha...");
          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("❌ [Auth] Senha inválida");
            return null;
          }

          console.log("✅ [Auth] Autenticação bem-sucedida!");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            papel: user.papel,
            mustChangePassword: user.mustChangePassword,
          };
        } catch (error) {
          console.error("❌ [Auth] ERRO:", error);
          console.error("❌ [Auth] Stack:", (error as Error).stack);
          return null;
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Se está fazendo login, redirecionar para dashboard
      if (url === baseUrl || url === baseUrl + "/") {
        return baseUrl + "/dashboard";
      }
      // Se a URL é relativa, usar baseUrl
      if (url.startsWith("/")) return baseUrl + url;
      // Se a URL começa com baseUrl, retornar como está
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + "/dashboard";
    },
    async jwt({ token, user, trigger }) {
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.papel = (user as any).papel || "ti";
          token.mustChangePassword = (user as any).mustChangePassword || false;
        }
        
        // Recarregar dados do usuário do banco quando necessário
        if (trigger === "update" && token.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string }
          });
          if (dbUser) {
            token.mustChangePassword = dbUser.mustChangePassword;
            token.papel = dbUser.papel;
          }
        }
        
        return token;
      } catch (error) {
        console.error("❌ [Auth] Erro no callback JWT:", error);
        // Retornar token mesmo com erro para não quebrar a sessão
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (session.user && token) {
          (session.user as any).id = token.id;
          (session.user as any).email = token.email;
          (session.user as any).name = token.name;
          (session.user as any).papel = token.papel;
          (session.user as any).mustChangePassword = token.mustChangePassword;
        }
        return session;
      } catch (error) {
        console.error("❌ [Auth] Erro no callback session:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  // ⚠️ TEMPORÁRIO: Debug habilitado para diagnóstico em produção
  // Mudar para false após resolver problemas de autenticação
  debug: true,
  
  // Eventos para logging
  events: {
    async signIn({ user }) {
      console.log("✅ [Auth] Login bem-sucedido:", user.email);
    },
    async signOut({ session }) {
      console.log("🚪 [Auth] Logout:", (session?.user as any)?.email);
    },
  },
};
