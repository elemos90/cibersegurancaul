import Link from "next/link";

export default function RecursosPage() {
  return (
    <div>
      {/* Header - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-amber-300">Biblioteca Digital</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-amber-100 to-orange-200 bg-clip-text text-transparent drop-shadow-lg">
                    Recursos e
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Manuais</span>
                </h1>

                <p className="text-lg md:text-xl text-amber-100 leading-relaxed">
                  Acesse vídeos educativos, guias práticos, FAQs e outros materiais de segurança.
                  <span className="text-orange-300 font-semibold"> Tudo em um só lugar.</span>
                </p>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Library/Book Stack Icon */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-amber-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Video Icon */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>

                  {/* Question Icon (FAQ) */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Download Icon */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeos Educativos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
            📹 Vídeos Educativos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-slate-200 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2">Como Identificar Phishing</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <span>⏱️ 5:30</span>
                  <span>👁️ 1.2k visualizações</span>
                </div>
                <button className="btn btn-primary btn-sm w-full">Assistir Agora</button>
              </div>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-slate-200 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2">Criando Senhas Seguras</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <span>⏱️ 8:15</span>
                  <span>👁️ 890 visualizações</span>
                </div>
                <button className="btn btn-primary btn-sm w-full">Assistir Agora</button>
              </div>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-slate-200 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2">Proteção de Dados Pessoais</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <span>⏱️ 12:00</span>
                  <span>👁️ 2.1k visualizações</span>
                </div>
                <button className="btn btn-primary btn-sm w-full">Assistir Agora</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guias Práticos */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
            📖 Guias Práticos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/recursos/guias/mobile" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Segurança Mobile</h3>
                  <p className="text-sm text-slate-600">Proteja seu smartphone</p>
                </div>
              </div>
            </Link>

            <Link href="/recursos/guias/pc" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">💻</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Segurança de PC</h3>
                  <p className="text-sm text-slate-600">Configurações essenciais</p>
                </div>
              </div>
            </Link>

            <Link href="/recursos/guias/senhas" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">🔐</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Senhas Fortes</h3>
                  <p className="text-sm text-slate-600">Gestão de senhas</p>
                </div>
              </div>
            </Link>

            <Link href="/recursos/guias/email" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email Seguro</h3>
                  <p className="text-sm text-slate-600">Identifique ameaças</p>
                </div>
              </div>
            </Link>

            <Link href="/recursos/guias/navegacao" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">🌐</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Navegação Segura</h3>
                  <p className="text-sm text-slate-600">Boas práticas online</p>
                </div>
              </div>
            </Link>

            <Link href="/recursos/guias/cloud" className="card hover:shadow-lg transition-shadow">
              <div className="card-body flex items-center gap-4">
                <div className="text-4xl">☁️</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Cloud Security</h3>
                  <p className="text-sm text-slate-600">Segurança na nuvem</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
            ❓ Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            <details className="card">
              <summary className="card-body cursor-pointer font-semibold text-slate-900 hover:text-primary-700">
                O que fazer se clicar em um link suspeito?
              </summary>
              <div className="card-body pt-0 text-sm text-slate-600">
                <p>1. <strong>Não insira nenhuma informação</strong> - Se abriu uma página pedindo dados, feche imediatamente</p>
                <p>2. <strong>Desconecte da rede</strong> - Desative Wi-Fi ou desconecte o cabo de rede</p>
                <p>3. <strong>Execute antivírus</strong> - Faça uma varredura completa</p>
                <p>4. <strong>Reporte imediatamente</strong> - Use nosso formulário de incidentes</p>
                <p>5. <strong>Troque suas senhas</strong> - De outro dispositivo seguro</p>
              </div>
            </details>

            <details className="card">
              <summary className="card-body cursor-pointer font-semibold text-slate-900 hover:text-primary-700">
                Como criar uma senha forte?
              </summary>
              <div className="card-body pt-0 text-sm text-slate-600">
                <p>Uma senha forte deve ter:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Mínimo de 12 caracteres</li>
                  <li>Letras maiúsculas e minúsculas</li>
                  <li>Números e símbolos</li>
                  <li>Não usar informações pessoais</li>
                  <li>Não reutilizar senhas</li>
                </ul>
                <p className="mt-2"><strong>Dica:</strong> Use um gerenciador de senhas!</p>
              </div>
            </details>

            <details className="card">
              <summary className="card-body cursor-pointer font-semibold text-slate-900 hover:text-primary-700">
                O que é autenticação de dois fatores (MFA)?
              </summary>
              <div className="card-body pt-0 text-sm text-slate-600">
                <p>MFA adiciona uma camada extra de segurança além da senha. Requer um segundo fator como:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Código SMS no celular</li>
                  <li>App autenticador (Google/Microsoft)</li>
                  <li>Token físico</li>
                  <li>Biometria (impressão digital/face)</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Não Encontrou o que Procurava?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Entre em contato conosco para sugestões de novos recursos
          </p>
          <Link href="/contato" className="btn btn-primary btn-lg">
            Entrar em Contato
          </Link>
        </div>
      </section>
    </div>
  );
}
