# 🔧 DEBUG PRODUÇÃO - Passo a Passo

## ⚠️ Situação Atual
- ✅ Arquivo `.env.production` corrigido
- ✅ Variáveis do cPanel corretas
- ❌ Ainda dá erro 500 ao fazer login

---

## 🕵️ INVESTIGAÇÃO - Faça na Ordem

### **PASSO 1: Verificar se Existe Arquivo `.env` Duplicado**

**Via cPanel File Manager:**

1. Navegue até a pasta da aplicação
2. Procure por arquivos:
   - ✅ `.env.production` (deve existir)
   - ❌ `.env` (NÃO deve existir em produção)
   - ❌ `.env.local` (NÃO deve existir em produção)

**Se existir `.env` ou `.env.local`:**
- **RENOMEIE** para `.env.backup` ou **APAGUE**
- Deixe APENAS `.env.production`

**Depois:** RESTART na aplicação

---

### **PASSO 2: Ver os LOGS da Aplicação**

**Via cPanel → Setup Node.js App:**

1. Clique em **CYBERUL.CYCODE.NET**
2. Procure por botão **"View Log"** ou similar
3. **TIRE UM SCREENSHOT** dos logs (últimas 50 linhas)

**OU via Terminal SSH:**
```bash
# Ver logs do PM2
pm2 logs cyberul --lines 50

# OU ver logs do sistema
tail -50 /home/seu_usuario/logs/cyberul-error.log
```

**O que procurar nos logs:**
- ❌ Erros de conexão ao banco
- ❌ Erros do NextAuth
- ❌ Erros de ambiente (variáveis faltando)

---

### **PASSO 3: Fazer Hard Restart da Aplicação**

**Via cPanel → Setup Node.js App:**

1. Clique em **STOP** (parar aplicação)
2. Aguarde 10 segundos
3. Clique em **START** (iniciar)
4. Aguarde carregar
5. Teste novamente o login

**OU via SSH:**
```bash
pm2 stop cyberul
pm2 delete cyberul
pm2 start npm --name "cyberul" -- start
```

---

### **PASSO 4: Testar Conexão ao Banco**

**Upload do script de teste:**

1. Faça upload do arquivo `test-conexao-db.js` para o servidor
2. Via Terminal SSH, execute:

```bash
cd /caminho/da/aplicacao
node test-conexao-db.js
```

Isso vai mostrar se o problema é de conexão ao MySQL.

---

### **PASSO 5: Verificar se NODE_ENV está Correto**

**Via Terminal SSH:**
```bash
echo $NODE_ENV
# Deve mostrar: production
```

**Se não mostrar "production":**
- A aplicação pode estar usando `.env.local` ao invés de `.env.production`

---

### **PASSO 6: Limpar Build do Next.js**

Se nada funcionou, o build pode estar com cache:

**Via Terminal SSH:**
```bash
cd /caminho/da/aplicacao
rm -rf .next
npm run build
pm2 restart cyberul
```

⚠️ **CUIDADO:** Isso apaga o build e recria (leva alguns minutos)

---

## 📸 O QUE PRECISO VER

Para diagnosticar melhor, preciso de screenshots de:

1. **Logs da aplicação** (os erros específicos)
2. **Lista de arquivos** na pasta da aplicação (mostrar se tem .env duplicado)
3. **Status da aplicação** no cPanel Node.js (se está verde/rodando)

---

## 🎯 Diagnóstico Rápido por Sintoma

### **Se o erro for "Cannot connect to database":**
- ✅ Verificar credenciais do MySQL no cPanel
- ✅ Confirmar que MySQL está rodando
- ✅ Testar script `test-conexao-db.js`

### **Se o erro for "NEXTAUTH_URL mismatch":**
- ✅ Verificar se `.env.production` tem URL correta
- ✅ Limpar cache do navegador (Ctrl+Shift+Delete)
- ✅ Testar em modo anônimo

### **Se o erro for "Module not found":**
- ✅ Fazer `npm install` no servidor
- ✅ Rebuild: `npm run build`

### **Se o erro for genérico 500:**
- ✅ VER OS LOGS! (Passo 2)
- Logs vão mostrar exatamente o que está quebrando

---

## 🆘 Solução de Último Recurso

Se nada funcionar, **redeploy completo**:

```bash
# Via SSH
cd /caminho/da/aplicacao

# 1. Backup do .env.production
cp .env.production .env.production.backup

# 2. Limpar tudo
rm -rf .next node_modules

# 3. Reinstalar
npm install

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart cyberul
```

---

## 📞 Próximo Passo

**Me envie screenshots de:**
1. Logs da aplicação (Passo 2)
2. Lista de arquivos .env* na pasta
3. Status da aplicação no cPanel

Com isso consigo identificar o problema exato!

---

**Última Atualização:** 21/10/2025 12:30
