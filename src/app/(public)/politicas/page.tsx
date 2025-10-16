import Link from "next/link";

export default function PoliticasPage() {
  const policies = {
    gerais: [
      {
        title: "Política de Segurança da Informação",
        date: "Rev. Outubro 2025",
        description: "Diretrizes gerais para proteção da informação na UniLicungo",
        pdf: "/docs/politica-seguranca-info-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Uso Aceitável",
        date: "Rev. Setembro 2025",
        description: "Regras para uso apropriado de recursos de TI",
        pdf: "/docs/politica-uso-aceitavel-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Classificação de Dados",
        date: "Rev. Agosto 2025",
        description: "Como classificar e proteger diferentes tipos de dados",
        pdf: "/docs/politica-classificacao-dados-2025.pdf",
        status: "Ativa"
      }
    ],
    tecnicas: [
      {
        title: "Política de Senhas e Autenticação",
        date: "Rev. Outubro 2025",
        description: "Requisitos para criação e gerenciamento de senhas",
        pdf: "/docs/politica-senhas-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Backup e Recuperação",
        date: "Rev. Setembro 2025",
        description: "Procedimentos de backup e recuperação de desastres",
        pdf: "/docs/politica-backup-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Controle de Acesso",
        date: "Rev. Agosto 2025",
        description: "Gestão de acessos e permissões em sistemas",
        pdf: "/docs/politica-controle-acesso-2025.pdf",
        status: "Ativa"
      }
    ],
    compliance: [
      {
        title: "Política de Privacidade e LGPD",
        date: "Rev. Outubro 2025",
        description: "Conformidade com a Lei Geral de Proteção de Dados",
        pdf: "/docs/politica-privacidade-lgpd-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Gestão de Incidentes",
        date: "Rev. Setembro 2025",
        description: "Procedimentos para resposta a incidentes de segurança",
        pdf: "/docs/politica-incidentes-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Política de Auditoria e Compliance",
        date: "Rev. Julho 2025",
        description: "Processos de auditoria e conformidade regulatória",
        pdf: "/docs/politica-auditoria-2025.pdf",
        status: "Ativa"
      }
    ],
    standards: [
      {
        title: "Standard de Criptografia",
        date: "Rev. Outubro 2025",
        description: "Padrões de criptografia para proteção de dados",
        pdf: "/docs/standard-criptografia-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Procedimento de Resposta a Incidentes",
        date: "Rev. Setembro 2025",
        description: "Passos detalhados para resposta a incidentes",
        pdf: "/docs/procedimento-resposta-incidentes-2025.pdf",
        status: "Ativa"
      },
      {
        title: "Procedimento de Gestão de Vulnerabilidades",
        date: "Rev. Agosto 2025",
        description: "Processo de identificação e correção de vulnerabilidades",
        pdf: "/docs/procedimento-vulnerabilidades-2025.pdf",
        status: "Ativa"
      }
    ]
  };

  return (
    <div>
      {/* Header da Página - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="text-sm font-medium text-blue-300">Documentação Oficial</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-primary-200 bg-clip-text text-transparent drop-shadow-lg">
                    Políticas de
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Cibersegurança</span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                  Conheça todas as políticas, standards e procedimentos de segurança da UniLicungo. 
                  <span className="text-primary-300 font-semibold"> Documentos revisados e atualizados regularmente.</span>
                </p>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-blue-500/30 to-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Document Icon */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-blue-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Shield Check */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Clipboard List */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Badge Check */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Busca e Filtros */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="search" 
                  placeholder="Buscar políticas..." 
                  className="input pl-10 w-full"
                />
              </div>
            </div>
            <select className="input md:w-48">
              <option>Todas as Categorias</option>
              <option>Políticas Gerais</option>
              <option>Políticas Técnicas</option>
              <option>Compliance</option>
              <option>Standards</option>
            </select>
            <select className="input md:w-32">
              <option>Todas</option>
              <option>Ativas</option>
              <option>Em Revisão</option>
              <option>Arquivadas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Políticas Gerais */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              📋 Políticas Gerais
            </h2>
            <p className="text-slate-600">
              Diretrizes fundamentais de segurança aplicáveis a toda comunidade UniLicungo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.gerais.map((policy, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge badge-success">{policy.status}</span>
                    <span className="text-xs text-slate-500">{policy.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {policy.description}
                  </p>
                  <div className="flex gap-2">
                    <a href={policy.pdf} className="btn btn-primary btn-sm flex-1" download>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      PDF
                    </a>
                    <button className="btn btn-secondary btn-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Políticas Técnicas */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              ⚙️ Políticas Técnicas
            </h2>
            <p className="text-slate-600">
              Políticas específicas para gestão técnica de segurança da informação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.tecnicas.map((policy, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge badge-success">{policy.status}</span>
                    <span className="text-xs text-slate-500">{policy.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {policy.description}
                  </p>
                  <div className="flex gap-2">
                    <a href={policy.pdf} className="btn btn-primary btn-sm flex-1" download>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      PDF
                    </a>
                    <button className="btn btn-secondary btn-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance e Privacidade */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              🔒 Compliance e Privacidade
            </h2>
            <p className="text-slate-600">
              Conformidade regulatória e proteção de dados pessoais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.compliance.map((policy, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge badge-success">{policy.status}</span>
                    <span className="text-xs text-slate-500">{policy.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {policy.description}
                  </p>
                  <div className="flex gap-2">
                    <a href={policy.pdf} className="btn btn-primary btn-sm flex-1" download>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      PDF
                    </a>
                    <button className="btn btn-secondary btn-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards e Procedimentos */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              📏 Standards e Procedimentos
            </h2>
            <p className="text-slate-600">
              Padrões técnicos e procedimentos operacionais de segurança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.standards.map((policy, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge badge-success">{policy.status}</span>
                    <span className="text-xs text-slate-500">{policy.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {policy.description}
                  </p>
                  <div className="flex gap-2">
                    <a href={policy.pdf} className="btn btn-primary btn-sm flex-1" download>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      PDF
                    </a>
                    <button className="btn btn-secondary btn-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Dúvidas sobre alguma política?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Nossa equipe está pronta para esclarecer todas as suas questões
          </p>
          <Link href="/contato" className="btn btn-primary btn-lg">
            Entrar em Contato
          </Link>
        </div>
      </section>
    </div>
  );
}
