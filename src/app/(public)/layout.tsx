"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Público */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow group-hover:shadow-lg transition-all duration-200">
              <img src="/logo_unilicungo.png" alt="UniLicungo Logo" className="h-6 w-6 sm:h-7 sm:w-7 object-contain filter brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-primary-700 transition-colors">
                Portal de Cibersegurança
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Universidade Licungo
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex gap-1 text-sm items-center">
            <Link href="/" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Início
            </Link>
            <Link href="/politicas" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Políticas
            </Link>
            <Link href="/recursos" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Recursos
            </Link>
            <Link href="/treinamento" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Treinamento
            </Link>
            <Link href="/alertas" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Alertas
            </Link>
            <Link href="/reportar" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              Reportar
            </Link>
            <div className="ml-2 pl-4 border-l border-slate-200">
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-sm">
                  📊 Ir para Dashboard
                </Link>
              ) : (
                <Link href="/auth/signin" className="btn btn-primary btn-sm">
                  🔐 Login Admin
                </Link>
              )}
            </div>
          </nav>

          {/* Botão Menu Mobile */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                🏠 Início
              </Link>
              <Link 
                href="/politicas" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                📋 Políticas
              </Link>
              <Link 
                href="/recursos" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                📚 Recursos
              </Link>
              <Link 
                href="/treinamento" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                🎓 Treinamento
              </Link>
              <Link 
                href="/alertas" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                🚨 Alertas
              </Link>
              <Link 
                href="/reportar" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium"
              >
                ⚠️ Reportar
              </Link>
              
              <div className="pt-3 mt-3 border-t border-slate-200">
                {session ? (
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    📊 Ir para Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/auth/signin" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    🔐 Login Admin
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Conteúdo */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Sobre */}
            <div>
              <h3 className="text-white font-bold mb-4 font-display">Portal de Cibersegurança</h3>
              <p className="text-sm text-slate-400">
                Protegendo a comunidade acadêmica da Universidade Licungo através de políticas, 
                educação e tecnologia.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/politicas" className="hover:text-white transition-colors">Políticas</Link></li>
                <li><Link href="/treinamento" className="hover:text-white transition-colors">Treinamento</Link></li>
                <li><Link href="/recursos" className="hover:text-white transition-colors">Manuais e Guias</Link></li>
                <li><Link href="/alertas" className="hover:text-white transition-colors">Alertas</Link></li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="text-white font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/recursos/videos" className="hover:text-white transition-colors">Vídeos Educativos</Link></li>
                <li><Link href="/recursos/faqs" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
                <li><Link href="/recursos/glossario" className="hover:text-white transition-colors">Glossário</Link></li>
                <li><Link href="/reportar" className="hover:text-white transition-colors">Reportar Incidente</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  security@unilicungo.ac.mz
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +258 12 345 6789 (24/7)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Quelimane, Moçambique
                </li>
                <li className="pt-2">
                  {session ? (
                    <Link href="/dashboard" className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Dashboard Administrativo
                    </Link>
                  ) : (
                    <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Login Administrativo
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Universidade Licungo - Portal de Cibersegurança | Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
