"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  papel: string;
  createdAt: string;
  mustChangePassword: boolean;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Novo usuário
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    papel: "ti" as string,
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      const papel = (session?.user as any)?.papel;
      if (papel !== "admin") {
        router.push("/");
        return;
      }
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newUser.email.endsWith("@unilicungo.ac.mz")) {
      setError("Email deve ser @unilicungo.ac.mz");
      return;
    }

    if (newUser.password.length < 8) {
      setError("Senha deve ter pelo menos 8 caracteres");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao criar usuário");
      }

      setShowModal(false);
      setNewUser({ email: "", name: "", papel: "ti", password: "" });
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir usuário");
      fetchUsers();
    } catch (err) {
      alert("Erro ao excluir usuário");
    }
  };

  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt("Digite a nova senha (mínimo 8 caracteres):");
    if (!newPassword || newPassword.length < 8) {
      alert("Senha inválida");
      return;
    }

    try {
      const res = await fetch("/api/admin/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (!res.ok) throw new Error("Erro ao resetar senha");
      alert("Senha resetada com sucesso");
      fetchUsers();
    } catch (err) {
      alert("Erro ao resetar senha");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-blue"></div>
      </div>
    );
  }

  const papelLabels: Record<string, string> = {
    admin: "Administrador",
    secops: "SecOps",
    ti: "TI",
    dono_dado: "Dono de Dados",
    auditoria: "Auditoria",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-uni-blue">Gestão de Usuários</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-uni-blue text-white px-4 py-2 rounded-lg hover:bg-uni-teal transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Papel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.name || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-uni-blue/10 text-uni-blue rounded text-xs">
                    {papelLabels[user.papel]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {user.mustChangePassword && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                      Trocar senha
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="text-uni-blue hover:text-uni-teal"
                    title="Resetar senha"
                  >
                    🔑
                  </button>
                  {user.email !== session?.user?.email && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Criar Usuário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-uni-blue mb-4">Novo Usuário</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="nome@unilicungo.ac.mz"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
                <select
                  value={newUser.papel}
                  onChange={(e) => setNewUser({ ...newUser, papel: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
                >
                  <option value="ti">TI</option>
                  <option value="secops">SecOps</option>
                  <option value="admin">Administrador</option>
                  <option value="dono_dado">Dono de Dados</option>
                  <option value="auditoria">Auditoria</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha Inicial</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O usuário será obrigado a alterar no primeiro login
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-uni-blue text-white rounded-lg hover:bg-uni-teal"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
