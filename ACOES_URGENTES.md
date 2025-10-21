# 🚨 AÇÕES URGENTES - Corrigir Erro 500 no Login

**Domínio:** https://cycode.net  
**Problema:** Erro 500 ao tentar fazer login  
**Causa Principal:** DATABASE_URL incorreta ou banco não configurado

---

## 🎯 PASSO A PASSO RÁPIDO (15 minutos)

### ✅ PASSO 1: Obter Credenciais Reais do MySQL

**No cPanel:**
1. Acesse **MySQL® Databases**
2. Anote as informações:
   - **Banco de dados:** `cycodene_xxxxxx` (seu nome real)
   - **Usuário MySQL:** `cycodene_xxxxxx` (seu nome real)
   - **Senha:** (sua senha real)
   - **Host:** `localhost`

---

### ✅ PASSO 2: Configurar Variáveis de Ambiente no Servidor

**No cPanel → Node.js App Manager → Environment Variables**

Adicione/atualize estas variáveis:

| Variável | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `NEXTAUTH_URL` | `https://cycode.net` |
| `NEXTAUTH_SECRET` | `Mk6omx8d9+ZSt6eqjo2M5eNMtb93mBJ34m6xJqRyLA8=` |
| `DATABASE_URL` | `mysql://SEU_USER:SUA_SENHA@localhost:3306/SEU_BANCO` |

**⚠️ IMPORTANTE:** Na `DATABASE_URL`, substitua:
- `SEU_USER` → usuário MySQL real do passo 1
- `SUA_SENHA` → senha real (use URL encoding para caracteres especiais)
- `SEU_BANCO` → nome do banco real do passo 1

**Exemplo de caracteres especiais na senha:**
- Se senha = `Pass#123` → use `Pass%23123`
- Se senha = `Pass@123` → use `Pass%40123`

---

### ✅ PASSO 3: Executar Comandos no Servidor

**Abra o Terminal SSH ou Terminal do cPanel e execute:**

```bash
# 1. Carregar Node.js (ajuste versão conforme cPanel)
source /opt/cpanel/ea-nodejs18/enable

# 2. Ir para diretório da aplicação
cd ~/public_html/cibersegurancaul

# 3. Verificar se DATABASE_URL está carregada
echo $DATABASE_URL
# Se não aparecer nada, reinicie o Node.js App no cPanel

# 4. Gerar Prisma Client
npx prisma generate

# 5. Criar tabelas no banco (CRUCIAL!)
npx prisma migrate deploy

# 6. Verificar se tabelas foram criadas
npx prisma db pull

# 7. (Opcional) Popular banco com usuários de exemplo
npm run seed
```

**Se `npm run seed` falhar, ignore e vá para próximo passo.**

---

### ✅ PASSO 4: Reiniciar Aplicação

**No cPanel:**
1. Vá para **Node.js App Manager**
2. Clique em **"Stop App"**
3. Aguarde 5 segundos
4. Clique em **"Start"** ou **"Restart"**

---

### ✅ PASSO 5: Testar Sistema

#### 5.1. Testar Health Check

No navegador ou terminal:
```
https://cycode.net/api/health
```

**Se retornar `"status": "healthy"` → ✅ Sistema funcionando!**

**Se retornar erros:**
- Verifique se `DATABASE_URL` está correta
- Confirme que as migrações foram executadas
- Veja os logs: `tail -50 ~/logs/cibersegurancaul_error.log`

#### 5.2. Testar Login

1. Acesse: https://cycode.net/auth/signin
2. Tente fazer login

**Se não houver usuários para testar**, crie um manualmente:

---

### ✅ PASSO 6: Criar Usuário Admin (se necessário)

**No cPanel → phpMyAdmin:**

1. Gere hash da senha em: https://bcrypt-generator.com/
   - Digite senha (ex: `Admin@2025`)
   - Rounds: `10`
   - Copie o hash

2. Execute este SQL no phpMyAdmin:
```sql
INSERT INTO `user` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `papel`, 
  `createdAt`, 
  `updatedAt`,
  `mustChangePassword`
) VALUES (
  'admin-001',
  'Administrador',
  'admin@unilicungo.ac.mz',
  '$2a$10$YourHashedPasswordHere',  -- Cole o hash aqui
  'admin',
  NOW(),
  NOW(),
  0
);
```

3. Teste login com:
   - Email: `admin@unilicungo.ac.mz`
   - Senha: (a que você definiu)

---

## 🔍 DIAGNÓSTICO SE AINDA FALHAR

### Ver Logs de Erro
```bash
tail -100 ~/logs/cibersegurancaul_error.log
```

### Testar Conexão Prisma
```bash
cd ~/public_html/cibersegurancaul
npx prisma studio
```
Se abrir o Prisma Studio → conexão OK

### Verificar Tabelas no phpMyAdmin
Deve ter estas tabelas:
- ✅ `user`
- ✅ `evidence`
- ✅ `incident`
- ✅ `policy`
- ✅ `risk`

---

## 📞 INFORMAÇÕES PARA SUPORTE

Se precisar de ajuda, tenha em mãos:

1. **Output do health check:**
   ```bash
   curl https://cycode.net/api/health
   ```

2. **Últimas linhas do log:**
   ```bash
   tail -50 ~/logs/cibersegurancaul_error.log
   ```

3. **Screenshot do phpMyAdmin** mostrando as tabelas

4. **Variáveis de ambiente** (SEM mostrar senhas!)

---

## ✅ APÓS TUDO FUNCIONAR

### Desabilitar Debug

**Arquivo:** `src/lib/auth.ts`  
**Linha 121:** Mudar `debug: true` para `debug: false`

```typescript
debug: false,  // Desabilitar em produção
```

**Depois:**
```bash
cd ~/public_html/cibersegurancaul
npm run build
# Reiniciar app no cPanel
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para informações detalhadas, consulte:

- **CORRECOES_IMPLEMENTADAS.md** - Resumo completo das correções
- **PROBLEMAS_PRODUCAO_E_MELHORIAS.md** - Análise detalhada
- **TROUBLESHOOTING_LOGIN.md** - Guia de troubleshooting

---

## ⏱️ TEMPO ESTIMADO

- **Obter credenciais:** 2 minutos
- **Configurar variáveis:** 3 minutos
- **Executar comandos:** 5 minutos
- **Testar:** 5 minutos

**Total:** ~15 minutos

---

**Última atualização:** Outubro 2025  
**Status:** ✅ Correções prontas, aguardando deploy
