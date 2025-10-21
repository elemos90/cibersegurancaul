"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: "Erro de Configuração",
    description: "Há um problema na configuração do servidor. Contacte o administrador.",
  },
  AccessDenied: {
    title: "Acesso Negado",
    description: "Você não tem permissão para acessar este recurso.",
  },
  Verification: {
    title: "Erro de Verificação",
    description: "O token de verificação é inválido ou expirou.",
  },
  CredentialsSignin: {
    title: "Credenciais Inválidas",
    description: "Email ou senha incorretos. Verifique suas credenciais e tente novamente.",
  },
  Default: {
    title: "Erro de Autenticação",
    description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
  },
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  
  const errorInfo = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-uni-light px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        {/* Ícone de erro */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        {/* Título e descrição */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {errorInfo.title}
          </h2>
          <p className="text-gray-600">{errorInfo.description}</p>
        </div>

        {/* Código do erro (para debug) */}
        {process.env.NODE_ENV === "development" && error !== "Default" && (
          <div className="p-3 bg-gray-100 rounded-lg text-sm">
            <p className="text-gray-700 text-center">
              <strong>Código:</strong> {error}
            </p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full px-6 py-3 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors text-center font-semibold"
          >
            Tentar Novamente
          </Link>
          
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors text-center font-semibold"
          >
            Voltar à Página Inicial
          </Link>
        </div>

        {/* Link de suporte */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600">
            Precisa de ajuda?{" "}
            <Link 
              href="/reportar" 
              className="text-uni-blue hover:text-uni-teal font-medium"
            >
              Reporte o problema
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-uni-light">
        <div className="text-center">Carregando...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
