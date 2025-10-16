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
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Validar domínio institucional
          if (!credentials.email.endsWith("@unilicungo.ac.mz")) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            papel: user.papel,
            mustChangePassword: user.mustChangePassword,
          };
        } catch (error) {
          console.error("Erro no authorize:", error);
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
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).email = token.email;
        (session.user as any).name = token.name;
        (session.user as any).papel = token.papel;
        (session.user as any).mustChangePassword = token.mustChangePassword;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Debug apenas em desenvolvimento
};
