"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Incident = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  severidade: string;
  status: string;
  dataDeteccao: string;
  dataResolucao?: string;
  responsavel?: string;
  sistemaAfetado?: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
};

const categorias = [
  { value: "malware", label: "Malware" },
  { value: "phishing", label: "Phishing" },
  { value: "acesso_nao_autorizado", label: "Acesso Não Autorizado" },
  { value: "perda_dados", label: "Perda de Dados" },
  { value: "ddos", label: "DDoS" },
  { value: "vulnerabilidade", label: "Vulnerabilidade" },
  { value: "violacao_politica", label: "Violação de Política" },
  { value: "outro", label: "Outro" }
];

const severidades = [
  { value: "baixa", label: "Baixa", color: "green" },
  { value: "media", label: "Média", color: "yellow" },
  { value: "alta", label: "Alta", color: "orange" },
  { value: "critica", label: "Crítica", color: "red" }
];

const statusOptions = [
  { value: "aberto", label: "Aberto", color: "red" },
  { value: "em_investigacao", label: "Em Investigação", color: "yellow" },
  { value: "em_resolucao", label: "Em Resolução", color: "blue" },
  { value: "resolvido", label: "Resolvido", color: "green" },
  { value: "fechado", label: "Fechado", color: "gray" }
];

export default function IncidentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterSeveridade, setFilterSeveridade] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "outro",
    severidade: "media",
    status: "aberto",
    dataDeteccao: new Date().toISOString().split("T")[0],
    fonteDeteccao: "",
    acaoImediata: "",
    responsavel: "",
    sistemaAfetado: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      loadIncidents();
    }
  }, [filterCategoria, filterSeveridade, status]);

  const loadIncidents = async () => {
    try {
      const params = new URLSearchParams();
      if (filterCategoria) params.append("categoria", filterCategoria);
      if (filterSeveridade) params.append("severidade", filterSeveridade);

      const res = await fetch(`/api/incidents?${params}`);
      if (res.ok) {
        const data = await res.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error("Erro ao carregar incidentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingIncident ? `/api/incidents/${editingIncident.id}` : "/api/incidents";
      const method = editingIncident ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadIncidents();
        handleCloseModal();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao salvar incidente");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar incidente");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este incidente?")) return;

    try {
      const res = await fetch(`/api/incidents/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadIncidents();
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const handleEdit = (incident: Incident) => {
    setEditingIncident(incident);
    setFormData({
      titulo: incident.titulo,
      descricao: incident.descricao,
      categoria: incident.categoria,
      severidade: incident.severidade,
      status: incident.status,
      dataDeteccao: incident.dataDeteccao ? incident.dataDeteccao.split("T")[0] : "",
      fonteDeteccao: "",
      acaoImediata: "",
      responsavel: incident.responsavel || "",
      sistemaAfetado: incident.sistemaAfetado || ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIncident(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "outro",
      severidade: "media",
      status: "aberto",
      dataDeteccao: new Date().toISOString().split("T")[0],
      fonteDeteccao: "",
      acaoImediata: "",
      responsavel: "",
      sistemaAfetado: ""
    });
  };

  const getSeveridadeColor = (severidade: string) => {
    return severidades.find(s => s.value === severidade)?.color || "gray";
  };

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || "gray";
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
          <h1 className="text-2xl font-semibold text-uni-blue">Gestão de Incidentes</h1>
          <p className="text-sm text-gray-600 mt-1">Deteção, resposta e resolução de incidentes de segurança</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          🚨 Reportar Incidente
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
          value={filterSeveridade}
          onChange={(e) => setFilterSeveridade(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
        >
          <option value="">Todas as severidades</option>
          {severidades.map(sev => (
            <option key={sev.value} value={sev.value}>{sev.label}</option>
          ))}
        </select>
      </div>

      {/* Lista de Incidentes */}
      <div className="grid gap-4">
        {incidents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">Nenhum incidente registrado</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{incident.titulo}</h3>
                    <span className={`px-2 py-1 text-xs rounded font-semibold bg-${getSeveridadeColor(incident.severidade)}-100 text-${getSeveridadeColor(incident.severidade)}-700`}>
                      {severidades.find(s => s.value === incident.severidade)?.label}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded bg-${getStatusColor(incident.status)}-100 text-${getStatusColor(incident.status)}-700`}>
                      {statusOptions.find(s => s.value === incident.status)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{incident.descricao}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📁 {categorias.find(c => c.value === incident.categoria)?.label}</span>
                    <span>📅 Detectado: {new Date(incident.dataDeteccao).toLocaleDateString("pt-BR")}</span>
                    {incident.sistemaAfetado && <span>💻 {incident.sistemaAfetado}</span>}
                    {incident.responsavel && <span>👤 {incident.responsavel}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(incident)}
                    className="px-3 py-1 text-sm text-uni-blue hover:bg-uni-blue/10 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(incident.id)}
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
                {editingIncident ? "Editar Incidente" : "Reportar Novo Incidente"}
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
                  placeholder="Descreva o incidente detalhadamente..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severidade*</label>
                  <select
                    required
                    value={formData.severidade}
                    onChange={(e) => setFormData({ ...formData, severidade: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  >
                    {severidades.map(sev => (
                      <option key={sev.value} value={sev.value}>{sev.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Detecção</label>
                  <input
                    type="date"
                    value={formData.dataDeteccao}
                    onChange={(e) => setFormData({ ...formData, dataDeteccao: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fonte de Detecção</label>
                  <input
                    type="text"
                    value={formData.fonteDeteccao}
                    onChange={(e) => setFormData({ ...formData, fonteDeteccao: e.target.value })}
                    placeholder="ex: SIEM, Firewall, Usuário..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sistema Afetado</label>
                  <input
                    type="text"
                    value={formData.sistemaAfetado}
                    onChange={(e) => setFormData({ ...formData, sistemaAfetado: e.target.value })}
                    placeholder="ex: Portal Académico"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ação Imediata</label>
                <textarea
                  rows={3}
                  value={formData.acaoImediata}
                  onChange={(e) => setFormData({ ...formData, acaoImediata: e.target.value })}
                  placeholder="Descreva as ações tomadas imediatamente..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {editingIncident ? "Atualizar" : "Reportar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
