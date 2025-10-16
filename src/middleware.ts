import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Rotas públicas que não precisam de autenticação
const publicRoutes = [
  "/",
  "/politicas",
  "/reportar", 
  "/treinamento",
  "/recursos",
  "/alertas",
];

// Rotas de autenticação
const authRoutes = [
  "/auth/signin",
  "/auth/error",
  "/auth/change-password",
];

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // Permitir todas as rotas públicas (landing page)
        if (publicRoutes.includes(pathname)) {
          return true;
        }
        
        // Permitir rotas de autenticação
        if (authRoutes.includes(pathname)) {
          return true;
        }
        
        // Permitir assets e API de autenticação
        if (
          pathname.startsWith("/_next") ||
          pathname.startsWith("/api/auth") ||
          pathname.includes("/favicon.ico") ||
          pathname.includes("/logo_unilicungo.png")
        ) {
          return true;
        }
        
        // Para rotas protegidas (dashboard, policies, risks, etc), verificar se tem token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
