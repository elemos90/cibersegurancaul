import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Health Check Endpoint
 * Verifica se o servidor e banco de dados estão funcionando
 * 
 * Uso: GET /api/health
 */
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "unknown",
    database: "unknown",
    env_vars: {
      nextauth_url: !!process.env.NEXTAUTH_URL,
      nextauth_secret: !!process.env.NEXTAUTH_SECRET,
      database_url: !!process.env.DATABASE_URL,
      node_env: process.env.NODE_ENV,
    },
    errors: [] as string[],
  };

  // 1. Verificar variáveis de ambiente críticas
  if (!process.env.NEXTAUTH_URL) {
    checks.errors.push("NEXTAUTH_URL não configurada");
  }
  
  if (!process.env.NEXTAUTH_SECRET) {
    checks.errors.push("NEXTAUTH_SECRET não configurada");
  }
  
  if (!process.env.DATABASE_URL) {
    checks.errors.push("DATABASE_URL não configurada");
  }

  // 2. Verificar conexão com banco de dados
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "connected";
  } catch (error) {
    checks.database = "error";
    checks.errors.push(`Erro no banco: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }

  // 3. Verificar se tabelas existem
  try {
    await prisma.user.count();
    checks.status = checks.errors.length === 0 ? "healthy" : "degraded";
  } catch (error) {
    checks.status = "unhealthy";
    checks.errors.push(`Tabelas não encontradas: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }

  const statusCode = checks.status === "healthy" ? 200 : 503;

  return NextResponse.json(checks, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}
