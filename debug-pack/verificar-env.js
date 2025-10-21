#!/usr/bin/env node

/**
 * Script de Verificação de Variáveis de Ambiente
 * ============================================
 * Verifica se as variáveis de produção estão configuradas corretamente
 */

console.log('🔍 VERIFICAÇÃO DE CONFIGURAÇÃO - Portal Cibersegurança\n');
console.log('='.repeat(60));

// Carregar variáveis de ambiente do arquivo .env.production
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.production');

if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.production não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');

// Parse manual das variáveis
envLines.forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remover aspas
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
});

const checks = [];
let hasErrors = false;

// 1. Verificar NEXTAUTH_URL
console.log('\n1️⃣  Verificando NEXTAUTH_URL...');
const nextAuthUrl = process.env.NEXTAUTH_URL;
if (!nextAuthUrl) {
  console.log('   ❌ NEXTAUTH_URL não definido!');
  hasErrors = true;
  checks.push({ item: 'NEXTAUTH_URL', status: 'ERRO', details: 'Não definido' });
} else if (nextAuthUrl === 'https://cyberul.cycode.net') {
  console.log('   ✅ NEXTAUTH_URL correto:', nextAuthUrl);
  checks.push({ item: 'NEXTAUTH_URL', status: 'OK', details: nextAuthUrl });
} else {
  console.log('   ⚠️  NEXTAUTH_URL incorreto:', nextAuthUrl);
  console.log('   📌 Esperado: https://cyberul.cycode.net');
  hasErrors = true;
  checks.push({ item: 'NEXTAUTH_URL', status: 'ERRO', details: `Valor incorreto: ${nextAuthUrl}` });
}

// 2. Verificar NEXTAUTH_SECRET
console.log('\n2️⃣  Verificando NEXTAUTH_SECRET...');
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (!nextAuthSecret) {
  console.log('   ❌ NEXTAUTH_SECRET não definido!');
  hasErrors = true;
  checks.push({ item: 'NEXTAUTH_SECRET', status: 'ERRO', details: 'Não definido' });
} else if (nextAuthSecret.length < 32) {
  console.log('   ⚠️  NEXTAUTH_SECRET muito curto:', nextAuthSecret.length, 'caracteres');
  console.log('   📌 Recomendado: mínimo 32 caracteres');
  hasErrors = true;
  checks.push({ item: 'NEXTAUTH_SECRET', status: 'AVISO', details: 'Secret muito curto' });
} else {
  console.log('   ✅ NEXTAUTH_SECRET definido (', nextAuthSecret.length, 'caracteres)');
  checks.push({ item: 'NEXTAUTH_SECRET', status: 'OK', details: `${nextAuthSecret.length} caracteres` });
}

// 3. Verificar DATABASE_URL
console.log('\n3️⃣  Verificando DATABASE_URL...');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log('   ❌ DATABASE_URL não definido!');
  hasErrors = true;
  checks.push({ item: 'DATABASE_URL', status: 'ERRO', details: 'Não definido' });
} else {
  try {
    const url = new URL(databaseUrl);
    console.log('   ✅ DATABASE_URL válido');
    console.log('      Protocolo:', url.protocol);
    console.log('      Host:', url.hostname);
    console.log('      Porta:', url.port || '(padrão)');
    console.log('      Banco:', url.pathname.substring(1));
    console.log('      Usuário:', url.username);
    
    // Verificar se é localhost (produção deve usar localhost no cPanel)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      console.log('   ✅ Usando banco local (correto para cPanel)');
      checks.push({ item: 'DATABASE_URL', status: 'OK', details: 'localhost' });
    } else {
      console.log('   ⚠️  Usando banco remoto:', url.hostname);
      checks.push({ item: 'DATABASE_URL', status: 'AVISO', details: `Remoto: ${url.hostname}` });
    }
    
    // Verificar se tem senha codificada
    if (url.password.includes('%')) {
      console.log('   ✅ Senha com encoding URL detectado');
    }
  } catch (err) {
    console.log('   ❌ DATABASE_URL inválido:', err.message);
    hasErrors = true;
    checks.push({ item: 'DATABASE_URL', status: 'ERRO', details: 'URL malformada' });
  }
}

// 4. Verificar NODE_ENV
console.log('\n4️⃣  Verificando NODE_ENV...');
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'production') {
  console.log('   ✅ NODE_ENV: production');
  checks.push({ item: 'NODE_ENV', status: 'OK', details: 'production' });
} else {
  console.log('   ⚠️  NODE_ENV:', nodeEnv || '(não definido)');
  console.log('   📌 Para produção deve ser: production');
  checks.push({ item: 'NODE_ENV', status: 'AVISO', details: nodeEnv || 'não definido' });
}

// Resumo
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMO DA VERIFICAÇÃO\n');

checks.forEach(check => {
  const icon = check.status === 'OK' ? '✅' : check.status === 'AVISO' ? '⚠️' : '❌';
  console.log(`${icon} ${check.item.padEnd(20)} ${check.status.padEnd(8)} ${check.details}`);
});

console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.log('\n❌ ATENÇÃO: Erros encontrados na configuração!');
  console.log('📖 Consulte: CORRECAO_URGENTE_PRODUCAO.md\n');
  process.exit(1);
} else {
  console.log('\n✅ Todas as verificações passaram!');
  console.log('🚀 Configuração pronta para produção.\n');
  process.exit(0);
}
