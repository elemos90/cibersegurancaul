# 🚀 Próximos Passos - Guia Rápido

**Data:** Outubro 2025  
**Objetivo:** Completar melhorias de segurança críticas

---

## ⚡ AÇÃO IMEDIATA (5 minutos)

### 1. **Instalar Zod**
```bash
cd d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter
npm install zod
```

✅ **Resultado:** Erros de TypeScript desaparecerão

---

### 2. **Testar o Sistema**
```bash
# Iniciar servidor
npm run dev

# Em outro terminal, testar rate limiting
curl -I http://localhost:3000/api/risks

# Verificar headers (deve mostrar X-RateLimit-* e security headers)
```

---

## 📋 COMPLETAR HOJE (1-2 horas)

### **Aplicar Validação Zod nas Rotas Restantes**

#### ✅ **Policies** (10 min)
```typescript
// src/app/api/policies/route.ts
import { createPolicySchema, formatZodError } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  // ... rate limiting já está
  
  try {
    const body = await req.json();
    const validatedData = createPolicySchema.parse(body); // ✅ ADICIONAR
    
    const policy = await prisma.policy.create({
      data: {
        id: randomUUID(),
        ...validatedData, // ✅ USAR DADOS VALIDADOS
        dataVigencia: validatedData.dataVigencia ? new Date(validatedData.dataVigencia as string) : null,
        dataRevisao: validatedData.dataRevisao ? new Date(validatedData.dataRevisao as string) : null,
        createdById: userId,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    // ✅ ADICIONAR TRATAMENTO ZOD
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: "Dados inválidos",
        details: formatZodError(error)
      }, { status: 400 });
    }
    
    // erro genérico
  }
}
```

#### ✅ **Incidents** (10 min)
```typescript
// src/app/api/incidents/route.ts
import { createIncidentSchema, formatZodError } from '@/lib/validations';
import { ZodError } from 'zod';

// Mesmo padrão da rota de policies
```

#### ✅ **Change Password** (10 min)
```typescript
// src/app/api/auth/change-password/route.ts
import { changePasswordSchema, formatZodError } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  // ... rate limiting já está
  
  try {
    const body = await req.json();
    const validatedData = changePasswordSchema.parse(body); // ✅ ADICIONAR
    
    // validatedData.currentPassword
    // validatedData.newPassword
    // validatedData.confirmPassword (já validado que é igual)
    
    // ... resto do código
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: "Dados inválidos",
        details: formatZodError(error)
      }, { status: 400 });
    }
  }
}
```

#### ✅ **Upload** (15 min)
```typescript
// src/app/api/upload/route.ts
import { 
  fileSchema, 
  hasBlockedExtension,
  sanitizeFilename,
  validateFileSignature,
  formatZodError
} from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  // ... rate limiting já está
  
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    // ✅ VALIDAR METADADOS
    fileSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    // ✅ VALIDAR EXTENSÃO PERIGOSA
    if (hasBlockedExtension(file.name)) {
      return NextResponse.json({ 
        error: "Extensão de arquivo não permitida" 
      }, { status: 400 });
    }
    
    // ✅ VALIDAR MAGIC BYTES
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validateFileSignature(buffer, file.type)) {
      return NextResponse.json({ 
        error: "Tipo de arquivo não corresponde ao conteúdo" 
      }, { status: 400 });
    }
    
    // ✅ SANITIZAR NOME
    const safeName = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${safeName}`;
    
    // ... resto do código usando filename sanitizado
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: "Arquivo inválido",
        details: formatZodError(error)
      }, { status: 400 });
    }
  }
}
```

---

## 🔴 CRÍTICO PARA PRODUÇÃO (Esta Semana)

### **Configurar HTTPS**
```bash
# Em produção, HSTS só funciona com HTTPS

# Opção 1: Nginx como proxy reverso
server {
    listen 443 ssl;
    server_name portal.unilicungo.ac.mz;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Opção 2: Apache (XAMPP)
# Ver README.md seção 4
```

### **Testar Security Headers**
```bash
# Após deploy, testar em:
# https://securityheaders.com
# https://observatory.mozilla.org

# Objetivo: Score A ou A+
```

---

## 📊 ESTA SEMANA (Melhorias Importantes)

### **Logs de Auditoria** (1h)

#### Passo 1: Atualizar Prisma Schema
```prisma
// prisma/schema.prisma

model AuditLog {
  id        String   @id @default(uuid())
  action    String   // Ex: "RISK_CREATED", "USER_LOGIN"
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  entityType String? // Ex: "Risk", "Policy"
  entityId   String?
  details   Json?
  ipAddress  String?
  userAgent  String?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_log")
}

// Adicionar em User model
model User {
  // ... campos existentes
  auditLogs AuditLog[]
}
```

#### Passo 2: Criar Migration
```bash
npx prisma migrate dev --name add_audit_logs
```

#### Passo 3: Ver `GUIA_IMPLEMENTACAO_RAPIDA.md` seção 4

---

### **Paginação** (30 min)

Ver `GUIA_IMPLEMENTACAO_RAPIDA.md` seção 6

```typescript
// lib/pagination.ts - já tem exemplo completo no guia
```

---

## 🎯 ROADMAP COMPLETO

### ✅ **Semana 1 - Fundação** (Concluído)
- [x] Debug mode seguro
- [x] Rate limiting
- [x] Security headers
- [x] Validação Zod (esqueleto)

### 🔄 **Semana 2 - Validação e Auditoria** (Em andamento)
- [ ] Completar validação Zod em todas rotas
- [ ] Implementar logs de auditoria
- [ ] Adicionar paginação
- [ ] Configurar HTTPS em produção

### 📅 **Semana 3 - UX e Performance**
- [ ] Toast notifications
- [ ] Cache Redis
- [ ] Otimizar queries
- [ ] Loading states

### 📅 **Semana 4 - DevOps e Testes**
- [ ] CI/CD pipeline
- [ ] Testes E2E completos
- [ ] Monitoramento (Sentry)
- [ ] Backup automático

---

## 🆘 TROUBLESHOOTING

### Problema: Erros de TypeScript com Zod
**Solução:**
```bash
npm install zod
# Se persistir:
npm install --save-dev @types/node
npx tsc --noEmit # Verificar erros
```

### Problema: Rate limiting não funciona
**Solução:**
```bash
# Verificar se headers estão sendo enviados
curl -I http://localhost:3000/api/risks

# Deve mostrar: X-RateLimit-Limit, X-RateLimit-Remaining
```

### Problema: Security headers não aparecem
**Solução:**
```bash
# Reiniciar servidor após alterar next.config.mjs
npm run dev

# Em produção:
npm run build
npm start
```

### Problema: Validação Zod muito restritiva
**Solução:**
```typescript
// Ajustar schemas em src/lib/validations/*.ts
// Ex: aumentar limite de caracteres
titulo: z.string().min(5).max(500), // antes: 200
```

---

## 📚 DOCUMENTAÇÃO DISPONÍVEL

| Documento | Conteúdo | Quando Usar |
|-----------|----------|-------------|
| `SUGESTOES_MELHORIAS.md` | 44 melhorias completas | Planejamento geral |
| `GUIA_IMPLEMENTACAO_RAPIDA.md` | Top 7 com código pronto | Implementação hands-on |
| `RATE_LIMITING_IMPLEMENTADO.md` | Guia de rate limiting | Referência técnica |
| `SECURITY_HEADERS_IMPLEMENTADOS.md` | Guia de headers | Referência técnica |
| `VALIDACAO_ZOD_IMPLEMENTADA.md` | Guia de validação | Aplicar Zod em rotas |
| `MELHORIAS_IMPLEMENTADAS_RESUMO.md` | Status geral | Acompanhamento |
| `PROXIMOS_PASSOS.md` | Este arquivo | Ação imediata |

---

## ✅ CHECKLIST DIÁRIO

### Hoje (30 min):
- [ ] `npm install zod`
- [ ] Aplicar Zod em rota de policies
- [ ] Aplicar Zod em rota de incidents
- [ ] Testar validações

### Amanhã (1h):
- [ ] Aplicar Zod em change-password
- [ ] Aplicar Zod em upload
- [ ] Criar model AuditLog
- [ ] Implementar logAudit helper

### Esta Semana (2h):
- [ ] Aplicar auditoria em todas rotas
- [ ] Implementar paginação
- [ ] Configurar HTTPS
- [ ] Testar em produção

---

## 🎓 RECURSOS DE APRENDIZAGEM

### Zod
- **Docs:** https://zod.dev
- **Exemplos:** Ver `src/lib/validations/*.ts`

### Rate Limiting
- **OWASP:** https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks
- **Exemplos:** Ver `src/lib/rate-limit.ts`

### Security Headers
- **Teste:** https://securityheaders.com
- **Guia:** https://owasp.org/www-project-secure-headers/

---

## 💡 DICAS FINAIS

1. **Trabalhe Incremental:** Uma melhoria por vez
2. **Teste Sempre:** Após cada mudança
3. **Documente:** Anote problemas e soluções
4. **Peça Ajuda:** Use os guias criados
5. **Monitore:** Verifique logs e erros

---

## 📞 SUPORTE

Se encontrar problemas:

1. **Consulte documentação** específica
2. **Verifique logs** do servidor
3. **Teste isoladamente** cada funcionalidade
4. **Compare com exemplos** nos guias

---

**Boa sorte! 🚀**

**Lembre-se:** Segurança é um processo contínuo, não um destino.
