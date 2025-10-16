import Link from "next/link";

export default function PublicHomePage() {
  return (
    <div>
      {/* Hero Section - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-300">Sistema Ativo & Protegido</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
                    Protegendo a Comunidade
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">UniLicungo</span>
                </h1>

                <p className="text-lg md:text-2xl text-blue-100 leading-relaxed">
                  Conheça nossas políticas, práticas e recursos de cibersegurança. 
                  <span className="text-cyan-300 font-semibold"> Juntos construímos um ambiente digital mais seguro.</span>
                </p>

                {/* Security Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-blue-400/20">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400">99.9%</div>
                    <div className="text-xs md:text-sm text-blue-200">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400">24/7</div>
                    <div className="text-xs md:text-sm text-blue-200">Monitoramento</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">ISO</div>
                    <div className="text-xs md:text-sm text-blue-200">27001</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/politicas" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold inline-flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="relative z-10">Ver Políticas</span>
                </Link>

                <Link href="/reportar" className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-red-500/50 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:bg-red-600 hover:border-red-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50">
                  <svg className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="group-hover:text-white transition-colors">Reportar Incidente</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Cybersecurity Illustration */}
            <div className="relative hidden lg:block">
              {/* Main Shield Icon with Glow */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Shield */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-blue-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Lock Icon */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Key Icon */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Network Icon */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>

                  {/* Fingerprint Icon */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
                  <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="50%" x2="15%" y2="70%" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acesso Rápido */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Acesso Rápido
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Encontre rapidamente o que você precisa para manter-se seguro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link href="/reportar" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Reportar Incidente</h3>
                <p className="text-sm text-slate-600">Reporte imediatamente qualquer incidente de segurança</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/politicas" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Políticas de Segurança</h3>
                <p className="text-sm text-slate-600">Acesse todas as políticas de cibersegurança da UniLicungo</p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/treinamento" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Treinamento</h3>
                <p className="text-sm text-slate-600">Cursos e materiais de conscientização em segurança</p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/recursos" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Manuais e Guias</h3>
                <p className="text-sm text-slate-600">Documentação técnica e guias práticos de segurança</p>
              </div>
            </Link>

            {/* Card 5 */}
            <Link href="/alertas" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Alertas de Segurança</h3>
                <p className="text-sm text-slate-600">Últimas ameaças e avisos importantes da comunidade</p>
              </div>
            </Link>

            {/* Card 6 */}
            <Link href="/contato" className="card hover:scale-105 transition-transform group">
              <div className="card-body text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Suporte 24/7</h3>
                <p className="text-sm text-slate-600">Entre em contato com a equipe de segurança</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Alertas e Notícias */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Alertas e Notícias
            </h2>
            <Link href="/alertas" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              Ver todos
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Alerta Crítico */}
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-danger">CRÍTICO</span>
                  <span className="text-xs text-red-700">15 Out 2025</span>
                </div>
                <h3 className="font-bold text-red-900 text-lg mb-2">
                  Nova Campanha de Phishing Detectada
                </h3>
                <p className="text-red-800 text-sm mb-3">
                  Foram detectados emails fraudulentos se passando pela reitoria da UniLicungo solicitando 
                  atualização de dados bancários. NÃO clique em nenhum link e reporte imediatamente.
                </p>
                <Link href="/alertas/phishing-2025-10" className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                  Ler Mais
                </Link>
              </div>
            </div>
          </div>

          {/* Notícias Recentes */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-primary">Política</span>
                  <span className="text-xs text-slate-500">10 Out 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Nova Política de Senhas Implementada
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  A partir de 1º de novembro, todas as contas devem usar autenticação multifator (MFA). 
                  Veja como ativar em sua conta.
                </p>
                <Link href="/noticias/politica-senhas-2025" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                  Ler Mais
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-warning">Treinamento</span>
                  <span className="text-xs text-slate-500">5 Out 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Treinamento Obrigatório para Funcionários
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Todos os funcionários devem completar o curso de "Fundamentos de Cibersegurança" 
                  até 30 de outubro. Certificado digital será emitido.
                </p>
                <Link href="/noticias/treinamento-obrigatorio" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                  Ler Mais
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Dúvidas sobre Cibersegurança?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Nossa equipe está disponível 24/7 para ajudá-lo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recursos/faqs" className="btn btn-lg bg-white text-primary-700 hover:bg-slate-100">
              📚 Ver FAQs
            </Link>
            <Link href="/contato" className="btn btn-lg btn-secondary border-white text-white hover:bg-white/10">
              📞 Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
