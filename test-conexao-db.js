#!/usr/bin/env node

/**
 * Script de Teste de Conexão ao Banco de Dados
 * ============================================
 * Testa se consegue conectar ao MySQL com as credenciais do .env.production
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

console.log('🔌 TESTE DE CONEXÃO AO BANCO DE DADOS\n');
console.log('='.repeat(60));

// Parse .env.production
const envPath = path.join(__dirname, '.env.production');

if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.production não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
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

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('❌ DATABASE_URL não encontrada no .env.production');
  process.exit(1);
}

console.log('\n📋 Configuração:');
console.log('DATABASE_URL:', databaseUrl);

// Parse URL
let config;
try {
  const url = new URL(databaseUrl);
  config = {
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: decodeURIComponent(url.password), // Decodifica %3B de volta para ;
    database: url.pathname.substring(1)
  };
  
  console.log('\n🔧 Parâmetros de Conexão:');
  console.log('  Host:', config.host);
  console.log('  Porta:', config.port);
  console.log('  Usuário:', config.user);
  console.log('  Senha:', '*'.repeat(config.password.length), `(${config.password.length} caracteres)`);
  console.log('  Banco:', config.database);
  
} catch (err) {
  console.log('\n❌ Erro ao fazer parse da DATABASE_URL:', err.message);
  process.exit(1);
}

// Tentar conectar
async function testarConexao() {
  console.log('\n🔌 Tentando conectar ao MySQL...\n');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!\n');
    
    // Testar query simples
    console.log('📊 Testando query simples...');
    const [rows] = await connection.execute('SELECT 1 + 1 AS resultado');
    console.log('✅ Query executada:', rows[0]);
    
    // Verificar se tabelas existem
    console.log('\n📋 Verificando tabelas no banco...');
    const [tables] = await connection.execute('SHOW TABLES');
    
    if (tables.length === 0) {
      console.log('⚠️  BANCO VAZIO - Nenhuma tabela encontrada!');
      console.log('   Execute: npx prisma db push');
    } else {
      console.log(`✅ ${tables.length} tabela(s) encontrada(s):`);
      tables.forEach((table, idx) => {
        console.log(`   ${idx + 1}. ${Object.values(table)[0]}`);
      });
    }
    
    await connection.end();
    console.log('\n✅ TESTE DE CONEXÃO CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(60));
    
  } catch (err) {
    console.log('❌ ERRO DE CONEXÃO!\n');
    console.log('Código:', err.code);
    console.log('Mensagem:', err.message);
    console.log('SQL State:', err.sqlState);
    
    console.log('\n🔍 Possíveis Soluções:');
    
    if (err.code === 'ECONNREFUSED') {
      console.log('  - MySQL não está rodando');
      console.log('  - Porta incorreta');
      console.log('  - Firewall bloqueando conexão');
    }
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('  - Usuário ou senha incorretos');
      console.log('  - Usuário não tem permissão para acessar o banco');
    }
    
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('  - Banco de dados não existe');
      console.log('  - Nome do banco está errado');
    }
    
    console.log('\n='.repeat(60));
    
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

testarConexao();
