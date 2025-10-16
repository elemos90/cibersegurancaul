# 🚀 Setup Final - Autenticação Tradicional

## ✅ O Que Foi Implementado

### **1. Autenticação por Email/Senha**
- Login tradicional com credenciais
- Apenas emails `@unilicungo.ac.mz` permitidos
- Sessões JWT com 8 horas de duração

### **2. Super User**
- Email: `elemos@unilicungo.ac.mz`
- Senha inicial: `password`
- Papel: `admin`
- **Obrigado a mudar senha no primeiro login**

### **3. Mudança de Senha Obrigatória**
- Usuários novos são forçados a mudar senha
- Redirecionamento automático após login
- Validação de senha (mínimo 8 caracteres)

### **4. Gestão de Usuários (Admin)**
- Criar novos usuários
- Atribuir papéis: admin, secops, ti, dono_dado, auditoria
- Resetar senhas
- Excluir usuários
- Interface em `/admin/users`

---

## 📋 Comandos de Setup

### **1. Instalar Dependências**

```powershell
npm install bcryptjs @types/bcryptjs ts-node
```

### **2. Atualizar NEXTAUTH_SECRET no arquivo `.env`**

Edite manualmente o arquivo `.env` e substitua a linha:
```env
NEXTAUTH_SECRET="gere_uma_chave_secreta_com_openssl_rand_base64_32"
```

Por:
```env
NEXTAUTH_SECRET="U8i72KrQCoyvlBytzaFc9VAg9fIwyfXjd2/sIKtVFos="
```

### **3. Aplicar Schema no Banco de Dados**

```powershell
npx prisma db push
```

### **4. Criar Super User**

```powershell
npx prisma db seed
```

Ou se der erro, execute manualmente:
```powershell
npm run seed
```

### **5. Gerar Prisma Client**

```powershell
npx prisma generate
```

### **6. Iniciar Servidor**

```powershell
npm run dev
```

Acesse: **http://localhost:3000**

---

## 👤 Primeiro Login

1. Acesse http://localhost:3000
2. Você será redirecionado para `/auth/signin`
3. **Login:**
   - Email: `elemos@unilicungo.ac.mz`
   - Senha: `password`
4. Será **obrigado** a mudar a senha
5. Após mudar, terá acesso completo ao sistema

---

## 🔐 Gestão de Usuários

Como **admin**, acesse `/admin/users` ou clique em **Usuários** no menu.

### **Criar Novo Usuário:**
1. Clique em "Novo Usuário"
2. Preencha:
   - Nome
   - Email (@unilicungo.ac.mz)
   - Papel
   - Senha inicial (mínimo 8 caracteres)
3. O usuário será obrigado a mudar senha no primeiro login

### **Resetar Senha:**
- Clique no ícone 🔑 ao lado do usuário
- Digite a nova senha
- O usuário será obrigado a mudar no próximo login

### **Excluir Usuário:**
- Clique no ícone 🗑️ ao lado do usuário
- Confirme a exclusão
- **Não é possível excluir seu próprio usuário**

---

## 🎯 Papéis e Permissões

| Papel | Descrição | Permissões |
|-------|-----------|------------|
| **admin** | Administrador | Gestão completa de usuários |
| **secops** | Operações de Segurança | CRUD de riscos, incidentes |
| **ti** | Tecnologia da Informação | Visualização e operações básicas |
| **dono_dado** | Responsável por Dados | Gestão de políticas de dados |
| **auditoria** | Auditoria Interna | Apenas leitura e relatórios |

---

## 📁 Estrutura de Arquivos Criados

```
src/
├── app/
│   ├── admin/
│   │   └── users/
│   │       └── page.tsx           # Interface de gestão
│   ├── api/
│   │   ├── admin/
│   │   │   └── users/
│   │   │       ├── route.ts        # CRUD de usuários
│   │   │       └── reset-password/
│   │   │           └── route.ts    # Reset de senha
│   │   └── auth/
│   │       └── change-password/
│   │           └── route.ts        # Mudança de senha
│   └── auth/
│       ├── signin/
│       │   └── page.tsx            # Login
│       └── change-password/
│           └── page.tsx            # Forçar mudança
├── components/
│   ├── PasswordChangeGuard.tsx    # Guard automático
│   ├── Providers.tsx
│   └── UserMenu.tsx
├── lib/
│   └── auth.ts                    # NextAuth config
└── types/
    └── next-auth.d.ts             # Types estendidos

prisma/
├── schema.prisma                  # Schema atualizado
└── seed.ts                        # Seed do super user
```

---

## 🔍 Troubleshooting

### **Erro: bcryptjs not found**
```powershell
npm install bcryptjs @types/bcryptjs
```

### **Erro: Prisma seed**
```powershell
npm install ts-node --save-dev
npx prisma db seed
```

### **Login não funciona**
- Verifique se `NEXTAUTH_SECRET` está definido
- Confirme que o banco tem o super user (execute seed novamente)
- Limpe cache do navegador e cookies

### **Não redireciona para mudança de senha**
- Verifique se `mustChangePassword: true` no banco
- Force logout e login novamente
- Verifique console do navegador para erros

### **Erro 403 ao acessar /admin/users**
- Apenas usuários com `papel = "admin"` têm acesso
- Verifique papel no banco:
  ```sql
  SELECT email, papel FROM User;
  ```

---

## 🎉 Sistema Pronto!

**Funcionalidades Ativas:**
- ✅ Login com email/senha institucional
- ✅ Super user criado
- ✅ Mudança de senha obrigatória
- ✅ Gestão completa de usuários
- ✅ Atribuição de papéis
- ✅ Proteção de rotas
- ✅ Sessões seguras (JWT)

**Próximos Passos (Opcional):**
- Implementar recuperação de senha via email
- Adicionar logs de auditoria
- Configurar 2FA
- Implementar bloqueio por tentativas
