#!/usr/bin/env node

/**
 * Script: Gerar Hash Bcrypt para Senha
 * ====================================
 * Gera hash bcrypt compatível com o sistema de autenticação
 */

const bcrypt = require('bcryptjs');

const senha = 'Admin@2025';
const rounds = 10;

console.log('\n🔐 GERADOR DE HASH BCRYPT\n');
console.log('='.repeat(60));
console.log(`Senha: ${senha}`);
console.log(`Rounds: ${rounds}`);
console.log('='.repeat(60));

// Gerar hash
bcrypt.hash(senha, rounds, (err, hash) => {
  if (err) {
    console.error('❌ Erro ao gerar hash:', err);
    process.exit(1);
  }
  
  console.log('\n✅ Hash gerado com sucesso!\n');
  console.log('Hash:');
  console.log(hash);
  
  console.log('\n📋 SQL para atualizar no banco:\n');
  console.log(`UPDATE \`user\` SET \`password\` = '${hash}' WHERE \`email\` = 'admin@unilicungo.ac.mz';`);
  
  console.log('\n🧪 Teste de Verificação:\n');
  
  // Testar o hash gerado
  bcrypt.compare(senha, hash, (err, result) => {
    if (err) {
      console.error('❌ Erro ao testar:', err);
      process.exit(1);
    }
    
    if (result) {
      console.log('✅ Hash válido! A senha pode ser autenticada.');
    } else {
      console.log('❌ Hash inválido! Algo deu errado.');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Concluído!');
    console.log('='.repeat(60) + '\n');
  });
});
