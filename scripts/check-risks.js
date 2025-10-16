const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Verificando conexão com o banco de dados...\n');
    
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados\n');
    
    // Contar riscos
    const count = await prisma.risk.count();
    console.log(`📊 Total de riscos no banco: ${count}\n`);
    
    if (count > 0) {
      // Buscar alguns riscos
      const risks = await prisma.risk.findMany({
        take: 3,
        include: {
          createdBy: {
            select: { name: true, email: true }
          }
        }
      });
      
      console.log('📋 Primeiros riscos encontrados:');
      risks.forEach((risk, index) => {
        console.log(`\n${index + 1}. ${risk.titulo}`);
        console.log(`   ID: ${risk.id}`);
        console.log(`   Categoria: ${risk.categoria}`);
        console.log(`   Nível: ${risk.nivelRisco}`);
        console.log(`   Status: ${risk.status}`);
      });
    } else {
      console.log('⚠️  Nenhum risco encontrado no banco de dados');
      console.log('\n💡 Execute o script SQL de dados fictícios:');
      console.log('   mysql -u uni_user -p security_portal < sql/dados_ficticios.sql');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.code) {
      console.error('Código do erro:', error.code);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
