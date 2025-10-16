# 🚀 Guia de Deploy - cibersegurancaul.cycode.net

**Domínio:** http://cibersegurancaul.cycode.net/  
**IP:** 57.128.126.160  
**Usuário:** cycodene  
**Data:** Outubro 2025

---

## 📋 Pré-requisitos

### Seu Ambiente de Hospedagem Precisa Ter:
- ✅ **Node.js** (v18 ou superior)
- ✅ **MySQL** (v5.7 ou superior)
- ✅ **Git** (opcional, facilita deploy)
- ✅ **SSH/FTP** (para upload de arquivos)
- ✅ **cPanel ou similar** (gerenciamento)

---

## 🎯 Estratégia de Deploy

### **Opção 1: Deploy com cPanel (Recomendado)**
Se seu servidor tem cPanel, este é o caminho mais fácil.

### **Opção 2: Deploy Manual via SSH/FTP**
Se não tem cPanel, faremos upload manual.

---

## 📦 PASSO 1: Preparar o Projeto Localmente

### 1.1 Instalar Dependências
```bash
cd d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter

# Instalar pacote Zod (se ainda não instalou)
npm install zod

# Instalar todas as dependências
npm install
```

### 1.2 Configurar Variáveis de Ambiente de Produção
```bash
# Criar arquivo .env.production
copy .env.local .env.production
```

Editar `.env.production`:
```env
# DATABASE - Configuração do servidor de hospedagem
DATABASE_URL="mysql://cycodene_dbuser:SENHA_FORTE@localhost:3306/cycodene_portal"

# NEXTAUTH - Configuração de produção
NEXTAUTH_URL="http://cibersegurancaul.cycode.net"
NEXTAUTH_SECRET="GERAR_SEGREDO_FORTE_AQUI"

# NODE_ENV
NODE_ENV="production"

# AZURE AD (se usar)
AZURE_AD_CLIENT_ID="seu_client_id"
AZURE_AD_CLIENT_SECRET="seu_client_secret"
AZURE_AD_TENANT_ID="seu_tenant_id"

# GOOGLE OAUTH (se usar)
GOOGLE_CLIENT_ID="seu_client_id"
GOOGLE_CLIENT_SECRET="seu_client_secret"
```

**IMPORTANTE:** Gerar NEXTAUTH_SECRET forte:
```bash
# No terminal (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Ou online: https://generate-secret.vercel.app/32
```

### 1.3 Atualizar Configurações para Produção

**Criar arquivo `ecosystem.config.js`** (para PM2):
```javascript
module.exports = {
  apps: [{
    name: 'portal-ciberseguranca',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/home/cycodene/public_html',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 1.4 Build do Projeto
```bash
# Build de produção
npm run build

# Verificar se build funcionou
# Deve criar pasta .next
```

---

## 🗄️ PASSO 2: Configurar Banco de Dados MySQL

### 2.1 Acessar cPanel

1. Acesse: http://57.128.126.160:2083 ou http://cibersegurancaul.cycode.net/cpanel
2. Login: `cycodene`
3. Senha: (sua senha)

### 2.2 Criar Banco de Dados

**Via cPanel → MySQL Databases:**

1. **Criar novo banco:**
   - Nome: `cycodene_portal`
   - Charset: `utf8mb4_unicode_ci`

2. **Criar usuário:**
   - Usuário: `cycodene_dbuser`
   - Senha: (gerar senha forte)
   - ⚠️ **ANOTAR SENHA!**

3. **Adicionar usuário ao banco:**
   - Usuário: `cycodene_dbuser`
   - Banco: `cycodene_portal`
   - Privilégios: **TODOS**

4. **Anotar informações:**
   ```
   Host: localhost
   Database: cycodene_portal
   Username: cycodene_dbuser
   Password: [SUA_SENHA]
   Port: 3306
   ```

### 2.3 Testar Conexão

**Via cPanel → phpMyAdmin:**
1. Selecionar banco `cycodene_portal`
2. Verificar se conecta

---

## 📤 PASSO 3: Upload dos Arquivos

### Opção A: Via cPanel File Manager (Mais Fácil)

#### 3.1 Criar Estrutura de Pastas
```
/home/cycodene/
├── public_html/        # Pasta pública (raiz do site)
│   └── .htaccess       # Redirecionamento para Node.js
├── portal-app/         # Aplicação Next.js
│   ├── .next/
│   ├── public/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
└── logs/               # Logs da aplicação
```

#### 3.2 Comprimir Projeto Localmente
```bash
# No seu computador
cd d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter

# Criar ZIP (excluir node_modules)
# Usar 7-Zip ou WinRAR para criar: portal-app.zip
# Incluir:
# - .next/
# - public/
# - src/
# - prisma/
# - package.json
# - package-lock.json
# - next.config.mjs
# - tsconfig.json
# - ecosystem.config.js (se criou)
# - .env.production (renomear para .env no servidor)

# EXCLUIR:
# - node_modules/
# - .git/
# - .env.local
# - uploads/ (se tiver arquivos de teste)
```

#### 3.3 Upload via cPanel
1. **cPanel → File Manager**
2. Navegar para `/home/cycodene/`
3. Criar pasta `portal-app`
4. Entrar em `portal-app`
5. **Upload** → Selecionar `portal-app.zip`
6. Aguardar upload (pode demorar)
7. **Extrair** arquivo ZIP
8. Renomear `.env.production` para `.env`

---

### Opção B: Via FTP (Alternativa)

#### 3.1 Usar FileZilla
```
Host: 57.128.126.160 ou ftp.cibersegurancaul.cycode.net
Username: cycodene
Password: [SUA_SENHA]
Port: 21
```

#### 3.2 Upload de Arquivos
1. Conectar via FTP
2. Navegar para `/home/cycodene/portal-app`
3. Upload de todos os arquivos (exceto node_modules)
4. Aguardar transferência completa

---

### Opção C: Via SSH (Avançado)

Se tiver acesso SSH:
```bash
# Conectar via SSH
ssh cycodene@57.128.126.160

# Clonar repositório (se usar Git)
cd /home/cycodene
git clone [SEU_REPOSITORIO] portal-app
cd portal-app

# Ou fazer upload manual e depois:
cd /home/cycodene/portal-app

# Instalar dependências
npm install --production

# Build (se não fez localmente)
npm run build
```

---

## ⚙️ PASSO 4: Configurar Aplicação no Servidor

### 4.1 Conectar via SSH
```bash
ssh cycodene@57.128.126.160
# Entrar senha
```

### 4.2 Instalar Dependências
```bash
cd /home/cycodene/portal-app

# Instalar apenas dependências de produção
npm install --production --omit=dev

# Verificar instalação
ls node_modules/
```

### 4.3 Configurar Variáveis de Ambiente
```bash
# Editar .env
nano .env

# Ou via cPanel File Manager → Editar .env
```

Conteúdo do `.env`:
```env
DATABASE_URL="mysql://cycodene_dbuser:SUA_SENHA_AQUI@localhost:3306/cycodene_portal"
NEXTAUTH_URL="http://cibersegurancaul.cycode.net"
NEXTAUTH_SECRET="SEU_SEGREDO_FORTE_AQUI"
NODE_ENV="production"
```

**Salvar e fechar** (Ctrl+X, Y, Enter)

### 4.4 Executar Migrations do Prisma
```bash
cd /home/cycodene/portal-app

# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate deploy

# Popular banco (se tiver seed)
npx prisma db seed
```

### 4.5 Criar Usuário Admin Inicial
```bash
# Executar script de seed ou criar manualmente via Prisma Studio
npx prisma studio

# Ou criar via script SQL direto no phpMyAdmin
```

**SQL para criar admin:**
```sql
INSERT INTO users (id, name, email, password, papel, mustChangePassword, createdAt, updatedAt)
VALUES (
  UUID(),
  'Administrador',
  'admin@unilicungo.ac.mz',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eplkKK.5M3dC', -- senha: admin123
  'admin',
  1,
  NOW(),
  NOW()
);
```

⚠️ **TROCAR SENHA IMEDIATAMENTE APÓS PRIMEIRO LOGIN!**

---

## 🚀 PASSO 5: Iniciar Aplicação

### Opção A: Usando PM2 (Recomendado)

```bash
# Instalar PM2 globalmente (se não tiver)
npm install -g pm2

# Iniciar aplicação
cd /home/cycodene/portal-app
pm2 start ecosystem.config.js

# Verificar status
pm2 status

# Ver logs
pm2 logs portal-ciberseguranca

# Configurar para iniciar automaticamente
pm2 startup
pm2 save

# Comandos úteis:
pm2 restart portal-ciberseguranca  # Reiniciar
pm2 stop portal-ciberseguranca     # Parar
pm2 delete portal-ciberseguranca   # Remover
```

### Opção B: Usando Node.js Diretamente

```bash
cd /home/cycodene/portal-app

# Iniciar em background
nohup npm start > ../logs/app.log 2>&1 &

# Verificar se está rodando
ps aux | grep node

# Ver logs
tail -f ../logs/app.log
```

---

## 🌐 PASSO 6: Configurar Proxy Reverso

### 6.1 Criar .htaccess em public_html

**Arquivo:** `/home/cycodene/public_html/.htaccess`

```apache
# Redirecionar todo tráfego para aplicação Node.js
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de segurança (backup, caso Next.js não envie)
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"

# Compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache para assets estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 6.2 Alternativa: Configuração Node.js App em cPanel

Se seu cPanel tem **"Setup Node.js App"**:

1. **cPanel → Setup Node.js App**
2. **Create Application:**
   - Node.js version: 18.x ou superior
   - Application mode: Production
   - Application root: `/home/cycodene/portal-app`
   - Application URL: `/`
   - Application startup file: `node_modules/next/dist/bin/next`
   - Environment variables: (adicionar do .env)

3. **Restart** aplicação

---

## 🔒 PASSO 7: Configurar SSL/HTTPS (Crítico)

### 7.1 Via cPanel - Let's Encrypt

1. **cPanel → SSL/TLS Status**
2. Selecionar `cibersegurancaul.cycode.net`
3. **Run AutoSSL**
4. Aguardar instalação

### 7.2 Forçar HTTPS

**Adicionar no .htaccess:**
```apache
# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 7.3 Atualizar Variável de Ambiente

```bash
# Editar .env
nano /home/cycodene/portal-app/.env

# Mudar:
NEXTAUTH_URL="https://cibersegurancaul.cycode.net"
```

**Reiniciar aplicação:**
```bash
pm2 restart portal-ciberseguranca
```

---

## ✅ PASSO 8: Testar Deploy

### 8.1 Verificações Básicas

```bash
# Verificar se Node.js está rodando
ps aux | grep node

# Verificar porta 3000
netstat -tulpn | grep 3000

# Testar localmente no servidor
curl http://localhost:3000

# Ver logs
pm2 logs
# ou
tail -f /home/cycodene/logs/app.log
```

### 8.2 Testar no Navegador

1. **Acessar:** http://cibersegurancaul.cycode.net
2. **Verificar:**
   - ✅ Página carrega
   - ✅ Estilos aplicados (Tailwind)
   - ✅ Login funciona
   - ✅ Dashboard acessível

### 8.3 Testar Security Headers

```bash
curl -I https://cibersegurancaul.cycode.net

# Deve mostrar:
# strict-transport-security: max-age=63072000...
# x-frame-options: SAMEORIGIN
# x-content-type-options: nosniff
# content-security-policy: ...
```

### 8.4 Testar Rate Limiting

```bash
# Fazer múltiplas requisições
for i in {1..10}; do
  curl -I https://cibersegurancaul.cycode.net/api/risks
done

# Deve mostrar headers X-RateLimit-*
```

---

## 🐛 TROUBLESHOOTING

### Problema 1: "Cannot connect to database"

**Solução:**
```bash
# Verificar DATABASE_URL
cat /home/cycodene/portal-app/.env

# Testar conexão MySQL
mysql -u cycodene_dbuser -p cycodene_portal
# Entrar senha

# Se conectar, verificar Prisma
cd /home/cycodene/portal-app
npx prisma db pull
```

### Problema 2: "Port 3000 already in use"

**Solução:**
```bash
# Encontrar processo
lsof -i :3000

# Matar processo
kill -9 [PID]

# Ou mudar porta em package.json:
# "start": "next start -p 3001"
```

### Problema 3: "Module not found"

**Solução:**
```bash
cd /home/cycodene/portal-app

# Reinstalar dependências
rm -rf node_modules
npm install --production

# Rebuild
npm run build
```

### Problema 4: "502 Bad Gateway"

**Solução:**
```bash
# Verificar se app está rodando
pm2 status

# Se não estiver, iniciar
pm2 start ecosystem.config.js

# Ver logs de erro
pm2 logs --err
```

### Problema 5: "NEXTAUTH_SECRET não configurado"

**Solução:**
```bash
# Gerar novo secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Adicionar ao .env
nano /home/cycodene/portal-app/.env

# Reiniciar
pm2 restart portal-ciberseguranca
```

### Problema 6: Estilos Tailwind não carregam

**Solução:**
```bash
# Verificar build
cd /home/cycodene/portal-app
ls -la .next/

# Rebuild se necessário
npm run build

# Verificar permissões
chmod -R 755 .next/
```

---

## 📁 Estrutura Final no Servidor

```
/home/cycodene/
├── public_html/
│   ├── .htaccess              # Proxy reverso
│   └── [redirecionando para Node.js]
│
├── portal-app/                # Aplicação Next.js
│   ├── .next/                 # Build de produção
│   ├── public/                # Assets estáticos
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── uploads/               # Arquivos enviados
│   ├── package.json
│   ├── .env                   # Variáveis de ambiente
│   └── ecosystem.config.js    # Configuração PM2
│
├── logs/                      # Logs da aplicação
│   ├── app.log
│   └── error.log
│
└── backups/                   # Backups do banco
    └── portal_backup_*.sql
```

---

## 🔄 Atualizações Futuras

### Fazer Deploy de Nova Versão:

```bash
# 1. Build local
cd d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter
npm run build

# 2. Criar ZIP (excluir node_modules)
# portal-app-v2.zip

# 3. Upload para servidor
# Via FTP ou cPanel

# 4. No servidor:
ssh cycodene@57.128.126.160

# Backup atual
cd /home/cycodene
cp -r portal-app portal-app-backup-$(date +%Y%m%d)

# Extrair nova versão
cd portal-app
unzip ../portal-app-v2.zip -d temp/
cp -r temp/* .
rm -rf temp/

# Instalar novas dependências
npm install --production

# Migrations (se houver)
npx prisma migrate deploy

# Reiniciar
pm2 restart portal-ciberseguranca

# Verificar
pm2 logs
```

---

## 📊 Monitoramento

### Verificações Diárias:

```bash
# Status da aplicação
pm2 status

# Uso de recursos
pm2 monit

# Logs
pm2 logs --lines 100

# Espaço em disco
df -h

# Uso de memória
free -m

# Processos Node
ps aux | grep node
```

### Logs Importantes:

```bash
# Application logs
tail -f /home/cycodene/logs/app.log

# PM2 logs
pm2 logs portal-ciberseguranca

# Error logs
pm2 logs --err

# Nginx/Apache logs (se usar)
tail -f /var/log/apache2/error.log
```

---

## 🔐 Segurança Pós-Deploy

### Checklist:

- [ ] SSL/HTTPS configurado
- [ ] NEXTAUTH_SECRET forte
- [ ] Senha do banco forte
- [ ] Permissões de arquivos corretas (755 para pastas, 644 para arquivos)
- [ ] .env não acessível publicamente
- [ ] Firewall configurado
- [ ] Backups automáticos configurados
- [ ] Logs sendo monitorados
- [ ] Usuário admin padrão com senha trocada

### Configurar Permissões:

```bash
cd /home/cycodene/portal-app

# Pastas: 755
find . -type d -exec chmod 755 {} \;

# Arquivos: 644
find . -type f -exec chmod 644 {} \;

# .env deve ser 600 (só owner lê/escreve)
chmod 600 .env

# Uploads: 755 (para escrita)
chmod 755 uploads/
```

---

## 💾 Backup

### Script de Backup Automático:

```bash
#!/bin/bash
# /home/cycodene/backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/cycodene/backups"

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do banco
mysqldump -u cycodene_dbuser -p[SENHA] cycodene_portal > $BACKUP_DIR/db_$DATE.sql

# Backup dos uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /home/cycodene/portal-app/uploads/

# Manter apenas últimos 7 dias
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup concluído: $DATE"
```

**Agendar via cron:**
```bash
crontab -e

# Adicionar linha (backup diário às 2h)
0 2 * * * /home/cycodene/backup.sh >> /home/cycodene/logs/backup.log 2>&1
```

---

## 📞 Suporte

### Informações de Contato do Servidor:

- **IP:** 57.128.126.160
- **Usuário:** cycodene
- **Domínio:** cibersegurancaul.cycode.net
- **cPanel:** http://cibersegurancaul.cycode.net/cpanel
- **Webmail:** http://cibersegurancaul.cycode.net/webmail

### Recursos Úteis:

- **cPanel Docs:** https://docs.cpanel.net/
- **PM2 Docs:** https://pm2.keymetrics.io/docs/
- **Next.js Deploy:** https://nextjs.org/docs/deployment
- **Prisma Deploy:** https://www.prisma.io/docs/guides/deployment

---

## ✅ Checklist Final de Deploy

### Pré-Deploy:
- [ ] Build local funciona
- [ ] Testes passam
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado

### Deploy:
- [ ] Arquivos enviados ao servidor
- [ ] Dependências instaladas
- [ ] Migrations executadas
- [ ] Aplicação iniciada com PM2
- [ ] .htaccess configurado

### Pós-Deploy:
- [ ] Site acessível via domínio
- [ ] SSL/HTTPS funcionando
- [ ] Login funciona
- [ ] Rate limiting ativo
- [ ] Security headers presentes
- [ ] Backups configurados
- [ ] Monitoramento ativo

---

**🎉 Deploy Concluído!**

Acesse: **https://cibersegurancaul.cycode.net**

Para problemas, consulte a seção **TROUBLESHOOTING** deste guia.
