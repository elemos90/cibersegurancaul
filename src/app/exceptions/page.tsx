"use client";

export default function ExceptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-uni-blue">Gestão de Exceções</h1>
          <p className="text-sm text-gray-600 mt-1">Fluxo de aprovação com validade e mitigação</p>
        </div>
        <button className="px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors">
          + Nova Exceção
        </button>
      </div>

      <div className="bg-white rounded-lg border p-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-uni-blue/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-uni-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Módulo em Desenvolvimento</h3>
          <p className="text-sm text-gray-600">
            A gestão de exceções estará disponível em breve. Este módulo permitirá:
          </p>
          <ul className="text-sm text-left text-gray-600 space-y-2">
            <li>✓ Solicitação de exceções a políticas de segurança</li>
            <li>✓ Workflow de aprovação (Solicitante → Gestor → SecOps)</li>
            <li>✓ Controle de validade e renovação</li>
            <li>✓ Planos de mitigação e compensação</li>
            <li>✓ Auditoria de exceções ativas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
