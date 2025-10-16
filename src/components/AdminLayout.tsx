import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";
import { HelpModal } from "@/components/HelpModal";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Administrativo */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/dashboard" className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow group-hover:shadow-lg transition-all duration-200">
              <img src="/logo_unilicungo.png" alt="UniLicungo Logo" className="h-8 w-8 sm:h-9 sm:w-9 object-contain filter brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 text-sm sm:text-base lg:text-lg leading-tight group-hover:text-primary-700 transition-colors">
                Portal de Cibersegurança
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Universidade Licungo
              </span>
            </div>
          </Link>
          <nav className="hidden lg:flex gap-1 text-sm items-center">
            <Link href="/dashboard" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Dashboard</Link>
            <Link href="/policies" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Políticas</Link>
            <Link href="/risks" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Riscos</Link>
            <Link href="/incidents" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Incidentes</Link>
            <Link href="/exceptions" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Exceções</Link>
            <Link href="/vendors" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Fornecedores</Link>
            <Link href="/kpis" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">KPIs</Link>
            <Link href="/admin/users" className="px-3 py-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">Usuários</Link>
            <div className="ml-2 pl-4 border-l border-slate-200">
              <UserMenu />
            </div>
          </nav>
          <div className="lg:hidden">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Universidade Licungo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="font-medium">Programa de Cibersegurança</span>
              <span>•</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão de Ajuda Flutuante */}
      <HelpModal />
    </div>
  );
}
