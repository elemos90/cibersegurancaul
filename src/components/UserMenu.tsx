"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) return null;

  const papelLabels: Record<string, string> = {
    admin: "Administrador",
    secops: "SecOps",
    ti: "TI",
    dono_dado: "Dono de Dados",
    auditoria: "Auditoria",
  };

  const papel = (session.user as any).papel || "ti";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-3 py-2 transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
          {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="text-left hidden md:block">
          <div className="text-sm font-semibold text-slate-900">
            {session.user.name || session.user.email}
          </div>
          <div className="text-xs text-slate-500 font-medium">{papelLabels[papel]}</div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-20 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-semibold shadow-sm">
                  {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900">
                    {session.user.name}
                  </div>
                  <div className="text-xs text-slate-500">{session.user.email}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {papelLabels[papel]}
              </div>
            </div>
            <button
              onClick={async () => {
                await signOut({ redirect: false });
                window.location.href = "/";
              }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Terminar Sessão
            </button>
          </div>
        </>
      )}
    </div>
  );
}
