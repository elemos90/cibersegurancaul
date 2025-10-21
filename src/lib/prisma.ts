import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Configuração de log: mais verbosa em dev, apenas erros em prod
const logLevel = process.env.NODE_ENV === "production" 
  ? ["error", "warn"]
  : ["query", "error", "warn"];

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: logLevel as any,
    errorFormat: "pretty",
  });

// Logging de conexão inicial para diagnóstico
prisma.$connect()
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      console.log("✅ [Prisma] Conectado ao banco de dados MySQL");
    }
  })
  .catch((error) => {
    console.error("❌ [Prisma] ERRO CRÍTICO: Falha ao conectar ao banco de dados");
    console.error("[Prisma] Detalhes:", error);
    console.error("[Prisma] Verifique se DATABASE_URL está correta e o banco está acessível");
    // Não lançar erro para não quebrar o build
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
