#!/usr/bin/env node

/**
 * Script de Validação Pré-Deploy
 * Verifica se todas as configurações necessárias estão corretas antes do deploy
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configurações de produção...\n');
console.log('='.repeat(60));

let errors = 0;
let warnings = 0;

// 1. Verificar arquivo .env.production
console.log('\n📁 Verificando arquivo .env.production...');
const envPath = path.join(process.cwd(), '.env.production');
if (!fs.existsSync(envPath)) {
  console.error('❌ ERRO: Arquivo .env.production não encontrado');
  errors++;
} else {
  console.log('✅ Arquivo .env.production encontrado');
  
  // Ler variáveis
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Verificar variáveis críticas
  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];
  
  console.log('\n🔐 Verificando variáveis de ambiente...');
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`)) {
      console.error(`❌ ERRO: Variável ${varName} não encontrada`);
      errors++;
    } else if (
      envContent.includes(`${varName}="seu_`) || 
      envContent.includes(`${varName}=""`) ||
      envContent.includes(`${varName}="uni_user:SenhaForte`) // Credenciais de exemplo
    ) {
      console.warn(`⚠️  AVISO: Variável ${varName} parece ter valor de exemplo`);
      warnings++;
    } else {
      console.log(`✅ Variável ${varName} configurada`);
    }
  });
  
  // Verificar NODE_ENV
  if (envContent.includes('NODE_ENV="production"') || envContent.includes('NODE_ENV=production')) {
    console.log('✅ NODE_ENV configurado para produção');
  } else {
    console.warn('⚠️  AVISO: NODE_ENV não está definido como "production"');
    warnings++;
  }
}

// 2. Verificar schema do Prisma
console.log('\n🗄️  Verificando schema do Prisma...');
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.error('❌ ERRO: Schema do Prisma não encontrado em prisma/schema.prisma');
  errors++;
} else {
  console.log('✅ Schema do Prisma encontrado');
}

// 3. Verificar se o build foi feito
console.log('\n🏗️  Verificando build do Next.js...');
const nextBuildPath = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextBuildPath)) {
  console.warn('⚠️  AVISO: Build do Next.js não encontrado');
  console.warn('   Execute "npm run build" antes do deploy');
  warnings++;
} else {
  console.log('✅ Build do Next.js encontrado');
}

// 4. Verificar package.json
console.log('\n📦 Verificando dependências...');
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  
  // Verificar dependências críticas
  const requiredDeps = ['next', 'next-auth', '@prisma/client', 'bcryptjs', 'zod'];
  let missingDeps = 0;
  
  requiredDeps.forEach(dep => {
    if (!pkg.dependencies || !pkg.dependencies[dep]) {
      console.error(`❌ ERRO: Dependência "${dep}" não encontrada`);
      errors++;
      missingDeps++;
    }
  });
  
  if (missingDeps === 0) {
    console.log(`✅ Todas as ${requiredDeps.length} dependências críticas encontradas`);
  }
  
  // Verificar scripts necessários
  const requiredScripts = ['build', 'start'];
  let missingScripts = 0;
  
  requiredScripts.forEach(script => {
    if (!pkg.scripts || !pkg.scripts[script]) {
      console.error(`❌ ERRO: Script "${script}" não encontrado em package.json`);
      errors++;
      missingScripts++;
    }
  });
  
  if (missingScripts === 0) {
    console.log(`✅ Scripts necessários encontrados`);
  }
} else {
  console.error('❌ ERRO: package.json não encontrado');
  errors++;
}

// 5. Verificar arquivos de autenticação
console.log('\n🔒 Verificando arquivos de autenticação...');
const authFiles = [
  'src/lib/auth.ts',
  'src/app/api/auth/[...nextauth]/route.ts',
  'src/lib/prisma.ts',
];

let missingAuthFiles = 0;
authFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERRO: Arquivo ${file} não encontrado`);
    errors++;
    missingAuthFiles++;
  }
});

if (missingAuthFiles === 0) {
  console.log(`✅ Todos os ${authFiles.length} arquivos de autenticação encontrados`);
}

// 6. Verificar arquivos críticos de configuração
console.log('\n⚙️  Verificando configurações...');
const configFiles = [
  'next.config.mjs',
  'tsconfig.json',
  'tailwind.config.js',
];

let missingConfigFiles = 0;
configFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERRO: Arquivo ${file} não encontrado`);
    errors++;
    missingConfigFiles++;
  }
});

if (missingConfigFiles === 0) {
  console.log(`✅ Arquivos de configuração encontrados`);
}

// 7. Verificar middleware
console.log('\n🛡️  Verificando middleware...');
const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
if (!fs.existsSync(middlewarePath)) {
  console.warn('⚠️  AVISO: Middleware não encontrado em src/middleware.ts');
  warnings++;
} else {
  console.log('✅ Middleware encontrado');
}

// Resumo final
console.log('\n' + '='.repeat(60));
console.log('\n📊 RESUMO DA VALIDAÇÃO:');
console.log('='.repeat(60));

if (errors === 0 && warnings === 0) {
  console.log('\n✅ ✅ ✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO! ✅ ✅ ✅');
  console.log('\n🚀 O projeto está pronto para deploy em produção.');
  console.log('\nPróximos passos:');
  console.log('  1. Fazer upload dos arquivos para o servidor');
  console.log('  2. Configurar variáveis de ambiente no cPanel');
  console.log('  3. Executar: npm install --production');
  console.log('  4. Executar: npx prisma generate');
  console.log('  5. Executar: npx prisma migrate deploy');
  console.log('  6. Executar: npm run build');
  console.log('  7. Executar: npm start');
  console.log('\n' + '='.repeat(60));
  process.exit(0);
} else {
  console.log(`\n📈 Estatísticas:`);
  console.log(`   ❌ Erros críticos: ${errors}`);
  console.log(`   ⚠️  Avisos: ${warnings}`);
  
  if (errors > 0) {
    console.log('\n❌ VALIDAÇÃO FALHOU!');
    console.log('\n⚠️  Corrija os erros acima antes de fazer deploy.');
    console.log('   O deploy com erros críticos pode causar falhas no sistema.');
    console.log('\n' + '='.repeat(60));
    process.exit(1);
  } else {
    console.log('\n⚠️  VALIDAÇÃO COM AVISOS');
    console.log('\n💡 Revise os avisos acima antes de fazer deploy.');
    console.log('   O sistema pode funcionar, mas podem haver problemas.');
    console.log('\n' + '='.repeat(60));
    process.exit(0);
  }
}
