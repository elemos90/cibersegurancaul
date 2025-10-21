# 🚨 PROBLEMAS CRÍTICOS EM PRODUÇÃO - Análise e Melhorias

**Data:** Outubro 2025  
**Status:** PRODUÇÃO  
**Domínio:** https://cycode.net  
**Problema Principal:** Erro 500 ao fazer login

---

## ❌ PROBLEMA 1: ERRO 500 NO LOGIN (CRÍTICO)

### 🔍 Diagnóstico

O erro 500 na URL `https://cycode.net/api/auth/signin/callback?url=%2Fdashboard` indica falha no processo de autenticação do NextAuth.

### Causas Prováveis

1. **DATABASE_URL incorreta ou inacessível**
   - A URL no `.env.production` usa credenciais genéricas: `mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal`
   - Essas **NÃO são as credenciais reais do servidor cPanel**

2. **Prisma Client não gerado em produção**
   - O `@prisma/client` precisa ser gerado após deploy
   - Comando não executado: `npx prisma generate`

3. **Banco de dados sem migrações aplicadas**
   - Tabelas podem não existir no servidor
   - Comando não executado: `npx prisma migrate deploy`

4. **Logs de erro desabilitados em produção**
   - `auth.ts` linha 107: `debug: process.env.NODE_ENV === 'development'`
   - Em produção, erros não aparecem nos logs

5. **Falta tratamento de erro robusto**
   - Erros de conexão não são capturados adequadamente
   - Usuário recebe apenas "500" sem contexto

### ✅ CORREÇÕES NECESSÁRIAS

---

## 🔧 CORREÇÃO 1: Melhorar Logging em Produção

**Arquivo:** `src/lib/prisma.ts`

**Problema Atual:**
```typescript
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });
```

**Correção:**
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Configuração mais verbosa para diagnóstico em produção
const logLevel = process.env.NODE_ENV === "production" 
  ? ["error", "warn"]
  : ["query", "error", "warn"];

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: logLevel,
    errorFormat: "pretty",
  });

// Logging de conexão para diagnóstico
prisma.$connect()
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      console.log("✅ Prisma conectado ao banco de dados");
    }
  })
  .catch((error) => {
    console.error("❌ ERRO CRÍTICO: Falha ao conectar ao banco de dados");
    console.error("Detalhes:", error);
    // Não lançar erro para não quebrar o build, mas registrar
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 🔧 CORREÇÃO 2: Melhorar Logging em Autenticação

**Arquivo:** `src/lib/auth.ts`

**Problema Atual:**
```typescript
debug: process.env.NODE_ENV === 'development', // Debug apenas em desenvolvimento
```

**Correção:**
```typescript
export const authOptions: NextAuthOptions = {
  // ... resto do código
  
  callbacks: {
    async redirect({ url, baseUrl }) {
      // ... código existente
    },
    
    async jwt({ token, user, trigger }) {
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.papel = (user as any).papel || "ti";
          token.mustChangePassword = (user as any).mustChangePassword || false;
        }
        
        // Recarregar dados do usuário do banco quando necessário
        if (trigger === "update" && token.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string }
          });
          if (dbUser) {
            token.mustChangePassword = dbUser.mustChangePassword;
            token.papel = dbUser.papel;
          }
        }
        
        return token;
      } catch (error) {
        console.error("❌ Erro no callback JWT:", error);
        // Retornar token mesmo com erro para não quebrar a sessão
        return token;
      }
    },
    
    async session({ session, token }) {
      try {
        if (session.user && token) {
          (session.user as any).id = token.id;
          (session.user as any).email = token.email;
          (session.user as any).name = token.name;
          (session.user as any).papel = token.papel;
          (session.user as any).mustChangePassword = token.mustChangePassword;
        }
        return session;
      } catch (error) {
        console.error("❌ Erro no callback session:", error);
        return session;
      }
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  // Habilitar debug em produção temporariamente para diagnóstico
  debug: true, // ⚠️ MUDAR PARA false APÓS RESOLVER O PROBLEMA
  
  // Adicionar tratamento de eventos para logging
  events: {
    async signIn({ user }) {
      console.log("✅ Login bem-sucedido:", user.email);
    },
    async signOut({ session }) {
      console.log("🚪 Logout:", (session?.user as any)?.email);
    },
    async createUser({ user }) {
      console.log("👤 Novo usuário criado:", user.email);
    },
    async linkAccount({ user }) {
      console.log("🔗 Conta vinculada:", user.email);
    },
    async session({ session }) {
      // Log de sessões ativas (use com moderação)
      console.log("🔐 Sessão verificada:", (session?.user as any)?.email);
    },
  },
};
```

---

## 🔧 CORREÇÃO 3: Adicionar Health Check Endpoint

**Criar arquivo:** `src/app/api/health/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Health Check Endpoint
 * Verifica se o servidor e banco de dados estão funcionando
 * 
 * Uso: GET /api/health
 */
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "unknown",
    database: "unknown",
    env_vars: {
      nextauth_url: !!process.env.NEXTAUTH_URL,
      nextauth_secret: !!process.env.NEXTAUTH_SECRET,
      database_url: !!process.env.DATABASE_URL,
      node_env: process.env.NODE_ENV,
    },
    errors: [] as string[],
  };

  // 1. Verificar variáveis de ambiente críticas
  if (!process.env.NEXTAUTH_URL) {
    checks.errors.push("NEXTAUTH_URL não configurada");
  }
  
  if (!process.env.NEXTAUTH_SECRET) {
    checks.errors.push("NEXTAUTH_SECRET não configurada");
  }
  
  if (!process.env.DATABASE_URL) {
    checks.errors.push("DATABASE_URL não configurada");
  }

  // 2. Verificar conexão com banco de dados
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "connected";
  } catch (error) {
    checks.database = "error";
    checks.errors.push(`Erro no banco: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }

  // 3. Verificar se tabelas existem
  try {
    await prisma.user.count();
    checks.status = checks.errors.length === 0 ? "healthy" : "degraded";
  } catch (error) {
    checks.status = "unhealthy";
    checks.errors.push(`Tabelas não encontradas: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }

  const statusCode = checks.status === "healthy" ? 200 : 503;

  return NextResponse.json(checks, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}
```

---

## 🔧 CORREÇÃO 4: Adicionar Página de Erro Customizada

**Criar arquivo:** `src/app/auth/error/page.tsx`

```typescript
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: "Erro de Configuração",
    description: "Há um problema na configuração do servidor. Contacte o administrador.",
  },
  AccessDenied: {
    title: "Acesso Negado",
    description: "Você não tem permissão para acessar este recurso.",
  },
  Verification: {
    title: "Erro de Verificação",
    description: "O token de verificação é inválido ou expirou.",
  },
  Default: {
    title: "Erro de Autenticação",
    description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
  },
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  
  const errorInfo = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Ícone de erro */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Título e descrição */}
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
          {errorInfo.title}
        </h1>
        <p className="text-slate-600 text-center mb-6">
          {errorInfo.description}
        </p>

        {/* Código do erro (para debug) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-3 bg-slate-100 rounded text-sm">
            <p className="text-slate-700">
              <strong>Código de erro:</strong> {error}
            </p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Tentar Novamente
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Voltar à Página Inicial
          </Link>
        </div>

        {/* Link de suporte */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Precisa de ajuda?{" "}
            <a 
              href="/reportar" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Reporte o problema
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 CORREÇÃO 5: Script de Validação Pré-Deploy

**Criar arquivo:** `scripts/validate-production.js`

```javascript
#!/usr/bin/env node

/**
 * Script de Validação Pré-Deploy
 * Verifica se todas as configurações necessárias estão corretas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configurações de produção...\n');

let errors = 0;
let warnings = 0;

// 1. Verificar arquivo .env.production
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
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`)) {
      console.error(`❌ ERRO: Variável ${varName} não encontrada em .env.production`);
      errors++;
    } else if (envContent.includes(`${varName}="seu_`) || envContent.includes(`${varName}=""`)) {
      console.warn(`⚠️  AVISO: Variável ${varName} parece não estar configurada corretamente`);
      warnings++;
    } else {
      console.log(`✅ Variável ${varName} configurada`);
    }
  });
}

// 2. Verificar schema do Prisma
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.error('❌ ERRO: Schema do Prisma não encontrado');
  errors++;
} else {
  console.log('✅ Schema do Prisma encontrado');
}

// 3. Verificar se o build foi feito
const nextBuildPath = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextBuildPath)) {
  console.warn('⚠️  AVISO: Build do Next.js não encontrado. Execute "npm run build"');
  warnings++;
} else {
  console.log('✅ Build do Next.js encontrado');
}

// 4. Verificar package.json
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  
  // Verificar dependências críticas
  const requiredDeps = ['next', 'next-auth', '@prisma/client', 'bcryptjs'];
  requiredDeps.forEach(dep => {
    if (!pkg.dependencies || !pkg.dependencies[dep]) {
      console.error(`❌ ERRO: Dependência ${dep} não encontrada em package.json`);
      errors++;
    }
  });
  
  console.log('✅ Dependências verificadas');
} else {
  console.error('❌ ERRO: package.json não encontrado');
  errors++;
}

// 5. Verificar arquivos de autenticação
const authFiles = [
  'src/lib/auth.ts',
  'src/app/api/auth/[...nextauth]/route.ts',
];

authFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERRO: Arquivo ${file} não encontrado`);
    errors++;
  } else {
    console.log(`✅ Arquivo ${file} encontrado`);
  }
});

// Resumo
console.log('\n' + '='.repeat(50));
if (errors === 0 && warnings === 0) {
  console.log('✅ VALIDAÇÃO CONCLUÍDA: Nenhum problema encontrado!');
  console.log('   O projeto está pronto para deploy.');
  process.exit(0);
} else {
  console.log(`\n📊 RESUMO:`);
  console.log(`   ❌ Erros: ${errors}`);
  console.log(`   ⚠️  Avisos: ${warnings}`);
  
  if (errors > 0) {
    console.log('\n❌ VALIDAÇÃO FALHOU: Corrija os erros antes de fazer deploy.');
    process.exit(1);
  } else {
    console.log('\n⚠️  VALIDAÇÃO COM AVISOS: Revise os avisos antes de fazer deploy.');
    process.exit(0);
  }
}
```

---

## 📋 CHECKLIST DE DEPLOY ATUALIZADO

### Antes do Deploy

- [ ] **1. Validar configurações**
  ```bash
  node scripts/validate-production.js
  ```

- [ ] **2. Configurar .env.production com credenciais REAIS do cPanel**
  - Obter credenciais do MySQL no cPanel
  - Atualizar `DATABASE_URL` com usuário, senha e banco corretos
  - Verificar `NEXTAUTH_URL` está correto

- [ ] **3. Build local para verificar erros**
  ```bash
  npm run build
  ```

- [ ] **4. Testar localmente com configuração de produção**
  ```bash
  NODE_ENV=production npm start
  ```

### Durante o Deploy

- [ ] **5. Fazer upload dos arquivos**
  - Incluir `.env.production` (renomear para `.env` no servidor)
  - Incluir todo o código fonte
  - NÃO incluir `node_modules` (instalar no servidor)

- [ ] **6. No servidor, instalar dependências**
  ```bash
  npm install --production
  ```

- [ ] **7. Gerar Prisma Client**
  ```bash
  npx prisma generate
  ```

- [ ] **8. Executar migrações**
  ```bash
  npx prisma migrate deploy
  ```

- [ ] **9. Popular banco com dados iniciais (se necessário)**
  ```bash
  npm run seed
  ```

- [ ] **10. Build no servidor**
  ```bash
  npm run build
  ```

- [ ] **11. Iniciar aplicação**
  ```bash
  npm start
  ```

### Após o Deploy

- [ ] **12. Verificar health check**
  ```
  https://cycode.net/api/health
  ```

- [ ] **13. Testar login**
  - Ir para https://cycode.net/auth/signin
  - Verificar se não há erro 500

- [ ] **14. Verificar logs**
  ```bash
  tail -f ~/logs/cibersegurancaul_error.log
  ```

- [ ] **15. DESABILITAR DEBUG em produção**
  - Mudar `debug: true` para `debug: false` em `auth.ts`

---

## 🚨 PROBLEMAS ADICIONAIS IDENTIFICADOS

### 2. Credenciais de Desenvolvimento no .env.production

**Problema:**  
Arquivo `.env.production` contém credenciais genéricas:
```env
DATABASE_URL="mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal"
AZURE_AD_CLIENT_ID="seu_client_id_microsoft"
GOOGLE_CLIENT_ID="seu_client_id_google"
```

**Impacto:** ⚠️ CRÍTICO - Sistema não consegue conectar ao banco real

**Correção:**  
1. Obter credenciais reais no cPanel → MySQL® Databases
2. Atualizar `.env.production` com valores corretos
3. No servidor, criar as variáveis de ambiente no Node.js App Manager

---

### 3. Falta de Monitoramento de Erros

**Problema:**  
Não há sistema de logging centralizado ou monitoramento de erros em produção.

**Impacto:** 🟡 MÉDIO - Dificulta diagnóstico de problemas

**Sugestões:**
1. **Integrar Sentry ou similar** para captura de erros
2. **Configurar Winston** para logging estruturado
3. **Habilitar logging do Prisma** temporariamente para debug

---

### 4. Rate Limiting Inadequado

**Problema:**  
Verificar se há rate limiting na rota de login para prevenir brute force.

**Arquivo:** `src/app/api/auth/[...nextauth]/route.ts`

**Sugestão:**  
Implementar rate limiting com redis ou alternativa mais simples:

```typescript
// Criar: src/lib/rate-limit.ts
import { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  request: NextRequest,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): boolean {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
```

---

### 5. Ausência de Timeout nas Consultas ao Banco

**Problema:**  
Consultas ao banco podem ficar penduradas indefinidamente.

**Correção em:** `src/lib/prisma.ts`

```typescript
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "pretty",
    // Adicionar timeout
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Definir timeout global para queries (10 segundos)
prisma.$use(async (params, next) => {
  const timeout = 10000; // 10 segundos
  
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Query timeout')), timeout)
  );
  
  try {
    return await Promise.race([next(params), timeoutPromise]);
  } catch (error) {
    console.error(`Query timeout: ${params.model}.${params.action}`);
    throw error;
  }
});
```

---

### 6. Console.error em Produção

**Problema:**  
34 ocorrências de `console.error` no código.

**Impacto:** 🟢 BAIXO - Mas pode gerar logs desnecessários

**Sugestão:**  
Criar um sistema de logging estruturado:

```typescript
// Criar: src/lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export const logger = {
  log(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(meta && { meta }),
    };
    
    if (process.env.NODE_ENV === 'production') {
      // Em produção, apenas logar erros e warnings
      if (level === 'error' || level === 'warn') {
        console.error(JSON.stringify(logEntry));
      }
    } else {
      // Em desenvolvimento, logar tudo
      console.log(JSON.stringify(logEntry, null, 2));
    }
  },
  
  info(message: string, meta?: any) {
    this.log('info', message, meta);
  },
  
  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  },
  
  error(message: string, meta?: any) {
    this.log('error', message, meta);
  },
  
  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  },
};
```

---

## 🎯 PRIORIDADES DE IMPLEMENTAÇÃO

### 🔴 URGENTE (Implementar Hoje)
1. ✅ Criar endpoint `/api/health` para diagnóstico
2. ✅ Melhorar logging em `prisma.ts` e `auth.ts`
3. ✅ Criar página de erro customizada `/auth/error`
4. ⚠️ **VERIFICAR DATABASE_URL no servidor**
5. ⚠️ **EXECUTAR `npx prisma generate` e `npx prisma migrate deploy` no servidor**

### 🟡 IMPORTANTE (Esta Semana)
6. ✅ Criar script de validação `validate-production.js`
7. Implementar timeout nas queries do Prisma
8. Adicionar rate limiting nas rotas de autenticação
9. Configurar variáveis de ambiente corretas no cPanel

### 🟢 MELHORIAS (Próximas Semanas)
10. Integrar sistema de monitoramento (Sentry)
11. Implementar logger estruturado
12. Adicionar testes E2E para fluxo de login
13. Configurar CI/CD para deploy automático

---

## 📞 PRÓXIMOS PASSOS IMEDIATOS

### 1️⃣ Verificar Logs do Servidor
```bash
# No terminal do cPanel
tail -50 ~/logs/cibersegurancaul_error.log
```

### 2️⃣ Testar Health Check (após implementar)
```bash
curl https://cycode.net/api/health
```

### 3️⃣ Verificar Prisma Client
```bash
# No servidor
cd ~/public_html/cibersegurancaul
npx prisma generate
npx prisma migrate status
```

### 4️⃣ Reiniciar Aplicação
```bash
# No cPanel: Node.js App Manager → Restart
```

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Logs de Erro:** `~/logs/cibersegurancaul_error.log`
- **Configuração NextAuth:** https://next-auth.js.org/configuration/options
- **Prisma Troubleshooting:** https://www.prisma.io/docs/guides/database/troubleshooting-orm
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

**💡 Dica:** Após resolver o erro 500, lembre-se de:
- Desabilitar `debug: true` em `auth.ts`
- Remover logs excessivos de console
- Configurar SSL (HTTPS) se ainda não tiver
- Implementar backup automático do banco de dados
