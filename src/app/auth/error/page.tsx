"use client";

import Link from "next/link";

export default function ErrorPage() {
  const message = "Ocorreu um erro ao tentar fazer login. Tente novamente.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-uni-light">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg text-center">
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
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Erro de Autenticação
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>

        <Link
          href="/auth/signin"
          className="inline-block w-full px-6 py-3 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors"
        >
          Tentar Novamente
        </Link>
      </div>
    </div>
  );
}
