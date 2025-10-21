# 🚨 CORREÇÃO URGENTE - Erro 500 em Produção

## ❌ Problemas Identificados

### 1. **NEXTAUTH_URL Duplicado no Servidor**
O arquivo `.env.production` no servidor tem **duas definições** de `NEXTAUTH_URL`:
- Linha correta: `NEXTAUTH_URL="https://cyberul.cycode.net"`
- Linha duplicada (ERRADA): `NEXTAUTH_URL="https://cycode.net"`

**A última definição sobrescreve a primeira**, causando o erro 500!

### 2. **Credenciais do Banco Inconsistentes**
- **cPanel mostra**: `ZP-RvWvyj-EhjIm;R` 
- **Arquivo tinha**: `ZP-RvWyJ-2Efp;p;R` (DIFERENTE!)

### 3. **Caracteres Especiais Não Codificados**
A senha do banco contém `;` que deve ser codificado como `%3B` na URL.

---

## ✅ SOLUÇÃO PASSO A PASSO

### **Passo 1: Editar `.env.production` no Servidor**

**Via cPanel File Manager:**

1. Acesse cPanel → File Manager
2. Navegue até a pasta da aplicação: `/public_html/` ou pasta do app
3. Encontre o arquivo `.env.production`
4. Clique com botão direito → **Edit**
5. **APAGUE TODO O CONTEÚDO** e substitua por este:

```bash
# MySQL - Banco de dados de produção (cPanel)
DATABASE_URL="mysql://cycodene_dbuser:ZP-RvWvyj-EhjIm%3BR@localhost:3306/cycodene_portal"

# NextAuth - Autenticação
NEXTAUTH_URL="https://cyberul.cycode.net"
NEXTAUTH_SECRET="Mk6omx8d9+ZSt6eqjo2M5eNMtb93mBJ34m6xJqRyLA8="

# Node Environment
NODE_ENV="production"

# Azure AD (Microsoft Entra ID) - Opcional
AZURE_AD_CLIENT_ID="seu_client_id_microsoft"
AZURE_AD_CLIENT_SECRET="seu_client_secret_microsoft"
AZURE_AD_TENANT_ID="seu_tenant_id_ou_common"

# Google OAuth - Opcional
GOOGLE_CLIENT_ID="seu_client_id_google"
GOOGLE_CLIENT_SECRET="seu_client_secret_google"
```

6. **Salve o arquivo** (Save Changes)

---

### **Passo 2: Limpar Variáveis Duplicadas no cPanel**

**Via cPanel → Setup Node.js App:**

1. Acesse: cPanel → **Setup Node.js App**
2. Clique na aplicação **CYBERUL.CYCODE.NET**
3. Role até **Environment variables**
4. **VERIFIQUE** se há duplicações:
   - Se houver duas entradas `NEXTAUTH_URL`, **APAGUE** a incorreta (`https://cycode.net`)
   - Deixe apenas: `NEXTAUTH_URL = https://cyberul.cycode.net`

5. Clique em **SAVE**

---

### **Passo 3: Verificar Senha do Banco**

**A senha correta do cPanel é:**
```
ZP-RvWvyj-EhjIm;R
```

**Na URL do DATABASE_URL deve ser codificada como:**
```
ZP-RvWvyj-EhjIm%3BR
```

Note: `;` → `%3B`

---

### **Passo 4: Reiniciar a Aplicação**

**Via cPanel → Setup Node.js App:**

1. Clique em **RESTART** na aplicação
2. Aguarde alguns segundos
3. Verifique se o status fica verde

**Ou via SSH (se tiver acesso):**
```bash
pm2 restart cyberul
# ou
pm2 restart all
```

---

### **Passo 5: Testar o Login**

1. Acesse: https://cyberul.cycode.net
2. Clique em **Entrar**
3. Insira credenciais
4. Deve redirecionar para `/dashboard` sem erro 500

---

## 🔍 Debug Adicional (Se Ainda Der Erro)

### **Ver Logs da Aplicação**

**Via cPanel:**
- Setup Node.js App → Ver logs (botão de logs)

**Via SSH:**
```bash
pm2 logs cyberul
# ou
tail -f /caminho/logs/error.log
```

### **Testar Conexão ao Banco**

Crie arquivo teste `test-db.js`:
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cycodene_dbuser',
  password: 'ZP-RvWvyj-EhjIm;R',
  database: 'cycodene_portal'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro de conexão:', err);
    return;
  }
  console.log('✅ Conexão ao banco OK!');
  connection.end();
});
```

Execute: `node test-db.js`

---

## 📋 Checklist Final

- [ ] Arquivo `.env.production` editado e salvo (SEM duplicações)
- [ ] Variáveis do cPanel verificadas (sem duplicações)
- [ ] DATABASE_URL com senha codificada corretamente (`%3B`)
- [ ] Aplicação reiniciada
- [ ] Login testado com sucesso
- [ ] Dashboard acessível

---

## 🆘 Se Persistir o Erro

1. **Verifique os logs** para mensagens específicas
2. **Confirme** que não há cache do navegador (Ctrl+Shift+R)
3. **Teste** em modo anônimo/incógnito
4. **Verifique** se o NextAuth está usando a URL correta nos logs

---

**Última Atualização:** 21/10/2025
**Arquivo de Referência:** `.env.production.CORRETO`
