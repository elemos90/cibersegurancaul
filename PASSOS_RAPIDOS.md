# ⚡ Passos Rápidos - Configuração de Autenticação

## ✅ Problemas Corrigidos

1. **Provider NextAuth**: Alterado de `microsoft-entra-id` para `azure-ad`
2. **Windows .env**: Criado arquivo `.env` (Prisma CLI não lê `.env.local` no Windows)
3. **Variáveis**: Renomeadas `MICROSOFT_*` → `AZURE_AD_*`

## 🚀 Próximos Passos

### 1. Gerar NEXTAUTH_SECRET

No PowerShell, execute:
```powershell
# Opção 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Opção 2: Online (https://generate-secret.vercel.app/32)
```

Copie o resultado e atualize no arquivo `.env`:
```env
NEXTAUTH_SECRET="sua_chave_aqui"
```

### 2. Migrar Base de Dados

**OPÇÃO A: db push (Recomendado para Dev - Mais Simples)**
```powershell
npx prisma db push
```

**OPÇÃO B: Migrations (Produção)**

Se receber erro "P3014: shadow database", execute no phpMyAdmin/MySQL:
```sql
GRANT CREATE ON *.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;
```

Depois:
```powershell
npx prisma migrate dev --name add_auth_models
```

### 3. Gerar Prisma Client

```powershell
npx prisma generate
```

### 4. Testar sem OAuth (opcional)

Por enquanto, você pode testar o sistema **sem** configurar Azure AD e Google. 
O NextAuth vai funcionar, mas os botões de login vão dar erro até você configurar os providers.

Para desabilitar temporariamente um provider, comente no arquivo `src/lib/auth.ts`:

```typescript
providers: [
  // AzureADProvider({ ... }), // Comentado temporariamente
  GoogleProvider({ ... }),
],
```

### 5. Iniciar Servidor

```powershell
npm run dev
```

Acesse: http://localhost:3000

## 📝 Configurar Providers OAuth (Obrigatório para Login)

Siga o guia completo em: **[AUTENTICACAO.md](./AUTENTICACAO.md)**

### Resumo:
- **Azure AD**: portal.azure.com → App registrations → Copiar Client ID, Secret, Tenant ID
- **Google**: console.cloud.google.com → Credentials → OAuth 2.0 → Copiar Client ID e Secret

## 🔍 Verificar Configuração Atual

Execute para ver se todas as variáveis estão definidas:

```powershell
# Ver conteúdo do .env (sem expor valores sensíveis)
Select-String -Path .env -Pattern "^[A-Z]" | ForEach-Object { $_.Line.Split('=')[0] }
```

Deve mostrar:
- DATABASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- AZURE_AD_CLIENT_ID
- AZURE_AD_CLIENT_SECRET
- AZURE_AD_TENANT_ID
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

## ⚠️ Troubleshooting

### Erro: "Environment variable not found: DATABASE_URL"
✅ **Resolvido**: Arquivo `.env` criado

### Erro: "Module not found: 'next-auth/providers/microsoft-entra-id'"
✅ **Resolvido**: Alterado para `azure-ad`

### Erro: "Failed to connect to database"
- Verifique se XAMPP/MySQL está rodando
- Confirme que a base de dados `security_portal` existe
- Teste conexão: `npx prisma db pull`

### Página não carrega / Build error
- Limpe cache: `rm -r .next`
- Reinstale: `npm install`
- Build fresh: `npm run dev`

### OAuth não funciona
- Verifique se `NEXTAUTH_SECRET` está definido e não é o placeholder
- Confirme que todas as variáveis `AZURE_AD_*` e `GOOGLE_*` estão configuradas
- Verifique redirect URIs nos consoles Azure/Google

## 📚 Documentação Completa

- **[AUTENTICACAO.md](./AUTENTICACAO.md)** - Guia completo de OAuth
- **[README.md](./README.md)** - Visão geral do projeto
