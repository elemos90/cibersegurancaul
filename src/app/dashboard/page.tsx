"use client";

import { KpiCard } from "@/components/KpiCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const mustChange = (session.user as any).mustChangePassword;
      if (mustChange) {
        router.push("/auth/change-password");
      }
    }
  }, [session, status, router]);

  const kpis = [
    { label: "MFA Cobertura", value: "40%", hint: "Meta 90% / 180d" },
    { label: "EDR Cobertura", value: "55%", hint: "Meta 90% / 180d" },
    { label: "Patches ≤7d", value: "30%", hint: "Meta 85% / 180d" },
    { label: "Phishing Click", value: "18%", hint: "< 5% / 180d" },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-uni-blue">Dashboard</h1>
        <span className="rounded-full bg-uni-teal/10 text-uni-teal px-3 py-1 text-xs">MVP</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>
      <section className="rounded-2xl border p-4 bg-white">
        <h2 className="font-semibold mb-2 text-uni-blue">Alertas Recentes (exemplo)</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Falhas MFA em contas administrativas</li>
          <li>Deteção de malware em laboratório de informática</li>
          <li>Relatório DMARC: spoofing bloqueado</li>
        </ul>
      </section>
    </div>
  );
}
