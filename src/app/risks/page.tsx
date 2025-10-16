"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Risk = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  probabilidade: string;
  impacto: string;
  nivelRisco: string;
  status: string;
  estrategia?: string;
  responsavel?: string;
  prazo?: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
};

const categorias = [
  { value: "tecnologico", label: "Tecnológico" },
  { value: "humano", label: "Humano" },
  { value: "processo", label: "Processo" },
  { value: "externo", label: "Externo" },
  { value: "compliance", label: "Compliance" },
  { value: "reputacional", label: "Reputacional" }
];

const niveis = [
  { value: "muito_baixo", label: "Muito Baixo", num: 1, color: "green" },
  { value: "baixo", label: "Baixo", num: 2, color: "blue" },
  { value: "medio", label: "Médio", num: 3, color: "yellow" },
  { value: "alto", label: "Alto", num: 4, color: "orange" },
  { value: "muito_alto", label: "Muito Alto", num: 5, color: "red" }
];

const statusOptions = [
  { value: "identificado", label: "Identificado", color: "gray" },
  { value: "em_analise", label: "Em Análise", color: "yellow" },
  { value: "em_tratamento", label: "Em Tratamento", color: "blue" },
  { value: "mitigado", label: "Mitigado", color: "green" },
  { value: "aceito", label: "Aceito", color: "purple" },
  { value: "transferido", label: "Transferido", color: "indigo" }
];

const estrategias = [
  { value: "mitigar", label: "Mitigar" },
  { value: "aceitar", label: "Aceitar" },
  { value: "transferir", label: "Transferir" },
  { value: "evitar", label: "Evitar" }
];

export default function RisksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "tecnologico",
    probabilidade: "medio",
    impacto: "medio",
    status: "identificado",
    estrategia: "",
    planoAcao: "",
    responsavel: "",
    prazo: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      loadRisks();
    }
  }, [filterCategoria, filterStatus, status]);

  const loadRisks = async () => {
    try {
      const params = new URLSearchParams();
      if (filterCategoria) params.append("categoria", filterCategoria);
      if (filterStatus) params.append("status", filterStatus);

      const res = await fetch(`/api/risks?${params}`);
      if (res.ok) {
        const data = await res.json();
        setRisks(data);
      }
    } catch (error) {
      console.error("Erro ao carregar riscos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingRisk ? `/api/risks/${editingRisk.id}` : "/api/risks";
      const method = editingRisk ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadRisks();
        handleCloseModal();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao salvar risco");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar risco");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este risco?")) return;

    try {
      const res = await fetch(`/api/risks/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadRisks();
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const handleEdit = (risk: Risk) => {
    setEditingRisk(risk);
    setFormData({
      titulo: risk.titulo,
      descricao: risk.descricao,
      categoria: risk.categoria,
      probabilidade: risk.probabilidade,
      impacto: risk.impacto,
      status: risk.status,
      estrategia: risk.estrategia || "",
      planoAcao: "",
      responsavel: risk.responsavel || "",
      prazo: risk.prazo ? risk.prazo.split("T")[0] : ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRisk(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "tecnologico",
      probabilidade: "medio",
      impacto: "medio",
      status: "identificado",
      estrategia: "",
      planoAcao: "",
      responsavel: "",
      prazo: ""
    });
  };

  const getNivelColor = (nivel: string) => {
    const n = niveis.find(nv => nv.value === nivel);
    return n?.color || "gray";
  };

  const getNivelLabel = (nivel: string) => {
    return niveis.find(n => n.value === nivel)?.label || nivel;
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-blue"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirecting
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-uni-blue">Gestão de Riscos</h1>
          <p className="text-sm text-gray-600 mt-1">Identificação, análise e tratamento de riscos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors"
        >
          + Novo Risco
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <select
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
        >
          <option value="">Todos os status</option>
          {statusOptions.map(st => (
            <option key={st.value} value={st.value}>{st.label}</option>
          ))}
        </select>
      </div>

      {/* Lista de Riscos */}
      <div className="grid gap-4">
        {risks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">Nenhum risco encontrado</p>
          </div>
        ) : (
          risks.map((risk) => (
            <div key={risk.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{risk.titulo}</h3>
                    <span className={`px-2 py-1 text-xs rounded bg-${getNivelColor(risk.nivelRisco)}-100 text-${getNivelColor(risk.nivelRisco)}-700 font-semibold`}>
                      {getNivelLabel(risk.nivelRisco)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded bg-${statusOptions.find(s => s.value === risk.status)?.color}-100`}>
                      {statusOptions.find(s => s.value === risk.status)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{risk.descricao}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📊 Prob: {getNivelLabel(risk.probabilidade)}</span>
                    <span>💥 Impacto: {getNivelLabel(risk.impacto)}</span>
                    <span>📁 {categorias.find(c => c.value === risk.categoria)?.label}</span>
                    {risk.responsavel && <span>👤 {risk.responsavel}</span>}
                    {risk.prazo && <span>⏰ {new Date(risk.prazo).toLocaleDateString("pt-BR")}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(risk)}
                    className="px-3 py-1 text-sm text-uni-blue hover:bg-uni-blue/10 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(risk.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingRisk ? "Editar Risco" : "Novo Risco"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição*</label>
                <textarea
                  required
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria*</label>
                  <select
                    required
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    {statusOptions.map(st => (
                      <option key={st.value} value={st.value}>{st.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Probabilidade*</label>
                  <select
                    required
                    value={formData.probabilidade}
                    onChange={(e) => setFormData({ ...formData, probabilidade: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    {niveis.map(n => (
                      <option key={n.value} value={n.value}>{n.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impacto*</label>
                  <select
                    required
                    value={formData.impacto}
                    onChange={(e) => setFormData({ ...formData, impacto: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    {niveis.map(n => (
                      <option key={n.value} value={n.value}>{n.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estratégia</label>
                  <select
                    value={formData.estrategia}
                    onChange={(e) => setFormData({ ...formData, estrategia: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    <option value="">Selecione...</option>
                    {estrategias.map(est => (
                      <option key={est.value} value={est.value}>{est.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                  <input
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plano de Ação</label>
                <textarea
                  rows={3}
                  value={formData.planoAcao}
                  onChange={(e) => setFormData({ ...formData, planoAcao: e.target.value })}
                  placeholder="Descreva as ações de tratamento..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prazo</label>
                <input
                  type="date"
                  value={formData.prazo}
                  onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors"
                >
                  {editingRisk ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
