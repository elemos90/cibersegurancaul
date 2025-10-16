"use client";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-uni-blue">Gestão de Fornecedores</h1>
          <p className="text-sm text-gray-600 mt-1">Due diligence, contratos e avaliação de risco</p>
        </div>
        <button className="px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors">
          + Novo Fornecedor
        </button>
      </div>

      <div className="bg-white rounded-lg border p-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-uni-blue/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-uni-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Módulo em Desenvolvimento</h3>
          <p className="text-sm text-gray-600">
            A gestão de fornecedores estará disponível em breve. Este módulo permitirá:
          </p>
          <ul className="text-sm text-left text-gray-600 space-y-2">
            <li>✓ Cadastro de fornecedores e criticidade</li>
            <li>✓ Avaliação de segurança (due diligence)</li>
            <li>✓ Gestão de contratos e DPAs</li>
            <li>✓ Monitoramento de compliance</li>
            <li>✓ Renovação e reavaliação periódica</li>
            <li>✓ Relatórios de terceiros críticos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
