// Teste direto da lógica da API de riscos
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testRiskAPI() {
  try {
    console.log('🧪 Testando lógica da API de riscos...\n');
    
    // Simular a query da API
    const risks = await prisma.risk.findMany({
      where: {},
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: {
          select: { id: true, filename: true, originalName: true, size: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    console.log(`✅ Sucesso! Encontrados ${risks.length} riscos\n`);
    
    if (risks.length > 0) {
      console.log('Primeiro risco:');
      console.log(JSON.stringify(risks[0], null, 2));
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error.message);
    console.error('\nStack trace:', error.stack);
    
    if (error.code) {
      console.error('Código do erro:', error.code);
    }
    
    if (error.meta) {
      console.error('Meta:', JSON.stringify(error.meta, null, 2));
    }
  } finally {
    await prisma.$disconnect();
  }
}

testRiskAPI();
