import Link from "next/link";

export default function TreinamentoPage() {
  return (
    <div>
      {/* Header - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="text-sm font-medium text-emerald-300">Academia Digital</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-emerald-100 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                    Treinamento em
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Cibersegurança</span>
                </h1>

                <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
                  Desenvolva suas competências em segurança digital através de cursos práticos e certificações reconhecidas.
                  <span className="text-green-300 font-semibold"> Aprenda na prática.</span>
                </p>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Academic Cap Icon */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-emerald-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Certificate Icon */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Chart Bar (Progress) */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>

                  {/* Lightbulb (Learning) */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-teal-500/20 to-teal-600/20 backdrop-blur-sm border border-teal-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-emerald-600">12</div>
              <div className="text-sm text-slate-600">Cursos</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-emerald-600">800+</div>
              <div className="text-sm text-slate-600">Alunos</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-emerald-600">95%</div>
              <div className="text-sm text-slate-600">Conclusão</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-emerald-600">4.8</div>
              <div className="text-sm text-slate-600">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Básicos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge badge-success mb-3">Nível Básico</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              Fundamentos para Todos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-between mb-4">
                  <span className="badge badge-danger">Obrigatório</span>
                  <span className="text-2xl font-bold text-emerald-600">2h</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Fundamentos de Cibersegurança</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Conceitos essenciais de segurança para todos os usuários
                </p>
                <Link href="/treinamento/fundamentos" className="btn btn-primary btn-sm w-full">
                  Começar Curso
                </Link>
              </div>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-between mb-4">
                  <span className="badge badge-warning">Recomendado</span>
                  <span className="text-2xl font-bold text-emerald-600">1.5h</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Conscientização em Segurança</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Identifique e evite ameaças digitais comuns
                </p>
                <Link href="/treinamento/conscientizacao" className="btn btn-primary btn-sm w-full">
                  Começar Curso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificação */}
      <section className="py-16 bg-emerald-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Certificação em Cibersegurança UniLicungo
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Complete todos os módulos obrigatórios e receba seu certificado oficial
          </p>
          <Link href="/treinamento/certificacao" className="btn btn-primary btn-lg">
            Ver Requisitos para Certificação
          </Link>
        </div>
      </section>
    </div>
  );
}
