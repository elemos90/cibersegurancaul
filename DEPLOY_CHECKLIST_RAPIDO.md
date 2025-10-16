# ⚡ Checklist Rápido de Deploy

**Domínio:** cibersegurancaul.cycode.net  
**IP:** 57.128.126.160  
**Usuário:** cycodene

---

## 🚀 DEPLOY EM 10 PASSOS (2-3 horas)

### ✅ PASSO 1: Preparar Localmente (15 min)

```bash
cd d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter

# 1. Instalar Zod
npm install zod

# 2. Build de produção
npm run build

# 3. Verificar se funcionou
# Deve criar pasta .next/
```

---

### ✅ PASSO 2: Criar Banco MySQL (10 min)

**Acesse:** http://cibersegurancaul.cycode.net/cpanel ou http://57.128.126.160:2083

**Login:** cycodene / [sua senha]

**No cPanel → MySQL Databases:**

1. **Criar Banco:**
   - Nome: `cycodene_portal`
   - Criar

2. **Criar Usuário:**
   - Usuário: `cycodene_dbuser`
   - Senha: [GERAR SENHA FORTE]
   - ⚠️ **COPIAR E GUARDAR SENHA!**

3. **Associar Usuário:**
   - Adicionar `cycodene_dbuser` ao banco `cycodene_portal`
   - Marcar TODOS os privilégios

4. **Anotar:**
   ```
   Host: localhost
   Database: cycodene_portal
   Username: cycodene_dbuser
   Password: [SUA_SENHA_AQUI]
   ```

---

### ✅ PASSO 3: Preparar Arquivos (10 min)

**Criar arquivo `.env.production` no projeto:**

```env
DATABASE_URL="mysql://cycodene_dbuser:SUA_SENHA_AQUI@localhost:3306/cycodene_portal"
NEXTAUTH_URL="http://cibersegurancaul.cycode.net"
NEXTAUTH_SECRET="GERAR_SEGREDO_ABAIXO"
NODE_ENV="production"
```

**Gerar NEXTAUTH_SECRET:**
```bash
# Executar no terminal Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copiar resultado e colar no .env.production
```

**Criar ZIP do projeto:**
- **INCLUIR:**
  - `.next/` ← importante!
  - `public/`
  - `src/`
  - `prisma/`
  - `package.json`
  - `package-lock.json`
  - `next.config.mjs`
  - `tsconfig.json`
  - `.env.production` (será renomeado)

- **EXCLUIR:**
  - `node_modules/`
  - `.git/`
  - `.env.local`
  - `uploads/` (se tiver arquivos de teste)

**Nome do ZIP:** `portal-app.zip`

---

### ✅ PASSO 4: Upload via cPanel (15 min)

1. **cPanel → File Manager**
2. Navegar para `/home/cycodene/`
3. **New Folder:** `portal-app`
4. Entrar em `portal-app`
5. **Upload:** Selecionar `portal-app.zip`
6. Aguardar upload (pode demorar 5-10 min)
7. Clicar com botão direito no ZIP → **Extract**
8. Aguardar extração
9. **Renomear** `.env.production` para `.env`
10. **Editar** `.env` e verificar se dados estão corretos

---

### ✅ PASSO 5: Conectar via SSH (Instalar Dependências) (20 min)

**Windows - Usar PuTTY ou PowerShell:**
```bash
ssh cycodene@57.128.126.160
# Entrar senha
```

**No servidor:**
```bash
# 1. Ir para pasta do projeto
cd /home/cycodene/portal-app

# 2. Verificar Node.js (deve ser v18+)
node --version

# 3. Instalar dependências
npm install --production

# 4. Gerar Prisma Client
npx prisma generate

# 5. Executar migrations
npx prisma migrate deploy
```

---

### ✅ PASSO 6: Criar Usuário Admin (5 min)

**Opção A: Via phpMyAdmin**

1. cPanel → phpMyAdmin
2. Selecionar banco `cycodene_portal`
3. Aba **SQL**
4. Executar:

```sql
INSERT INTO users (id, name, email, password, papel, mustChangePassword, createdAt, updatedAt)
VALUES (
  UUID(),
  'Administrador',
  'admin@unilicungo.ac.mz',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eplkKK.5M3dC',
  'admin',
  1,
  NOW(),
  NOW()
);
```

**Credenciais:**
- Email: `admin@unilicungo.ac.mz`
- Senha: `admin123`

⚠️ **TROCAR SENHA APÓS PRIMEIRO LOGIN!**

---

### ✅ PASSO 7: Instalar e Configurar PM2 (10 min)

**No SSH:**
```bash
# 1. Instalar PM2 globalmente
npm install -g pm2

# 2. Iniciar aplicação
cd /home/cycodene/portal-app
pm2 start npm --name "portal" -- start

# 3. Verificar status
pm2 status

# 4. Ver logs
pm2 logs portal

# 5. Configurar auto-start
pm2 startup
# Copiar e executar comando que aparecer

pm2 save

# 6. Comandos úteis:
# pm2 restart portal    # Reiniciar
# pm2 stop portal       # Parar
# pm2 logs portal       # Ver logs
# pm2 monit            # Monitorar recursos
```

---

### ✅ PASSO 8: Configurar Proxy (.htaccess) (10 min)

**Criar arquivo em `/home/cycodene/public_html/.htaccess`**

**Via cPanel → File Manager:**
1. Ir para `public_html`
2. **New File:** `.htaccess`
3. Editar e adicionar:

```apache
# Habilitar RewriteEngine
RewriteEngine On

# Proxy para aplicação Node.js na porta 3000
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de segurança
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
```

**Salvar arquivo**

---

### ✅ PASSO 9: Testar Aplicação (5 min)

**No navegador:**
1. Acessar: http://cibersegurancaul.cycode.net
2. Verificar:
   - ✅ Página carrega
   - ✅ Estilos aparecem
   - ✅ Fazer login com admin@unilicungo.ac.mz / admin123
   - ✅ Dashboard funciona

**Se NÃO funcionar:**
```bash
# Verificar logs
pm2 logs portal

# Ver erros
pm2 logs --err

# Verificar se porta 3000 está aberta
netstat -tulpn | grep 3000

# Testar localmente no servidor
curl http://localhost:3000
```

---

### ✅ PASSO 10: Configurar SSL/HTTPS (20 min)

**cPanel → SSL/TLS Status:**
1. Encontrar domínio `cibersegurancaul.cycode.net`
2. Clicar em **Run AutoSSL**
3. Aguardar instalação (2-5 minutos)

**Forçar HTTPS - Editar `.htaccess`:**

Adicionar NO INÍCIO do arquivo:
```apache
# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Atualizar `.env`:**
```bash
# Via SSH ou cPanel File Manager
nano /home/cycodene/portal-app/.env

# Mudar linha:
NEXTAUTH_URL="https://cibersegurancaul.cycode.net"
```

**Reiniciar aplicação:**
```bash
pm2 restart portal
```

**Testar:** https://cibersegurancaul.cycode.net

---

## 🎯 CHECKLIST FINAL

### Antes de Anunciar:
- [ ] Site acessível via domínio
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Criar riscos/políticas/incidentes funciona
- [ ] Upload de arquivos funciona
- [ ] Trocar senha do admin padrão
- [ ] Testar rate limiting (fazer 10 requisições rápidas)
- [ ] Verificar security headers (curl -I https://...)

---

## 🐛 PROBLEMAS COMUNS

### "Cannot connect to database"
```bash
# Verificar DATABASE_URL no .env
cat /home/cycodene/portal-app/.env

# Testar conexão MySQL
mysql -u cycodene_dbuser -p cycodene_portal
```

### "Port 3000 already in use"
```bash
# Ver o que está na porta 3000
lsof -i :3000

# Matar processo se necessário
kill -9 [PID]

# Reiniciar PM2
pm2 restart portal
```

### "502 Bad Gateway"
```bash
# Verificar se Node.js está rodando
pm2 status

# Se não estiver, iniciar
cd /home/cycodene/portal-app
pm2 start npm --name "portal" -- start

# Ver logs de erro
pm2 logs --err
```

### "Module not found"
```bash
cd /home/cycodene/portal-app

# Reinstalar
rm -rf node_modules
npm install --production

# Regenerar Prisma
npx prisma generate

# Reiniciar
pm2 restart portal
```

### Estilos não carregam
```bash
# Verificar se build existe
ls -la /home/cycodene/portal-app/.next/

# Rebuild se necessário
cd /home/cycodene/portal-app
npm run build

# Reiniciar
pm2 restart portal
```

---

## 📞 INFORMAÇÕES RÁPIDAS

### Acesso cPanel:
- URL: http://cibersegurancaul.cycode.net/cpanel
- User: cycodene
- Pass: [sua senha]

### SSH:
```bash
ssh cycodene@57.128.126.160
```

### Comandos PM2:
```bash
pm2 status              # Ver status
pm2 logs portal         # Ver logs
pm2 restart portal      # Reiniciar
pm2 stop portal         # Parar
pm2 start portal        # Iniciar
pm2 monit              # Monitor recursos
```

### Caminhos Importantes:
- Aplicação: `/home/cycodene/portal-app`
- Public HTML: `/home/cycodene/public_html`
- .htaccess: `/home/cycodene/public_html/.htaccess`
- .env: `/home/cycodene/portal-app/.env`
- Logs PM2: `~/.pm2/logs/`

---

## 🔄 ATUALIZAÇÕES FUTURAS

```bash
# 1. Build local
npm run build

# 2. Criar novo ZIP (portal-app-v2.zip)

# 3. Upload via cPanel

# 4. No servidor:
cd /home/cycodene/portal-app
# Backup
cp -r ../portal-app ../portal-app-backup

# Extrair novos arquivos
# (via cPanel ou unzip)

# Instalar dependências novas
npm install --production

# Migrations (se houver)
npx prisma migrate deploy

# Reiniciar
pm2 restart portal

# Verificar
pm2 logs portal
```

---

## 📊 MONITORAMENTO

### Diariamente verificar:
```bash
# Status
pm2 status

# Logs
pm2 logs portal --lines 50

# Recursos
pm2 monit

# Espaço em disco
df -h
```

---

## ✅ PRONTO!

Acesse: **https://cibersegurancaul.cycode.net**

Login inicial:
- Email: `admin@unilicungo.ac.mz`
- Senha: `admin123`

⚠️ **TROCAR SENHA IMEDIATAMENTE!**

---

**Tempo Total Estimado:** 2-3 horas  
**Dificuldade:** Média

Para guia detalhado, consulte: `DEPLOY_GUIA_COMPLETO.md`
