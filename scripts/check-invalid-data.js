// Verificar dados inválidos usando query SQL direta
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkInvalidData() {
  try {
    console.log('🔍 Verificando dados inválidos na tabela risk...\n');
    
    // Query SQL direta para ver todos os riscos
    const risks = await prisma.$queryRaw`
      SELECT id, titulo, categoria, probabilidade, impacto, nivelRisco, status 
      FROM risk
    `;
    
    console.log(`📊 Total de registros: ${risks.length}\n`);
    
    const validCategories = ['tecnologico', 'humano', 'processo', 'externo', 'compliance', 'reputacional'];
    const validLevels = ['muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto'];
    const validStatus = ['identificado', 'em_analise', 'em_tratamento', 'mitigado', 'aceito', 'transferido'];
    
    let hasInvalidData = false;
    
    risks.forEach((risk, index) => {
      const issues = [];
      
      if (!risk.categoria || !validCategories.includes(risk.categoria)) {
        issues.push(`categoria inválida: '${risk.categoria}'`);
      }
      if (!risk.probabilidade || !validLevels.includes(risk.probabilidade)) {
        issues.push(`probabilidade inválida: '${risk.probabilidade}'`);
      }
      if (!risk.impacto || !validLevels.includes(risk.impacto)) {
        issues.push(`impacto inválido: '${risk.impacto}'`);
      }
      if (!risk.nivelRisco || !validLevels.includes(risk.nivelRisco)) {
        issues.push(`nivelRisco inválido: '${risk.nivelRisco}'`);
      }
      if (!risk.status || !validStatus.includes(risk.status)) {
        issues.push(`status inválido: '${risk.status}'`);
      }
      
      if (issues.length > 0) {
        hasInvalidData = true;
        console.log(`❌ Risco ${index + 1} (ID: ${risk.id})`);
        console.log(`   Título: ${risk.titulo}`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        console.log('');
      }
    });
    
    if (!hasInvalidData) {
      console.log('✅ Todos os dados estão válidos!');
    } else {
      console.log('\n💡 Solução: Execute o script de limpeza para corrigir os dados.');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkInvalidData();
