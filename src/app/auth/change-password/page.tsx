"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao alterar senha");
      }

      setSuccess(true);
      
      // Fazer logout e redirecionar para login
      setTimeout(async () => {
        await signOut({ redirect: false });
        router.push("/auth/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isMustChange = (session?.user as any)?.mustChangePassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-uni-light">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-uni-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-uni-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-uni-blue">
            {isMustChange ? "Altere sua Senha" : "Alterar Senha"}
          </h2>
          {isMustChange && (
            <p className="mt-2 text-sm text-orange-600 font-medium">
              ⚠️ É obrigatório alterar a senha no primeiro acesso
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-800">
              ✓ Senha alterada com sucesso! Redirecionando para login...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">
              Senha Atual
            </label>
            <input
              id="current"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              id="new"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Nova Senha
            </label>
            <input
              id="confirm"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uni-blue focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full bg-uni-blue text-white py-3 rounded-lg font-medium hover:bg-uni-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>

        {!isMustChange && (
          <button
            onClick={() => router.push("/")}
            className="w-full text-sm text-gray-600 hover:text-uni-blue"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
