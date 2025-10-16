"use client";

import { KpiCard } from "@/components/KpiCard";

export default function KpisPage() {
  const kpis = [
    { label: "MFA Cobertura", value: "40%", hint: "Meta 90% / 180d", trend: "up" },
    { label: "EDR Cobertura", value: "55%", hint: "Meta 90% / 180d", trend: "up" },
    { label: "Patches ≤7d", value: "30%", hint: "Meta 85% / 180d", trend: "down" },
    { label: "Phishing Click", value: "18%", hint: "< 5% / 180d", trend: "down" },
    { label: "Incidentes Críticos", value: "3", hint: "Este mês", trend: "neutral" },
    { label: "Tempo Médio Resposta", value: "2.4h", hint: "MTTR / Críticos", trend: "up" },
    { label: "Vulnerabilidades Altas", value: "12", hint: "Pendentes", trend: "down" },
    { label: "Políticas Ativas", value: "8", hint: "15 planejadas", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-uni-blue">Indicadores de Desempenho (KPIs)</h1>
          <p className="text-sm text-gray-600 mt-1">Monitoramento de métricas e metas de segurança</p>
        </div>
        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue">
          <option>Últimos 30 dias</option>
          <option>Últimos 90 dias</option>
          <option>Últimos 180 dias</option>
          <option>Este ano</option>
        </select>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Categorias de KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controles Técnicos */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Controles Técnicos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">MFA Habilitado</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-uni-blue" style={{ width: "40%" }}></div>
                </div>
                <span className="text-sm font-semibold">40%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">EDR Instalado</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-uni-blue" style={{ width: "55%" }}></div>
                </div>
                <span className="text-sm font-semibold">55%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Backup Funcional</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "85%" }}></div>
                </div>
                <span className="text-sm font-semibold">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Firewall Atualizado</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "95%" }}></div>
                </div>
                <span className="text-sm font-semibold">95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gestão de Vulnerabilidades */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestão de Vulnerabilidades</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-red-900">Críticas</p>
                <p className="text-xs text-red-600">Ação imediata</p>
              </div>
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-orange-900">Altas</p>
                <p className="text-xs text-orange-600">Prazo: 7 dias</p>
              </div>
              <span className="text-2xl font-bold text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-yellow-900">Médias</p>
                <p className="text-xs text-yellow-600">Prazo: 30 dias</p>
              </div>
              <span className="text-2xl font-bold text-yellow-600">28</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-blue-900">Baixas</p>
                <p className="text-xs text-blue-600">Prazo: 90 dias</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">45</span>
            </div>
          </div>
        </div>

        {/* Treinamento e Conscientização */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treinamento</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Treinamento Anual Completo</span>
              <span className="text-sm font-semibold text-green-600">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Simulações Phishing</span>
              <span className="text-sm font-semibold text-orange-600">18% click</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Certificações SecOps</span>
              <span className="text-sm font-semibold">3/5</span>
            </div>
          </div>
        </div>

        {/* Tempo de Resposta */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tempo de Resposta</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">MTTD (Tempo para Detectar)</span>
                <span className="text-sm font-semibold">1.2h</span>
              </div>
              <div className="text-xs text-gray-500">Meta: &lt; 2h</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">MTTR (Tempo para Resolver)</span>
                <span className="text-sm font-semibold">4.5h</span>
              </div>
              <div className="text-xs text-gray-500">Meta: &lt; 4h</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">MTBF (Tempo Entre Falhas)</span>
                <span className="text-sm font-semibold">168h</span>
              </div>
              <div className="text-xs text-gray-500">7 dias</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
