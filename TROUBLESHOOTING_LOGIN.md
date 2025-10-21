# 🔴 Troubleshooting: Erro 500 no Login

## Problema Atual
Erro 500 ao tentar fazer login em `https://cycode.net/api/auth/signin`

---

## 🔍 Causas Comuns do Erro 500

### 1. **Variáveis de Ambiente Não Configuradas**
### 2. **Banco de Dados Não Conectado**
### 3. **Tabelas Não Criadas (Migrações Não Executadas)**
### 4. **Prisma Client Não Gerado**

---

## ✅ Passo 1: Verificar Logs do Servidor

**No cPanel:**
1. Vá para **Node.js App Manager**
2. Clique em **"View Application Logs"** ou **"Error Log"**
3. Procure por mensagens de erro recentes

**Erros Comuns nos Logs:**

```
❌ PrismaClientInitializationError
   → DATABASE_URL incorreta ou banco inacessível

❌ NEXTAUTH_URL is not configured
   → Variável NEXTAUTH_URL não definida

❌ Cannot find module '@prisma/client'
   → Prisma Client não gerado

❌ Table 'database.User' doesn't exist
   → Migrações não executadas
```

---

## ✅ Passo 2: Validar Variáveis de Ambiente

**No cPanel: Node.js App → Environment Variables**

Confirme que TODAS estas variáveis estão definidas:

| Variável | Valor Esperado | Status |
|----------|----------------|--------|
| `NODE_ENV` | `production` | ⬜ |
| `NEXTAUTH_URL` | `https://cycode.net` | ⬜ |
| `NEXTAUTH_SECRET` | `Mk6omx8d9+ZSt6eqjo2M5eNMtb93mBJ34m6xJqRyLA8=` | ⬜ |
| `DATABASE_URL` | `mysql://usuario:senha@localhost:3306/banco` | ⬜ |

⚠️ **CRÍTICO**: `DATABASE_URL` deve usar as credenciais reais do MySQL do cPanel!

---

## ✅ Passo 3: Testar Conexão com Banco de Dados

### 3.1 Obter Credenciais MySQL

**No cPanel → MySQL® Databases:**

1. **Nome do Banco**: `_______________` (ex: `cycodene_security`)
2. **Usuário MySQL**: `_______________` (ex: `cycodene_user`)
3. **Senha**: `_______________`
4. **Host**: `localhost` (geralmente)

### 3.2 Montar DATABASE_URL Correta

```bash
# Formato
mysql://USUARIO:SENHA@HOST:3306/BANCO_DADOS

# Exemplo
mysql://cycodene_user:MinhaS3nh@localhost:3306/cycodene_security
```

⚠️ **Atenção aos caracteres especiais na senha:**
- `#` → `%23`
- `@` → `%40`
- `%` → `%25`
- `&` → `%26`

**Exemplo com senha especial:**
```bash
# Senha: Pass#2025
# DATABASE_URL: mysql://user:Pass%232025@localhost:3306/db
```

---

## ✅ Passo 4: Verificar Se Tabelas Existem

**No cPanel → phpMyAdmin:**

1. Selecione seu banco de dados
2. Verifique se estas tabelas existem:
   - ✅ `User`
   - ✅ `Account`
   - ✅ `Session`
   - ✅ `VerificationToken`
   - ✅ `incidents`
   - ✅ `policies`
   - ✅ `risks`

**Se NÃO existirem**, você precisa executar as migrações.

---

## ✅ Passo 5: Executar Migrações e Gerar Prisma Client

**No Terminal do cPanel:**

```bash
# 1. Carregar Node.js
source /opt/cpanel/ea-nodejs18/enable

# 2. Navegar para o diretório
cd ~/public_html/cibersegurancaul

# 3. Verificar se variáveis estão carregadas
echo $DATABASE_URL
# Deve mostrar a URL do banco

# 4. Gerar Prisma Client
npx prisma generate

# 5. Executar migrações (CRIAR TABELAS)
npx prisma migrate deploy

# 6. (Opcional) Popular banco com dados iniciais
npm run seed
```

---

## ✅ Passo 6: Criar Primeiro Usuário Manualmente

Se as tabelas foram criadas mas não há usuários, crie um via phpMyAdmin:

**SQL para criar usuário admin:**

```sql
-- Gerar hash bcrypt da senha "Admin@2025" 
-- Use: https://bcrypt-generator.com/ (rounds: 10)

INSERT INTO `User` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `role`, 
  `emailVerified`, 
  `createdAt`, 
  `updatedAt`
) VALUES (
  'admin-001',
  'Administrador',
  'admin@unilicungo.ac.mz',
  '$2a$10$YourHashedPasswordHere',  -- Substitua pelo hash real
  'ADMIN',
  NOW(),
  NOW(),
  NOW()
);
```

**Para gerar o hash da senha:**
1. Acesse: https://bcrypt-generator.com/
2. Digite a senha (ex: `Admin@2025`)
3. Rounds: `10`
4. Copie o hash gerado
5. Substitua `$2a$10$YourHashedPasswordHere` pelo hash

---

## ✅ Passo 7: Reiniciar Aplicação

**No cPanel: Node.js App Manager**

1. Clique em **"Stop App"**
2. Aguarde alguns segundos
3. Clique em **"Start"** ou **"Restart"**

---

## 📋 Checklist de Verificação Completa

- [ ] Variável `NEXTAUTH_URL` = `https://cycode.net`
- [ ] Variável `NEXTAUTH_SECRET` definida
- [ ] Variável `DATABASE_URL` com credenciais CORRETAS do cPanel
- [ ] Variável `NODE_ENV` = `production`
- [ ] Banco de dados MySQL existe no cPanel
- [ ] Usuário MySQL tem permissões no banco
- [ ] Executou `npx prisma generate` no servidor
- [ ] Executou `npx prisma migrate deploy` no servidor
- [ ] Tabelas criadas no banco (User, Account, Session, etc.)
- [ ] Usuário admin criado no banco
- [ ] Aplicação reiniciada após mudanças
- [ ] Logs verificados (sem erros críticos)

---

## 🔧 Comando de Diagnóstico Rápido

Execute no terminal do cPanel:

```bash
source /opt/cpanel/ea-nodejs18/enable
cd ~/public_html/cibersegurancaul

# Testar conexão Prisma
npx prisma db push --preview-feature

# Verificar status das migrações
npx prisma migrate status

# Ver logs em tempo real
tail -f ~/logs/cibersegurancaul_error.log
```

---

## 🚨 Se Nada Funcionar

1. **Compartilhe os logs completos** do servidor
2. **Compartilhe as variáveis de ambiente** (SEM as senhas!)
3. **Compartilhe print do phpMyAdmin** mostrando as tabelas
4. **Confirme se DATABASE_URL está correta**

---

## ✅ Próximo Passo Imediato

**AÇÃO PRIORITÁRIA:** Verificar os logs do servidor no cPanel para ver o erro exato.

**Onde encontrar:**
- cPanel → Node.js App → "View Application Logs"
- cPanel → Error Logs
- Terminal: `tail -50 ~/logs/cibersegurancaul_error.log`

**Compartilhe a mensagem de erro completa para diagnóstico preciso!**
