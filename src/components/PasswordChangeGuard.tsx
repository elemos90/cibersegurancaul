"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PasswordChangeGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const mustChange = (session.user as any).mustChangePassword;
      
      // Se precisa mudar senha e não está em rotas de auth
      if (mustChange && !pathname?.startsWith("/auth/")) {
        router.push("/auth/change-password");
      } else {
        setIsChecking(false);
      }
    } else if (status !== "loading") {
      setIsChecking(false);
    }
  }, [session, status, pathname, router]);

  // Mostrar loading enquanto verifica
  if (status === "loading" || (isChecking && status === "authenticated")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-uni-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
