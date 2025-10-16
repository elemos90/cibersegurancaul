"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

interface HelpContent {
  title: string;
  description: string;
  responsibilities: string[];
  canDo: string[];
  cannotDo: string[];
  quickActions: { label: string; path: string }[];
}

const helpContentByRole: Record<string, HelpContent> = {
  admin: {
    title: "Administrador",
    description: "Você é o responsável máximo pela governança de cibersegurança da instituição.",
    responsibilities: [
      "Definir estratégia de cibersegurança da universidade",
      "Aprovar e publicar políticas de segurança",
      "Gerir todos os utilizadores do portal",
      "Aceitar riscos residuais e aprovar mitigações",
      "Aprovar exceções de segurança",
      "Reportar ao Reitor sobre estado da segurança",
    ],
    canDo: [
      "✅ Criar, editar e aprovar políticas",
      "✅ Criar e aceitar riscos",
      "✅ Fechar incidentes críticos",
      "✅ Aprovar exceções de segurança",
      "✅ Gerir todos os usuários do sistema",
      "✅ Configurar integrações e alertas",
      "✅ Gerar relatórios executivos",
    ],
    cannotDo: [],
    quickActions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Gerir Usuários", path: "/admin/users" },
      { label: "Políticas", path: "/policies" },
      { label: "Riscos", path: "/risks" },
      { label: "KPIs", path: "/kpis" },
    ],
  },
  secops: {
    title: "SecOps - Operações de Segurança",
    description: "Você é responsável pelas operações diárias de segurança e resposta a incidentes.",
    responsibilities: [
      "Monitorizar alertas de segurança 24/7",
      "Investigar e responder a incidentes",
      "Realizar varreduras de vulnerabilidades",
      "Identificar e registar riscos operacionais",
      "Coordenar resposta com equipe TI",
      "Produzir relatórios técnicos e post-mortem",
    ],
    canDo: [
      "✅ Criar e editar riscos operacionais",
      "✅ Criar, investigar e resolver incidentes",
      "✅ Visualizar e comentar políticas",
      "✅ Operar ferramentas de segurança",
      "✅ Gerar relatórios técnicos",
      "✅ Conduzir testes de segurança",
    ],
    cannotDo: [
      "⛔ Aprovar políticas (apenas sugerir)",
      "⛔ Aceitar riscos (apenas identificar)",
      "⛔ Fechar incidentes críticos (escalar para Admin)",
      "⛔ Aprovar exceções (apenas comentar)",
      "⛔ Gerir utilizadores do portal",
    ],
    quickActions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Incidentes", path: "/incidents" },
      { label: "Riscos", path: "/risks" },
      { label: "Políticas", path: "/policies" },
    ],
  },
  ti: {
    title: "TI - Tecnologia da Informação",
    description: "Você é responsável pela implementação técnica dos controles de segurança.",
    responsibilities: [
      "Aplicar patches de segurança em sistemas",
      "Configurar firewalls e controles de rede",
      "Implementar MFA e backups",
      "Remediar vulnerabilidades identificadas",
      "Provisionar e desprovisionar contas",
      "Implementar exceções aprovadas",
    ],
    canDo: [
      "✅ Visualizar incidentes atribuídos a você",
      "✅ Atualizar status de remediação técnica",
      "✅ Comentar em riscos e mitigações",
      "✅ Implementar controles de exceções",
      "✅ Visualizar KPIs técnicos",
      "✅ Gerar relatórios de conformidade técnica",
    ],
    cannotDo: [
      "⛔ Criar riscos ou políticas",
      "⛔ Aprovar exceções (apenas implementar)",
      "⛔ Investigar incidentes (suporte ao SecOps)",
      "⛔ Gerir utilizadores no portal",
    ],
    quickActions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Incidentes", path: "/incidents" },
      { label: "Exceções", path: "/exceptions" },
      { label: "KPIs Técnicos", path: "/kpis" },
    ],
  },
  dono_dado: {
    title: "Dono de Dados",
    description: "Você é responsável pela governança e proteção dos dados da sua área funcional.",
    responsibilities: [
      "Classificar dados da sua área",
      "Autorizar acessos a dados sensíveis",
      "Garantir conformidade com LGPD",
      "Solicitar exceções quando necessário",
      "Aceitar riscos da sua área",
      "Avaliar fornecedores que processam seus dados",
    ],
    canDo: [
      "✅ Criar riscos de privacidade da sua área",
      "✅ Aceitar riscos da sua área específica",
      "✅ Solicitar exceções de segurança",
      "✅ Avaliar fornecedores de dados",
      "✅ Visualizar incidentes com dados da sua área",
      "✅ Gerar relatórios de conformidade",
    ],
    cannotDo: [
      "⛔ Aprovar exceções (apenas solicitar)",
      "⛔ Gerir utilizadores do portal",
      "⛔ Criar políticas institucionais",
      "⛔ Aceitar riscos de outras áreas",
    ],
    quickActions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Riscos da Minha Área", path: "/risks" },
      { label: "Exceções", path: "/exceptions" },
      { label: "Fornecedores", path: "/vendors" },
    ],
  },
  auditoria: {
    title: "Auditoria",
    description: "Você é responsável pela verificação independente da eficácia dos controles de segurança.",
    responsibilities: [
      "Auditar todos os processos de segurança",
      "Verificar conformidade com políticas e normas",
      "Avaliar eficácia de controles",
      "Revisar investigações de incidentes",
      "Auditar fornecedores críticos",
      "Produzir relatórios de auditoria",
    ],
    canDo: [
      "✅ Visualizar TODO o sistema (leitura)",
      "✅ Acessar logs de auditoria completos",
      "✅ Comentar e recomendar melhorias",
      "✅ Auditar fornecedores",
      "✅ Gerar relatórios de auditoria",
      "✅ Avaliar adequação de controles",
    ],
    cannotDo: [
      "⛔ Criar, editar ou excluir QUALQUER item",
      "⛔ Aprovar políticas ou exceções",
      "⛔ Participar de operações (independência)",
      "⛔ Gerir utilizadores",
    ],
    quickActions: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Políticas", path: "/policies" },
      { label: "Riscos", path: "/risks" },
      { label: "Incidentes", path: "/incidents" },
      { label: "Fornecedores", path: "/vendors" },
    ],
  },
};

export function HelpModal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) return null;

  const papel = (session.user as any).papel || "ti";
  const content = helpContentByRole[papel] || helpContentByRole.ti;

  return (
    <>
      {/* Botão de Ajuda */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        title="Precisa de ajuda?"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-800 text-white px-6 py-5 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold">{content.title}</h2>
                        <p className="text-primary-100 text-sm">Guia de Ajuda - Seu Perfil</p>
                      </div>
                    </div>
                    <p className="text-primary-50 text-sm leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-4 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Responsabilidades */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Suas Responsabilidades
                  </h3>
                  <ul className="space-y-2">
                    {content.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-primary-600 mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* O que você pode fazer */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    O Que Você Pode Fazer
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {content.canDo.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                          <span className="mt-0.5">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* O que você NÃO pode fazer */}
                {content.cannotDo.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                      </svg>
                      Limitações do Seu Perfil
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {content.cannotDo.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-red-800">
                            <span className="mt-0.5">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {/* Ações Rápidas */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    Acesso Rápido
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {content.quickActions.map((action, index) => (
                      <a
                        key={index}
                        href={action.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-lg transition-all text-sm font-medium text-slate-700 hover:text-primary-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        {action.label}
                      </a>
                    ))}
                  </div>
                </section>

                {/* Dica */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">💡 Dica Importante</p>
                      <p className="text-sm text-blue-800">
                        Se precisar de permissões adicionais ou tiver dúvidas sobre suas responsabilidades, 
                        entre em contato com o Administrador do sistema ou consulte a documentação completa 
                        em <span className="font-mono bg-blue-100 px-1 rounded">PERFIS_USUARIOS.md</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-slate-50 px-6 py-4 rounded-b-2xl border-t border-slate-200 flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  Seu perfil: <span className="font-semibold text-slate-700">{content.title}</span>
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary btn-sm"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
