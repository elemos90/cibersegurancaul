import Link from "next/link";

export default function AlertasPage() {
  return (
    <div>
      {/* Header - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-400/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-300">Sistema de Monitoramento Ativo</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-orange-100 to-red-200 bg-clip-text text-transparent drop-shadow-lg">
                    Alertas de
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Segurança</span>
                </h1>

                <p className="text-lg md:text-xl text-orange-100 leading-relaxed">
                  Fique informado sobre as últimas ameaças e avisos de segurança que afetam a comunidade UniLicungo.
                  <span className="text-red-300 font-semibold"> Proteção em tempo real.</span>
                </p>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Bell/Alert Icon */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-orange-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Exclamation Icon */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Eye (Monitoring) */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Radar Icon */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alertas Críticos */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="badge badge-danger text-base px-4 py-2">ALERTAS CRÍTICOS</span>
            <span className="text-sm text-slate-600">Requerem ação imediata</span>
          </div>

          <div className="space-y-4">
            {/* Alerta 1 */}
            <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-danger">CRÍTICO</span>
                    <span className="text-xs text-red-700 font-medium">15 Out 2025 - 14:30</span>
                  </div>
                  <h3 className="font-bold text-red-900 text-lg mb-2">
                    🚨 Nova Campanha de Phishing Detectada
                  </h3>
                  <p className="text-red-800 text-sm mb-3">
                    Foram detectados emails fraudulentos se passando pela reitoria da UniLicungo 
                    solicitando atualização urgente de dados bancários. Os emails têm assunto 
                    "URGENTE: Atualização Cadastral Obrigatória" e contêm links maliciosos.
                  </p>
                  <div className="bg-red-100 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-red-900 mb-1">⚠️ O QUE FAZER:</p>
                    <ul className="text-xs text-red-800 space-y-1">
                      <li>• NÃO clique em nenhum link</li>
                      <li>• NÃO forneça informações pessoais ou bancárias</li>
                      <li>• Delete o email imediatamente</li>
                      <li>• Reporte usando nosso formulário</li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/reportar" className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                      Reportar Se Recebeu
                    </Link>
                    <button className="btn btn-sm btn-secondary">
                      Ver Detalhes Completos
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerta 2 */}
            <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-danger">CRÍTICO</span>
                    <span className="text-xs text-red-700 font-medium">12 Out 2025 - 09:15</span>
                  </div>
                  <h3 className="font-bold text-red-900 text-lg mb-2">
                    🦠 Ransomware Ativo em Moçambique
                  </h3>
                  <p className="text-red-800 text-sm mb-3">
                    Detectada variante de ransomware afetando instituições educacionais em Moçambique.
                    Certifique-se de que seus backups estão atualizados e não abra anexos desconhecidos.
                  </p>
                  <button className="btn btn-sm btn-secondary">
                    Ler Mais
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avisos Importantes */}
      <section className="py-12 bg-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="badge badge-warning text-base px-4 py-2">AVISOS IMPORTANTES</span>
            <span className="text-sm text-slate-600">Requerem atenção</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card border-l-4 border-amber-500">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-warning">IMPORTANTE</span>
                  <span className="text-xs text-slate-600">10 Out 2025</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Nova Política de Senhas - Prazo 01/Nov
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Todas as contas devem ativar MFA até 1º de novembro. Contas sem MFA serão bloqueadas.
                </p>
                <Link href="/politicas" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver Política →
                </Link>
              </div>
            </div>

            <div className="card border-l-4 border-amber-500">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-warning">IMPORTANTE</span>
                  <span className="text-xs text-slate-600">08 Out 2025</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Manutenção Programada - Sistema de Email
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Manutenção no sábado (14/10) das 22h às 02h. Email pode ficar indisponível.
                </p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Mais Informações →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias Recentes */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
            📰 Notícias e Atualizações
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-primary">Política</span>
                  <span className="text-xs text-slate-500">05 Out 2025</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Atualização das Diretrizes de LGPD
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Novas diretrizes para tratamento de dados pessoais conforme LGPD
                </p>
                <Link href="/noticias/lgpd-update" className="text-primary-600 text-sm font-medium">
                  Ler Mais →
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-success">Evento</span>
                  <span className="text-xs text-slate-500">01 Out 2025</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Semana de Conscientização em Outubro
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Palestras e workshops sobre segurança durante todo o mês
                </p>
                <button className="text-primary-600 text-sm font-medium">
                  Ver Programação →
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-slate-100 text-slate-700 border-slate-200">Tecnologia</span>
                  <span className="text-xs text-slate-500">28 Set 2025</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Novo Sistema de Autenticação
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Implementação de novo sistema de autenticação multifator
                </p>
                <button className="text-primary-600 text-sm font-medium">
                  Ler Mais →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inscrever-se para Alertas */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Receba Alertas por Email
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Seja notificado imediatamente sobre ameaças críticas
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="seu.email@unilicungo.ac.mz" 
              className="input flex-1 text-slate-900"
            />
            <button type="submit" className="btn btn-lg bg-white text-primary-700 hover:bg-slate-100">
              Inscrever-se
            </button>
          </form>
          <p className="text-sm text-primary-100 mt-4">
            Apenas emails instituais @unilicungo.ac.mz
          </p>
        </div>
      </section>
    </div>
  );
}
