# Correção de Erro 500 - Deploy cPanel

## ✅ Problemas Identificados

1. **NEXTAUTH_URL** estava apontando para localhost ❌
2. **DATABASE_URL** precisa ser configurado com credenciais do cPanel
3. Falta executar build do Next.js
4. Falta instalar dependências no servidor

---

## 🔧 Passos para Corrigir

### 1. Atualizar Variáveis de Ambiente no Servidor

No cPanel, você precisa configurar as variáveis de ambiente:

**Acesse: Node.js App → Edit Application → Environment Variables**

```env
# DATABASE_URL - OBRIGATÓRIO
# Formato: mysql://usuario:senha@host:porta/database
# Substitua pelos dados do seu MySQL no cPanel:
DATABASE_URL=mysql://seu_usuario_mysql:sua_senha_mysql@localhost:3306/seu_banco_dados

# NEXTAUTH_URL - OBRIGATÓRIO
NEXTAUTH_URL=https://cycode.net

# NEXTAUTH_SECRET - OBRIGATÓRIO (já gerado)
NEXTAUTH_SECRET=Mk6omx8d9+ZSt6eqjo2M5eNMtb93mBJ34m6xJqRyLA8=

# NODE_ENV - OBRIGATÓRIO
NODE_ENV=production

# Azure AD (opcional - só se for usar login Microsoft)
AZURE_AD_CLIENT_ID=seu_client_id_microsoft
AZURE_AD_CLIENT_SECRET=seu_client_secret_microsoft
AZURE_AD_TENANT_ID=seu_tenant_id_ou_common

# Google OAuth (opcional - só se for usar login Google)
GOOGLE_CLIENT_ID=seu_client_id_google
GOOGLE_CLIENT_SECRET=seu_client_secret_google
```

---

### 2. Obter Credenciais do MySQL no cPanel

**Passo a passo:**

1. Vá para **cPanel → MySQL® Databases**
2. Anote:
   - **Nome do Banco de Dados**: (ex: `cycode_security_portal`)
   - **Usuário MySQL**: (ex: `cycode_user`)
   - **Senha**: a senha que você criou
   - **Host**: geralmente é `localhost`

3. Monte a DATABASE_URL:
   ```
   mysql://cycode_user:sua_senha@localhost:3306/cycode_security_portal
   ```
   
   ⚠️ **IMPORTANTE**: Se a senha tiver caracteres especiais, codifique-os:
   - `#` → `%23`
   - `@` → `%40`
   - `%` → `%25`
   - Etc.

---

### 3. Preparar o Projeto para Deploy

No seu computador local:

```bash
# 1. Instalar dependências
npm install

# 2. Gerar o Prisma Client
npx prisma generate

# 3. Fazer build do Next.js
npm run build

# 4. Verificar se a pasta .next foi criada
ls -la .next
```

---

### 4. Upload dos Arquivos Necessários

**Via File Manager ou FTP, faça upload de:**

✅ **Obrigatórios:**
- `package.json`
- `package-lock.json`
- `server.js` ✨ (novo arquivo criado)
- `next.config.mjs`
- `tsconfig.json`
- `.next/` (pasta inteira após build)
- `public/` (pasta inteira)
- `prisma/` (pasta inteira)
- `node_modules/` (ou instale no servidor - ver passo 5)

❌ **NÃO fazer upload:**
- `.env` (nunca enviar!)
- `.env.local`
- `.git/`
- `tests/`
- `coverage/`

---

### 5. Executar Comandos no Terminal do cPanel

**Acesse: Terminal no cPanel**

```bash
# 1. Navegar até o diretório da aplicação
cd ~/public_html/cibersegurancaul

# 2. Instalar dependências (se não fez upload do node_modules)
npm install --production

# 3. Gerar Prisma Client no servidor
npx prisma generate

# 4. Executar migrações do banco de dados
npx prisma migrate deploy

# 5. (Opcional) Seed do banco de dados
npm run seed
```

---

### 6. Configurar a Aplicação Node.js no cPanel

**Acesse: Setup Node.js App**

- **Application root**: `public_html/cibersegurancaul`
- **Application URL**: `cycode.net`
- **Application startup file**: `server.js` ✅
- **Node.js version**: `18.20.8` (recomendado)
- **Application mode**: `Production`

**Clique em "RESTART"**

---

### 7. Verificar Logs

Se ainda houver erro, verifique os logs:

**No cPanel:**
1. Node.js App → View Logs
2. Ou acesse: `~/logs/`

**Erros Comuns:**

- ❌ `PrismaClientInitializationError`: Problema com DATABASE_URL
- ❌ `NEXTAUTH_URL is not configured`: Falta configurar variável
- ❌ `Cannot find module`: Falta instalar dependências
- ❌ `Port already in use`: Outra aplicação usando a porta

---

## 🎯 Checklist Rápido

- [ ] Atualizar `.env.production` com URL de produção
- [ ] Obter credenciais MySQL do cPanel
- [ ] Configurar variáveis de ambiente no cPanel
- [ ] Executar `npm run build` localmente
- [ ] Fazer upload dos arquivos necessários
- [ ] Instalar dependências no servidor (`npm install`)
- [ ] Executar `npx prisma generate`
- [ ] Executar `npx prisma migrate deploy`
- [ ] Configurar Application startup file: `server.js`
- [ ] Reiniciar a aplicação
- [ ] Verificar logs em caso de erro

---

## 📞 Próximos Passos

Após seguir este guia, seu site deverá estar funcionando em:
**https://cycode.net**

Se ainda houver problemas, compartilhe:
1. Os logs do servidor
2. As variáveis de ambiente configuradas (SEM senhas!)
3. A mensagem de erro específica
