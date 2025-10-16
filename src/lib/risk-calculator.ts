/**
 * Função para calcular nível de risco baseado em probabilidade e impacto
 * Retorna string para evitar dependência do Prisma Client em testes
 */
export function calcularNivelRisco(probabilidade: string, impacto: string): string {
  const niveis: Record<string, number> = {
    muito_baixo: 1,
    baixo: 2,
    medio: 3,
    alto: 4,
    muito_alto: 5
  };

  const prob = niveis[probabilidade] || 3;
  const imp = niveis[impacto] || 3;
  const resultado = prob * imp;

  if (resultado <= 4) return "muito_baixo";
  if (resultado <= 8) return "baixo";
  if (resultado <= 12) return "medio";
  if (resultado <= 16) return "alto";
  return "muito_alto";
}
