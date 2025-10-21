#!/usr/bin/env node
/**
 * Script de Diagnóstico do Servidor
 * Execute no cPanel: node check-server.js
 */

console.log('🔍 Verificando Configuração do Servidor...\n');

// 1. Verificar Node.js
console.log('1️⃣ Versão Node.js:');
console.log(`   ${process.version}\n`);

// 2. Verificar Variáveis de Ambiente
console.log('2️⃣ Variáveis de Ambiente:');
const requiredEnvVars = [
  'NODE_ENV',
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET'
];

let missingVars = [];
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // Ocultar senhas
    if (varName === 'DATABASE_URL') {
      const masked = value.replace(/:([^:@]+)@/, ':****@');
      console.log(`   ✅ ${varName} = ${masked}`);
    } else if (varName === 'NEXTAUTH_SECRET') {
      console.log(`   ✅ ${varName} = ${value.substring(0, 10)}...`);
    } else {
      console.log(`   ✅ ${varName} = ${value}`);
    }
  } else {
    console.log(`   ❌ ${varName} = NÃO DEFINIDA`);
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log(`\n   ⚠️  Faltam ${missingVars.length} variável(is) de ambiente!`);
}

// 3. Verificar arquivos essenciais
console.log('\n3️⃣ Arquivos Essenciais:');
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'server.js',
  'next.config.mjs',
  '.next/BUILD_ID',
  'prisma/schema.prisma'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// 4. Verificar Prisma Client
console.log('\n4️⃣ Prisma Client:');
try {
  const prismaClientPath = path.join(process.cwd(), 'node_modules', '@prisma', 'client');
  if (fs.existsSync(prismaClientPath)) {
    console.log('   ✅ @prisma/client instalado');
    
    // Verificar se foi gerado
    const generatedPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
    if (fs.existsSync(generatedPath)) {
      console.log('   ✅ Prisma Client gerado');
    } else {
      console.log('   ❌ Prisma Client NÃO gerado - Execute: npx prisma generate');
    }
  } else {
    console.log('   ❌ @prisma/client NÃO instalado');
  }
} catch (error) {
  console.log(`   ❌ Erro ao verificar Prisma: ${error.message}`);
}

// 5. Testar conexão com banco de dados
console.log('\n5️⃣ Conexão com Banco de Dados:');
if (process.env.DATABASE_URL) {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  prisma.$connect()
    .then(async () => {
      console.log('   ✅ Conectado ao banco de dados');
      
      // Verificar tabelas
      try {
        const userCount = await prisma.user.count();
        console.log(`   ✅ Tabela 'User' existe (${userCount} usuários)`);
        
        if (userCount === 0) {
          console.log('   ⚠️  Nenhum usuário cadastrado - crie um admin!');
        }
      } catch (error) {
        console.log(`   ❌ Erro ao acessar tabelas: ${error.message}`);
        console.log('   💡 Execute: npx prisma migrate deploy');
      }
      
      await prisma.$disconnect();
      printSummary();
    })
    .catch((error) => {
      console.log(`   ❌ Falha na conexão: ${error.message}`);
      console.log('\n   Possíveis causas:');
      console.log('   - DATABASE_URL incorreta');
      console.log('   - Banco de dados não existe');
      console.log('   - Credenciais inválidas');
      console.log('   - Servidor MySQL offline');
      printSummary();
    });
} else {
  console.log('   ❌ DATABASE_URL não definida');
  printSummary();
}

function printSummary() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 RESUMO:');
  
  if (missingVars.length > 0) {
    console.log('\n❌ Configure as variáveis de ambiente faltando:');
    missingVars.forEach(v => console.log(`   - ${v}`));
  }
  
  console.log('\n💡 Próximos passos sugeridos:');
  console.log('   1. Configurar variáveis de ambiente no cPanel');
  console.log('   2. Executar: npx prisma generate');
  console.log('   3. Executar: npx prisma migrate deploy');
  console.log('   4. Criar usuário admin no banco');
  console.log('   5. Reiniciar aplicação Node.js');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}
