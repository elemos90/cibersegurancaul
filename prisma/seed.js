const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Criar super user
  const hashedPassword = await hash("password", 12);

  const superUser = await prisma.user.upsert({
    where: { email: "elemos@unilicungo.ac.mz" },
    update: {},
    create: {
      email: "elemos@unilicungo.ac.mz",
      name: "Elemos (Super Admin)",
      password: hashedPassword,
      papel: "admin",
      mustChangePassword: true, // Forçar mudança no primeiro login
    },
  });

  console.log("✅ Super user criado:", superUser.email);
  console.log("   Email: elemos@unilicungo.ac.mz");
  console.log("   Senha: password (deve ser alterada no primeiro login)");
  console.log("   Papel: admin");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao fazer seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
