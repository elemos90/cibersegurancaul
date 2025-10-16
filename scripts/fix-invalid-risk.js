// Corrigir o risco com categoria inválida
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixInvalidRisk() {
  try {
    console.log('🔧 Corrigindo risco com categoria inválida...\n');
    
    // Atualizar usando SQL direto (bypass do enum validation)
    await prisma.$executeRaw`
      UPDATE risk 
      SET categoria = 'tecnologico'
      WHERE id = 'risk-008'
    `;
    
    console.log('✅ Risco risk-008 corrigido! Categoria definida como "tecnologico"\n');
    
    // Verificar se há outros problemas
    const allRisks = await prisma.$queryRaw`
      SELECT id, titulo, categoria 
      FROM risk 
      WHERE categoria = '' OR categoria IS NULL
    `;
    
    if (allRisks.length > 0) {
      console.log('⚠️  Ainda há outros riscos com categoria vazia:');
      allRisks.forEach(r => console.log(`   - ${r.id}: ${r.titulo}`));
    } else {
      console.log('✅ Todos os riscos estão com categorias válidas!\n');
      console.log('🎉 Agora a API deve funcionar corretamente!');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixInvalidRisk();
