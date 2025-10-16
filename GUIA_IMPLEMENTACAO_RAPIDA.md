# 🚀 Guia de Implementação Rápida - Melhorias Prioritárias

Este guia fornece passos práticos para implementar as **7 melhorias mais críticas** de segurança e performance.

---

## 1️⃣ Desabilitar Debug Mode em Produção (5 min)

### Arquivo: `src/lib/auth.ts`

**Antes:**
```typescript
export const authOptions: NextAuthOptions = {
  // ...
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // ❌ PERIGO: Expõe logs sensíveis
};
```

**Depois:**
```typescript
export const authOptions: NextAuthOptions = {
  // ...
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // ✅ Apenas em dev
};
```

---

## 2️⃣ Implementar Rate Limiting (30 min)

### Passo 1: Instalar Dependências
```bash
npm install express-rate-limit
npm install -D @types/express-rate-limit
```

### Passo 2: Criar Middleware
**Arquivo: `src/lib/rate-limit.ts`**
```typescript
import rateLimit from 'express-rate-limit';

// Rate limiter para autenticação (mais restritivo)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas por IP
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para APIs gerais
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 60, // 60 requisições por minuto
  message: 'Muitas requisições. Aguarde um momento.',
  standardHeaders: true,
  legacyHeaders: false,
});
```

### Passo 3: Aplicar em Rotas Sensíveis
**Arquivo: `src/app/api/auth/[...nextauth]/route.ts`**
```typescript
import { authLimiter } from '@/lib/rate-limit';

// Adicionar middleware antes da rota
export async function POST(req: Request) {
  // Aplicar rate limit
  await authLimiter(req as any, {} as any);
  
  // Resto da lógica...
}
```

---

## 3️⃣ Validação de Input com Zod (45 min)

### Passo 1: Instalar Zod
```bash
npm install zod
```

### Passo 2: Criar Schemas
**Arquivo: `src/lib/validations/risk.schema.ts`**
```typescript
import { z } from 'zod';

export const createRiskSchema = z.object({
  titulo: z.string()
    .min(5, 'Título deve ter no mínimo 5 caracteres')
    .max(200, 'Título muito longo'),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(5000, 'Descrição muito longa'),
  
  categoria: z.enum([
    'tecnologico',
    'humano',
    'processo',
    'externo',
    'compliance',
    'reputacional'
  ]),
  
  probabilidade: z.enum([
    'muito_baixo',
    'baixo',
    'medio',
    'alto',
    'muito_alto'
  ]),
  
  impacto: z.enum([
    'muito_baixo',
    'baixo',
    'medio',
    'alto',
    'muito_alto'
  ]),
  
  status: z.enum([
    'identificado',
    'em_analise',
    'em_tratamento',
    'mitigado',
    'aceito',
    'transferido'
  ]).optional(),
  
  estrategia: z.enum([
    'mitigar',
    'aceitar',
    'transferir',
    'evitar'
  ]).optional(),
  
  planoAcao: z.string().max(5000).optional(),
  responsavel: z.string().max(200).optional(),
  prazo: z.string().datetime().optional(),
  
  probResidual: z.enum([
    'muito_baixo',
    'baixo',
    'medio',
    'alto',
    'muito_alto'
  ]).optional(),
  
  impactoResidual: z.enum([
    'muito_baixo',
    'baixo',
    'medio',
    'alto',
    'muito_alto'
  ]).optional(),
});

export type CreateRiskInput = z.infer<typeof createRiskSchema>;
```

### Passo 3: Usar em API Routes
**Arquivo: `src/app/api/risks/route.ts`**
```typescript
import { createRiskSchema } from '@/lib/validations/risk.schema';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    
    // ✅ VALIDAÇÃO COM ZOD
    const validatedData = createRiskSchema.parse(body);
    
    const userId = (session.user as any).id;
    const nivelRisco = calcularNivelRisco(
      validatedData.probabilidade, 
      validatedData.impacto
    ) as RiskLevel;

    const nivelResidual = (validatedData.probResidual && validatedData.impactoResidual) 
      ? (calcularNivelRisco(validatedData.probResidual, validatedData.impactoResidual) as RiskLevel)
      : null;

    const risk = await prisma.risk.create({
      data: {
        id: randomUUID(),
        ...validatedData,
        nivelRisco,
        nivelResidual,
        status: validatedData.status || "identificado",
        prazo: validatedData.prazo ? new Date(validatedData.prazo) : null,
        createdById: userId,
        updatedAt: new Date()
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(risk, { status: 201 });
    
  } catch (error) {
    // Tratamento de erros de validação
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: "Dados inválidos", 
          details: error.errors.map(e => ({
            campo: e.path.join('.'),
            mensagem: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    console.error("Erro ao criar risco:", error);
    return NextResponse.json(
      { error: "Erro ao criar risco" },
      { status: 500 }
    );
  }
}
```

---

## 4️⃣ Implementar Logs de Auditoria (1 hora)

### Passo 1: Adicionar Model no Prisma
**Arquivo: `prisma/schema.prisma`**
```prisma
model AuditLog {
  id        String   @id @default(uuid())
  action    String   // Ex: "RISK_CREATED", "USER_LOGIN"
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  entityType String? // Ex: "Risk", "Policy", "Incident"
  entityId   String?
  details   Json?    // Dados adicionais
  ipAddress  String?
  userAgent  String?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_log")
}

// Adicionar relação em User
model User {
  // ... campos existentes
  auditLogs AuditLog[]
}
```

### Passo 2: Criar Migration
```bash
npx prisma migrate dev --name add_audit_logs
```

### Passo 3: Criar Helper de Auditoria
**Arquivo: `src/lib/audit.ts`**
```typescript
import { prisma } from './prisma';
import { headers } from 'next/headers';

export type AuditAction = 
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'RISK_CREATED'
  | 'RISK_UPDATED'
  | 'RISK_DELETED'
  | 'POLICY_CREATED'
  | 'POLICY_UPDATED'
  | 'POLICY_DELETED'
  | 'INCIDENT_CREATED'
  | 'INCIDENT_UPDATED'
  | 'INCIDENT_DELETED'
  | 'PASSWORD_CHANGED'
  | 'EVIDENCE_UPLOADED'
  | 'EVIDENCE_DELETED';

interface AuditOptions {
  action: AuditAction;
  userId?: string;
  entityType?: string;
  entityId?: string;
  details?: any;
}

export async function logAudit(options: AuditOptions) {
  try {
    const headersList = headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    await prisma.auditLog.create({
      data: {
        action: options.action,
        userId: options.userId,
        entityType: options.entityType,
        entityId: options.entityId,
        details: options.details || {},
        ipAddress,
        userAgent,
      }
    });
  } catch (error) {
    // Log mas não falhar a operação principal
    console.error('Erro ao registrar auditoria:', error);
  }
}

// Helper para queries de auditoria
export async function getAuditLogs(filters: {
  userId?: string;
  action?: AuditAction;
  entityType?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}) {
  const where: any = {};
  
  if (filters.userId) where.userId = filters.userId;
  if (filters.action) where.action = filters.action;
  if (filters.entityType) where.entityType = filters.entityType;
  
  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = filters.startDate;
    if (filters.endDate) where.createdAt.lte = filters.endDate;
  }

  return await prisma.auditLog.findMany({
    where,
    include: {
      user: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: filters.limit || 100
  });
}
```

### Passo 4: Usar em APIs
**Exemplo em `src/app/api/risks/route.ts`:**
```typescript
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    // ... validação e criação do risco
    
    const risk = await prisma.risk.create({ /* ... */ });
    
    // ✅ REGISTRAR AUDITORIA
    await logAudit({
      action: 'RISK_CREATED',
      userId,
      entityType: 'Risk',
      entityId: risk.id,
      details: {
        titulo: risk.titulo,
        categoria: risk.categoria,
        nivelRisco: risk.nivelRisco
      }
    });

    return NextResponse.json(risk, { status: 201 });
  } catch (error) {
    // ...
  }
}
```

---

## 5️⃣ Headers de Segurança (15 min)

### Arquivo: `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ✅ Headers de Segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

---

## 6️⃣ Paginação em APIs (30 min)

### Criar Helper de Paginação
**Arquivo: `src/lib/pagination.ts`**
```typescript
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextCursor?: string;
  };
}

export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  return {
    page: parseInt(searchParams.get('page') || '1'),
    limit: Math.min(parseInt(searchParams.get('limit') || '20'), 100), // Max 100
    cursor: searchParams.get('cursor') || undefined
  };
}

export async function paginateQuery<T>(
  model: any,
  where: any,
  params: PaginationParams,
  include?: any
): Promise<PaginatedResponse<T>> {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      include,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    model.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      nextCursor: data.length === limit ? data[data.length - 1].id : undefined
    }
  };
}
```

### Aplicar em API Route
**Arquivo: `src/app/api/risks/route.ts`**
```typescript
import { parsePaginationParams, paginateQuery } from '@/lib/pagination';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const paginationParams = parsePaginationParams(searchParams);
    
    const categoria = searchParams.get("categoria");
    const status = searchParams.get("status");

    const where: any = {};
    if (categoria) where.categoria = categoria;
    if (status) where.status = status;

    // ✅ PAGINAÇÃO
    const result = await paginateQuery(
      prisma.risk,
      where,
      paginationParams,
      {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: {
          select: { id: true, filename: true, originalName: true, size: true }
        }
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao buscar riscos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar riscos" },
      { status: 500 }
    );
  }
}
```

---

## 7️⃣ Toast Notifications (20 min)

### Passo 1: Instalar
```bash
npm install react-hot-toast
```

### Passo 2: Configurar Provider
**Arquivo: `src/components/Providers.tsx`**
```typescript
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </SessionProvider>
  );
}
```

### Passo 3: Usar em Componentes
```typescript
"use client";

import { toast } from 'react-hot-toast';

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/risks', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      toast.success('Risco criado com sucesso! ✅');
      router.push('/risks');
    } else {
      const error = await response.json();
      toast.error(error.error || 'Erro ao criar risco');
    }
  } catch (error) {
    toast.error('Erro de conexão. Tente novamente.');
  }
}
```

---

## ✅ Checklist de Implementação

### Segurança
- [ ] Debug mode desabilitado em produção
- [ ] Rate limiting implementado
- [ ] Validação Zod em todas as APIs
- [ ] Logs de auditoria funcionando
- [ ] Headers de segurança configurados

### Performance
- [ ] Paginação em APIs de listagem
- [ ] Queries otimizadas (sem N+1)

### UX
- [ ] Toast notifications implementadas
- [ ] Loading states consistentes

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Testes
npm run test
npm run test:e2e

# Validação completa
npm run validate

# Prisma
npx prisma migrate dev
npx prisma generate
npx prisma studio

# Lint e format
npm run lint:fix
npx prettier --write .
```

---

## 📊 Métricas de Sucesso

Após implementação, verificar:

1. **Segurança:**
   - [ ] 0 credenciais expostas em logs
   - [ ] Rate limiting bloqueia tentativas excessivas
   - [ ] Validação rejeita inputs inválidos

2. **Performance:**
   - [ ] APIs respondem em < 500ms
   - [ ] Queries otimizadas (usar EXPLAIN no MySQL)
   - [ ] Paginação reduz payload

3. **Auditoria:**
   - [ ] Todas ações críticas logadas
   - [ ] Dashboard de auditoria funcional

---

## 🆘 Troubleshooting

### Erro: "Rate limiter não funciona"
- Verificar se middleware está aplicado corretamente
- Checar logs de erro

### Erro: "Zod validation fails"
- Verificar se tipos Prisma correspondem aos schemas
- Revisar mensagens de erro no console

### Erro: "Audit logs não aparecem"
- Verificar se migration rodou com sucesso
- Checar prisma.schema e regenerar client

---

**Tempo Total Estimado:** 3-4 horas  
**Impacto:** 🔴 Crítico para segurança e experiência do usuário

---

**Próximo Passo:** Após concluir estas melhorias, revisar o documento `SUGESTOES_MELHORIAS.md` para itens de prioridade média.
