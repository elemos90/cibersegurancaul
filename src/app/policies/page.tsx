"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Policy = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  status: string;
  versao: string;
  dataVigencia: string | null;
  createdAt: string;
  createdBy: {
    name: string;
    email: string;
  };
  evidencias: any[];
};

const categorias = [
  { value: "acesso", label: "Controle de Acesso" },
  { value: "dados", label: "Proteção de Dados" },
  { value: "rede", label: "Segurança de Rede" },
  { value: "fisica", label: "Segurança Física" },
  { value: "desenvolvimento", label: "Desenvolvimento Seguro" },
  { value: "continuidade", label: "Continuidade de Negócio" },
  { value: "conformidade", label: "Conformidade" },
  { value: "uso_aceitavel", label: "Uso Aceitável" }
];

const statusOptions = [
  { value: "rascunho", label: "Rascunho", color: "gray" },
  { value: "revisao", label: "Em Revisão", color: "yellow" },
  { value: "aprovado", label: "Aprovado", color: "blue" },
  { value: "ativo", label: "Ativo", color: "green" },
  { value: "obsoleto", label: "Obsoleto", color: "red" }
];

export default function PoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "acesso",
    status: "rascunho",
    versao: "1.0",
    dataVigencia: "",
    conteudo: "",
    tags: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      loadPolicies();
    }
  }, [filterCategoria, filterStatus, status]);

  const loadPolicies = async () => {
    try {
      const params = new URLSearchParams();
      if (filterCategoria) params.append("categoria", filterCategoria);
      if (filterStatus) params.append("status", filterStatus);

      const res = await fetch(`/api/policies?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPolicies(data);
      }
    } catch (error) {
      console.error("Erro ao carregar políticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : []
    };

    try {
      const url = editingPolicy ? `/api/policies/${editingPolicy.id}` : "/api/policies";
      const method = editingPolicy ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await loadPolicies();
        handleCloseModal();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao salvar política");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar política");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta política?")) return;

    try {
      const res = await fetch(`/api/policies/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadPolicies();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao excluir política");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir política");
    }
  };

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormData({
      titulo: policy.titulo,
      descricao: policy.descricao,
      categoria: policy.categoria,
      status: policy.status,
      versao: policy.versao,
      dataVigencia: policy.dataVigencia ? policy.dataVigencia.split("T")[0] : "",
      conteudo: "",
      tags: ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPolicy(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "acesso",
      status: "rascunho",
      versao: "1.0",
      dataVigencia: "",
      conteudo: "",
      tags: ""
    });
  };

  const getStatusColor = (status: string) => {
    const opt = statusOptions.find(s => s.value === status);
    return opt?.color || "gray";
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
          <h1 className="text-2xl font-semibold text-uni-blue">Políticas de Segurança</h1>
          <p className="text-sm text-gray-600 mt-1">Gestão de políticas, normas e procedimentos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal transition-colors"
        >
          + Nova Política
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

      {/* Lista de Políticas */}
      <div className="grid gap-4">
        {policies.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">Nenhuma política encontrada</p>
          </div>
        ) : (
          policies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{policy.titulo}</h3>
                    <span className={`px-2 py-1 text-xs rounded bg-${getStatusColor(policy.status)}-100 text-${getStatusColor(policy.status)}-700`}>
                      {statusOptions.find(s => s.value === policy.status)?.label}
                    </span>
                    <span className="text-xs text-gray-500">v{policy.versao}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{policy.descricao}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📁 {categorias.find(c => c.value === policy.categoria)?.label}</span>
                    <span>👤 {policy.createdBy.name}</span>
                    <span>📅 {new Date(policy.createdAt).toLocaleDateString("pt-BR")}</span>
                    {policy.evidencias.length > 0 && (
                      <span>📎 {policy.evidencias.length} anexo(s)</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="px-3 py-1 text-sm text-uni-blue hover:bg-uni-blue/10 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(policy.id)}
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
                {editingPolicy ? "Editar Política" : "Nova Política"}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <select
                    required
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Versão</label>
                  <input
                    type="text"
                    value={formData.versao}
                    onChange={(e) => setFormData({ ...formData, versao: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vigência</label>
                  <input
                    type="date"
                    value={formData.dataVigencia}
                    onChange={(e) => setFormData({ ...formData, dataVigencia: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo*</label>
                <textarea
                  required
                  rows={6}
                  value={formData.conteudo}
                  onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                  placeholder="Descreva o conteúdo completo da política..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="exemplo: ISO27001, LGPD, Confidencial"
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
                  {editingPolicy ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
