# 🚨 SOLUÇÃO ALTERNATIVA: Criar Tabelas via phpMyAdmin

## ⚠️ Situação Atual

Como o terminal cPanel não aceita comandos `npx`/`node`, vamos criar as tabelas **manualmente via phpMyAdmin**.

---

## ✅ SOLUÇÃO RÁPIDA (5 minutos)

### **PASSO 1: Acessar phpMyAdmin**

1. **cPanel** → **phpMyAdmin** (na seção "Databases")
2. No menu lateral esquerdo, clique no banco: **`cycodene_portal`**

---

### **PASSO 2: Verificar se Tabelas Existem**

1. Com o banco `cycodene_portal` selecionado
2. Veja se aparecem tabelas na lista
3. **Se aparecer tabelas** (`user`, `incident`, `policy`, etc.):
   - ✅ O banco já está configurado
   - Pule para **PASSO 4**
4. **Se NÃO aparecer tabelas** (banco vazio):
   - Continue no **PASSO 3**

---

### **PASSO 3: Criar Tabelas via SQL**

**Se o banco está VAZIO:**

1. Clique na aba **"SQL"** (no topo)
2. Abra o arquivo local: `sql/CRIAR_TABELAS_COMPLETO.sql`
3. **Copie TODO o conteúdo** do arquivo
4. **Cole** na caixa de texto do phpMyAdmin
5. Clique em **"Executar"** (Go)
6. Aguarde alguns segundos
7. Deve aparecer: ✅ **"TABELAS CRIADAS COM SUCESSO!"**

**Arquivo SQL:**
```
📁 sql/CRIAR_TABELAS_COMPLETO.sql
```

---

### **PASSO 4: Verificar se Tabelas Foram Criadas**

1. No menu lateral, **atualize a página** (F5)
2. Clique no banco `cycodene_portal`
3. Deve aparecer **5 tabelas**:
   - ✅ `user`
   - ✅ `incident`
   - ✅ `policy`
   - ✅ `risk`
   - ✅ `evidence`

4. Clique na tabela `user`
5. Deve ter **1 registro** (usuário admin)

---

### **PASSO 5: Reiniciar Aplicação**

**Via cPanel → Setup Node.js App:**

1. Clique em **CYBERUL.CYCODE.NET**
2. Clique em **RESTART**
3. Aguarde iniciar (status verde)

---

### **PASSO 6: Testar Login**

1. Acesse: **https://cyberul.cycode.net**
2. Clique em **Entrar**
3. Use as credenciais:
   - **Email**: `admin@unilicungo.ac.mz`
   - **Senha**: `Admin@2025`
4. Deve fazer login com sucesso! ✅

---

## 🔍 TROUBLESHOOTING

### **Se phpMyAdmin der erro ao executar SQL:**

**Erro: "Table already exists"**
- ✅ **Normal!** Significa que tabelas já existem
- Pule para PASSO 5 (restart)

**Erro: "Foreign key constraint fails"**
- Execute o SQL em partes:
  1. Primeiro só a tabela `user`
  2. Depois as outras tabelas

**Erro: "Access denied"**
- Verifique se está no banco correto (`cycodene_portal`)
- Verifique permissões do usuário do banco

---

### **Se Login AINDA der erro 500:**

**Possível causa: Prisma Client não gerado**

**Solução via Upload FTP/File Manager:**

1. No **computador local**, execute:
   ```bash
   cd "d:\uniLicungo\PLANO DE CIBER-SEGURANCA\UniLicungo-Portal-MySQL-Starter"
   npx prisma generate
   ```

2. Isso cria a pasta: `node_modules/.prisma/client/`

3. **Faça upload** dessa pasta para o servidor:
   - Via FTP ou File Manager
   - Destino: `/caminho/aplicacao/node_modules/.prisma/client/`

4. **RESTART** da aplicação

---

## 📋 CHECKLIST COMPLETO

- [ ] phpMyAdmin acessado
- [ ] Banco `cycodene_portal` selecionado
- [ ] SQL executado (CRIAR_TABELAS_COMPLETO.sql)
- [ ] 5 tabelas criadas (user, incident, policy, risk, evidence)
- [ ] 1 usuário admin criado
- [ ] Aplicação reiniciada
- [ ] Login testado com sucesso

---

## 🎯 CREDENCIAIS DE ACESSO

**Após criar as tabelas via SQL:**

```
Email: admin@unilicungo.ac.mz
Senha: Admin@2025
```

⚠️ **IMPORTANTE:** Altere a senha após primeiro login!

---

## 💡 SE PRECISAR CRIAR MAIS USUÁRIOS

**Via phpMyAdmin:**

1. Acesse tabela `user`
2. Clique em "Insert" (Inserir)
3. Preencha:
   - `id`: qualquer texto único (ex: `user-002`)
   - `name`: nome completo
   - `email`: email institucional
   - `password`: gerar hash em https://bcrypt-generator.com/
   - `papel`: escolher entre: admin, secops, ti, dono_dado, auditoria
   - `createdAt`: NOW()
   - `updatedAt`: NOW()
   - `mustChangePassword`: 0 ou 1

---

## 📸 SCREENSHOTS ÚTEIS

Se precisar de ajuda, tire screenshots de:

1. ✅ Lista de tabelas no phpMyAdmin (após executar SQL)
2. ✅ Conteúdo da tabela `user` (deve ter 1 registro)
3. ✅ Erro específico se login ainda não funcionar

---

**Criado em:** 21/10/2025
**Arquivo SQL:** `sql/CRIAR_TABELAS_COMPLETO.sql`
