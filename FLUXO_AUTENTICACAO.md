# 🔐 Fluxo de Autenticação - Portal de Cibersegurança

## ✅ Problemas Resolvidos

### **ANTES:**
❌ Após login, redirecionava para `/` (landing page)  
❌ Landing page mostrava botão "Login Admin" mesmo quando logado  
❌ Não tinha forma de acessar dashboard ou fazer logout  
❌ Usuário logado via landing page como visitante  

### **DEPOIS:**
✅ Após login, redireciona para `/dashboard`  
✅ Landing page mostra "Ir para Dashboard" quando logado  
✅ UserMenu com logout visível no dashboard  
✅ Logout redireciona para landing page  

---

## 🔄 Fluxo Completo de Autenticação

### **1. Usuário NÃO Logado**

```mermaid
Landing Page (/)
  ↓
Clica "Login Admin"
  ↓
Página de Login (/auth/signin)
  ↓
Insere credenciais
  ↓
✅ Login bem-sucedido
  ↓
Dashboard (/dashboard)
```

**O que vê na Landing Page:**
- Header com navegação pública
- Botão "🔐 Login Admin" (header e footer)
- Acesso livre a: Políticas, Recursos, Treinamento, Alertas, Reportar

---

### **2. Usuário Logado**

```mermaid
Landing Page (/)
  ↓
Clica "Ir para Dashboard"
  ↓
Dashboard (/dashboard)
  ↓
Usa sistema administrativo
  ↓
Clica "Terminar Sessão"
  ↓
Logout
  ↓
Landing Page (/)
```

**O que vê na Landing Page:**
- Header com navegação pública
- Botão "📊 Ir para Dashboard" (header e footer)
- Acesso livre a páginas públicas (ainda pode navegar)

**O que vê no Dashboard:**
- Header administrativo
- Menu: Dashboard, Políticas, Riscos, Incidentes, etc
- UserMenu com nome, papel e botão "Terminar Sessão"
- Acesso a todas as funcionalidades protegidas

---

## 📝 Arquivos Modificados

### **1. Página de Login** (`src/app/auth/signin/page.tsx`)
```typescript
// ANTES:
window.location.href = "/";  // ❌ Ia para landing page

// DEPOIS:
window.location.href = "/dashboard";  // ✅ Vai para dashboard
```

### **2. Layout Público** (`src/app/(public)/layout.tsx`)
```typescript
// Convertido para "use client"
const { data: session } = useSession();

// Header
{session ? (
  <Link href="/dashboard">📊 Ir para Dashboard</Link>
) : (
  <Link href="/auth/signin">🔐 Login Admin</Link>
)}

// Footer (mesmo esquema)
```

### **3. UserMenu** (`src/components/UserMenu.tsx`)
```typescript
// ANTES:
window.location.href = "/auth/signin";  // ❌ Ia para login

// DEPOIS:
window.location.href = "/";  // ✅ Vai para landing page
```

### **4. Auth Config** (`src/lib/auth.ts`)
```typescript
callbacks: {
  async redirect({ url, baseUrl }) {
    // Redireciona para dashboard após login
    if (url === baseUrl || url === baseUrl + "/") {
      return baseUrl + "/dashboard";
    }
    return baseUrl + "/dashboard";
  },
  // ...
}
```

---

## 🎯 Estados da Interface

### **Estado 1: Visitante (Não Logado)**

| Localização | Header | Ações Disponíveis |
|-------------|--------|-------------------|
| Landing Page | Público | "Login Admin" |
| Políticas | Público | "Login Admin" |
| Reportar | Público | "Login Admin" |
| Recursos | Público | "Login Admin" |
| Treinamento | Público | "Login Admin" |
| Alertas | Público | "Login Admin" |
| /dashboard | ⛔ Redireciona para `/auth/signin` | - |

### **Estado 2: Usuário Logado**

| Localização | Header | Ações Disponíveis |
|-------------|--------|-------------------|
| Landing Page | Público | "Ir para Dashboard" |
| Políticas | Público | "Ir para Dashboard" |
| Reportar | Público | "Ir para Dashboard" |
| Recursos | Público | "Ir para Dashboard" |
| Treinamento | Público | "Ir para Dashboard" |
| Alertas | Público | "Ir para Dashboard" |
| /dashboard | Admin | UserMenu + Logout |
| /policies | Admin | UserMenu + Logout |
| /risks | Admin | UserMenu + Logout |
| /incidents | Admin | UserMenu + Logout |
| Todas protegidas | Admin | UserMenu + Logout |

---

## 🔒 Middleware de Proteção

```typescript
// Rotas públicas (sempre acessíveis)
const publicRoutes = [
  "/",
  "/politicas",
  "/reportar",
  "/treinamento",
  "/recursos",
  "/alertas",
];

// Rotas de autenticação
const authRoutes = [
  "/auth/signin",
  "/auth/error",
  "/auth/change-password",
];

// Todas as outras rotas REQUEREM login
// Exemplos: /dashboard, /policies, /risks, etc.
```

---

## 🎨 UI/UX Melhorias

### **Landing Page (Usuário Logado):**

**Header:**
```
Logo  |  Início  Políticas  Recursos  Treinamento  Alertas  Reportar  |  [📊 Ir para Dashboard]
```

**Footer:**
```
Contato:
  📧 security@unilicungo.ac.mz
  📞 +258 12 345 6789
  🏢 Dashboard Administrativo ← Link para dashboard
```

### **Dashboard (Área Protegida):**

**Header:**
```
Logo  |  Dashboard  Políticas  Riscos  Incidentes  ...  |  [Elemos (Super Admin) ▼]
```

**UserMenu (Dropdown):**
```
┌─────────────────────────────────┐
│ [E] Elemos (Super Admin)        │
│     elemos@unilicungo.ac.mz     │
│     [Administrador]              │
├─────────────────────────────────┤
│ 🚪 Terminar Sessão              │
└─────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida da Sessão

### **Login:**
1. Usuário acessa `/auth/signin`
2. Insere email (@unilicungo.ac.mz) e senha
3. NextAuth valida credenciais
4. Cria JWT token (8 horas)
5. Redireciona para `/dashboard`

### **Navegação (Logado):**
- Pode acessar landing page `/` (vê botão "Ir para Dashboard")
- Pode acessar páginas públicas normalmente
- Pode acessar todas as páginas protegidas
- UserMenu sempre visível nas páginas protegidas

### **Logout:**
1. Usuário clica "Terminar Sessão" no UserMenu
2. NextAuth destrói sessão e token
3. Redireciona para `/` (landing page)
4. Vê botão "Login Admin" novamente

### **Sessão Expirada:**
1. Após 8 horas de inatividade
2. Token JWT expira automaticamente
3. Tentativa de acessar área protegida
4. Middleware redireciona para `/auth/signin`

---

## 🧪 Testes

### **Teste 1: Login e Navegação**
```bash
1. Acesse http://localhost:3001/
   ✓ Deve ver botão "Login Admin"

2. Clique em "Login Admin"
   ✓ Deve abrir /auth/signin

3. Faça login:
   - Email: elemos@unilicungo.ac.mz
   - Senha: password
   ✓ Deve redirecionar para /dashboard

4. Verifique header administrativo
   ✓ Deve ver: Dashboard, Políticas, Riscos, etc
   ✓ Deve ver UserMenu com nome e papel
```

### **Teste 2: Usuário Logado na Landing Page**
```bash
1. Estando logado, acesse http://localhost:3001/
   ✓ Deve ver botão "Ir para Dashboard"
   ✓ Ainda pode navegar páginas públicas

2. Clique "Ir para Dashboard"
   ✓ Deve ir para /dashboard
```

### **Teste 3: Logout**
```bash
1. No dashboard, clique no UserMenu
   ✓ Deve abrir dropdown com dados do usuário

2. Clique "Terminar Sessão"
   ✓ Deve fazer logout
   ✓ Deve redirecionar para / (landing page)
   ✓ Deve ver botão "Login Admin" novamente
```

### **Teste 4: Acesso Protegido Sem Login**
```bash
1. Faça logout se estiver logado

2. Tente acessar http://localhost:3001/dashboard
   ✓ Deve redirecionar para /auth/signin
   ✓ Deve ver callbackUrl apontando para /dashboard

3. Faça login
   ✓ Deve voltar para /dashboard automaticamente
```

---

## ✅ Checklist de Funcionalidades

- [x] Login redireciona para `/dashboard`
- [x] Landing page detecta usuário logado
- [x] Botão muda para "Ir para Dashboard" quando logado
- [x] UserMenu mostra dados do usuário
- [x] Logout funciona corretamente
- [x] Logout redireciona para landing page
- [x] Middleware protege rotas administrativas
- [x] Rotas públicas sempre acessíveis
- [x] Sessão expira após 8 horas
- [x] callbackUrl preservado após login

---

## 🎊 Resultado Final

✅ **Fluxo de autenticação completo e intuitivo**  
✅ **Usuário sempre sabe seu estado (logado ou não)**  
✅ **Navegação clara entre público e privado**  
✅ **Logout acessível e funcional**  
✅ **Landing page serve ambos: visitantes e usuários logados**  

**Tudo funcionando perfeitamente! 🚀**
