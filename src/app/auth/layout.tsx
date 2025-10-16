import { Providers } from "@/components/Providers";

/**
 * Layout específico para páginas de autenticação
 * Não inclui header e footer, apenas o conteúdo da página
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
