# 🔧 PACOTE DE DEBUG - Portal CyberUL

## 📦 Conteúdo

Este pacote contém scripts de diagnóstico para resolver o erro 500 em produção.

**Arquivos:**
- `debug-info.js` - Coleta informações do ambiente
- `test-conexao-db.js` - Testa conexão ao banco de dados
- `verificar-env.js` - Valida variáveis de ambiente
- `DEBUG_PRODUCAO_PASSO_A_PASSO.md` - Guia completo
- `CORRECAO_URGENTE_PRODUCAO.md` - Correções urgentes

---

## 🚀 COMO USAR (3 PASSOS SIMPLES)

### **PASSO 1: Upload para o Servidor**

**Via cPanel File Manager:**

1. Acesse cPanel → File Manager
2. Navegue até a pasta da aplicação (ex: `/public_html/cyberul/`)
3. Faça upload de **TODOS os arquivos** desta pasta (`debug-pack`)
4. Coloque na raiz da aplicação (junto com `package.json`)

---

### **PASSO 2: Executar Script de Diagnóstico**

**Via Terminal SSH** (se tiver acesso):

```bash
cd /caminho/da/aplicacao
node debug-info.js
```

**OU via cPanel → Terminal:**

1. Abra o Terminal do cPanel
2. Digite:
```bash
cd public_html/cyberul   # ajuste o caminho
node debug-info.js
```

3. **TIRE UM SCREENSHOT** do resultado completo
4. Envie para análise

---

### **PASSO 3: Limpar Arquivos .env Duplicados**

O script `debug-info.js` vai mostrar se há arquivos `.env` duplicados.

**Se mostrar múltiplos arquivos:**

**Via cPanel File Manager:**

1. Na pasta da aplicação, procure por:
   - `.env`
   - `.env.local`
   - `.env.development`

2. **APAGUE ou RENOMEIE** esses arquivos

3. **MANTENHA APENAS** `.env.production`

4. **RESTART** na aplicação (cPanel → Setup Node.js App → RESTART)

---

## 🔍 Scripts Disponíveis

### **1. debug-info.js**
```bash
node debug-info.js
```
**O que faz:**
- ✅ Lista todos os arquivos `.env*` encontrados
- ✅ Mostra variáveis de ambiente configuradas
- ✅ Verifica estrutura de pastas
- ✅ Verifica se o build existe
- ✅ Identifica problemas comuns

**Use quando:** Quiser ver o estado geral da aplicação

---

### **2. test-conexao-db.js**
```bash
node test-conexao-db.js
```
**O que faz:**
- ✅ Testa conexão ao MySQL
- ✅ Verifica credenciais
- ✅ Lista tabelas do banco
- ✅ Mostra erros específicos de conexão

**Use quando:** Suspeitar de problemas com o banco de dados

---

### **3. verificar-env.js**
```bash
node verificar-env.js
```
**O que faz:**
- ✅ Valida `NEXTAUTH_URL`
- ✅ Valida `NEXTAUTH_SECRET`
- ✅ Valida `DATABASE_URL`
- ✅ Valida `NODE_ENV`

**Use quando:** Quiser validar se as variáveis estão corretas

---

## ⚠️ SOLUÇÃO RÁPIDA (Checklist)

Se ainda está com erro 500, siga esta ordem:

- [ ] **1. Rodar `debug-info.js`** e ver se há arquivos `.env` duplicados
- [ ] **2. Apagar `.env` e `.env.local`** (manter só `.env.production`)
- [ ] **3. Rodar `verificar-env.js`** para validar configurações
- [ ] **4. RESTART da aplicação** (cPanel → Setup Node.js App)
- [ ] **5. Limpar cache do navegador** (Ctrl+Shift+Delete)
- [ ] **6. Testar login novamente**

---

## 📸 O QUE ENVIAR PARA ANÁLISE

Se os scripts não resolverem, envie screenshots de:

1. ✅ Output completo do `node debug-info.js`
2. ✅ Output completo do `node test-conexao-db.js`
3. ✅ Logs da aplicação (cPanel → Setup Node.js App → View Logs)
4. ✅ Lista de arquivos na pasta (File Manager)

---

## 🆘 PROBLEMAS COMUNS E SOLUÇÕES

### **Erro: "Cannot find module 'mysql2'"**
```bash
npm install mysql2
```

### **Erro: "Permission denied"**
```bash
chmod +x debug-info.js
chmod +x test-conexao-db.js
chmod +x verificar-env.js
```

### **Erro: "node: command not found"**
- Verifique se Node.js está instalado no servidor
- Via cPanel: Setup Node.js App deve mostrar a versão

---

## 💡 DICA PRO

Se tudo falhar, faça um **redeploy limpo**:

```bash
# 1. Backup do .env.production
cp .env.production .env.production.backup

# 2. Limpar
rm -rf .next node_modules

# 3. Reinstalar
npm install

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart cyberul
# OU via cPanel: Setup Node.js App → RESTART
```

---

**Criado em:** 21/10/2025
**Versão:** 1.0
**Para:** Portal de Cibersegurança UniLicungo
