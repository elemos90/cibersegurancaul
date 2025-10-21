#!/usr/bin/env node

/**
 * Script de Coleta de Informações de Debug
 * =========================================
 * Coleta informações do ambiente para diagnóstico
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 COLETA DE INFORMAÇÕES DE DEBUG\n');
console.log('='.repeat(70));

// 1. Verificar arquivos .env
console.log('\n📄 ARQUIVOS .env ENCONTRADOS:\n');

const envFiles = ['.env', '.env.local', '.env.production', '.env.development'];
const foundEnvFiles = [];

envFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const size = stats.size;
    const modified = stats.mtime.toLocaleString();
    
    console.log(`✅ ${file}`);
    console.log(`   Tamanho: ${size} bytes`);
    console.log(`   Modificado: ${modified}`);
    
    foundEnvFiles.push(file);
    
    // Ler e mostrar variáveis (sem valores sensíveis)
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    
    console.log(`   Variáveis (${lines.length}):`);
    lines.forEach(line => {
      const match = line.match(/^([^=]+)=/);
      if (match) {
        const key = match[1].trim();
        console.log(`      - ${key}`);
      }
    });
    console.log('');
  }
});

if (foundEnvFiles.length === 0) {
  console.log('❌ NENHUM arquivo .env encontrado!');
}

// 2. Verificar variáveis de ambiente críticas
console.log('\n🔧 VARIÁVEIS DE AMBIENTE (processo atual):\n');

const criticalVars = [
  'NODE_ENV',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL'
];

// Parse .env.production para simular produção
const envProdPath = path.join(__dirname, '.env.production');
if (fs.existsSync(envProdPath)) {
  const envContent = fs.readFileSync(envProdPath, 'utf-8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  });
}

criticalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    if (varName.includes('SECRET') || varName.includes('PASSWORD')) {
      console.log(`✅ ${varName}: ${'*'.repeat(20)} (${value.length} caracteres)`);
    } else if (varName === 'DATABASE_URL') {
      // Mostrar sem senha
      try {
        const url = new URL(value);
        console.log(`✅ ${varName}: ${url.protocol}//${url.username}:****@${url.host}${url.pathname}`);
      } catch {
        console.log(`⚠️  ${varName}: URL malformada`);
      }
    } else {
      console.log(`✅ ${varName}: ${value}`);
    }
  } else {
    console.log(`❌ ${varName}: NÃO DEFINIDO`);
  }
});

// 3. Verificar estrutura de pastas críticas
console.log('\n📁 ESTRUTURA DE PASTAS:\n');

const criticalDirs = [
  'src',
  'src/app',
  'src/app/api/auth/[...nextauth]',
  'src/lib',
  'prisma',
  'public',
  '.next'
];

criticalDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    const stats = fs.statSync(dirPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(dirPath);
      console.log(`✅ ${dir}/ (${files.length} itens)`);
    }
  } else {
    console.log(`❌ ${dir}/ - NÃO ENCONTRADO`);
  }
});

// 4. Verificar package.json
console.log('\n📦 PACKAGE.JSON:\n');

const pkgPath = path.join(__dirname, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  
  console.log('Nome:', pkg.name);
  console.log('Versão:', pkg.version);
  console.log('\nDependências Críticas:');
  
  const criticalDeps = ['next', 'next-auth', 'prisma', '@prisma/client', 'react'];
  criticalDeps.forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${pkg.dependencies[dep]}`);
    } else {
      console.log(`  ❌ ${dep}: NÃO INSTALADO`);
    }
  });
  
  console.log('\nScripts disponíveis:');
  Object.keys(pkg.scripts || {}).forEach(script => {
    console.log(`  - npm run ${script}`);
  });
}

// 5. Verificar se tem build
console.log('\n🏗️  STATUS DO BUILD:\n');

const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  const buildId = path.join(nextDir, 'BUILD_ID');
  if (fs.existsSync(buildId)) {
    const id = fs.readFileSync(buildId, 'utf-8').trim();
    console.log(`✅ Build existe (ID: ${id})`);
    
    const stats = fs.statSync(nextDir);
    console.log(`   Modificado: ${stats.mtime.toLocaleString()}`);
  } else {
    console.log('⚠️  Pasta .next existe mas sem BUILD_ID');
  }
} else {
  console.log('❌ Pasta .next NÃO existe - precisa fazer build!');
  console.log('   Execute: npm run build');
}

// 6. Verificar node_modules
console.log('\n📚 NODE_MODULES:\n');

const nodeModules = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModules)) {
  const stats = fs.statSync(nodeModules);
  console.log('✅ node_modules existe');
  console.log(`   Modificado: ${stats.mtime.toLocaleString()}`);
} else {
  console.log('❌ node_modules NÃO existe - precisa fazer npm install!');
}

// Resumo
console.log('\n' + '='.repeat(70));
console.log('📊 RESUMO:\n');

let issues = [];

if (foundEnvFiles.length > 1 && foundEnvFiles.includes('.env')) {
  issues.push('⚠️  ATENÇÃO: Múltiplos arquivos .env encontrados! Use apenas .env.production');
}

if (!process.env.NEXTAUTH_URL) {
  issues.push('❌ NEXTAUTH_URL não está definido');
}

if (!process.env.DATABASE_URL) {
  issues.push('❌ DATABASE_URL não está definido');
}

if (!fs.existsSync(path.join(__dirname, '.next'))) {
  issues.push('❌ Build não encontrado - execute: npm run build');
}

if (!fs.existsSync(nodeModules)) {
  issues.push('❌ node_modules não encontrado - execute: npm install');
}

if (issues.length === 0) {
  console.log('✅ Nenhum problema crítico detectado na configuração local');
  console.log('\n🔍 Próximos passos:');
  console.log('   1. Verificar logs da aplicação no servidor');
  console.log('   2. Testar conexão ao banco de dados');
  console.log('   3. Verificar se aplicação foi reiniciada corretamente');
} else {
  console.log('❌ Problemas encontrados:\n');
  issues.forEach(issue => console.log(`   ${issue}`));
}

console.log('\n' + '='.repeat(70));
console.log('\n💡 Para ver este relatório no servidor:');
console.log('   1. Faça upload deste arquivo (debug-info.js)');
console.log('   2. Execute: node debug-info.js');
console.log('   3. Envie o output para análise');
console.log('');
