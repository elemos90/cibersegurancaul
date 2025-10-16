# 🎨 Estrutura de Layouts - Portal de Cibersegurança

## ✅ Problema Resolvido: Conflito de Layouts

**ANTES:** Dois headers apareciam ao mesmo tempo (público + administrativo)  
**DEPOIS:** Cada grupo de páginas tem seu próprio layout

---

## 📂 Hierarquia de Layouts

```
src/app/
├── layout.tsx                      → Root (apenas HTML + Providers)
│
├── (public)/                       → Grupo de páginas PÚBLICAS
│   ├── layout.tsx                  → Layout público (header + footer)
│   ├── page.tsx                    → Landing page (/)
│   ├── politicas/page.tsx
│   ├── reportar/page.tsx
│   ├── treinamento/page.tsx
│   ├── recursos/page.tsx
│   └── alertas/page.tsx
│
├── dashboard/                      → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Dashboard
│
├── policies/                       → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Gestão de políticas
│
├── risks/                          → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Gestão de riscos
│
├── incidents/                      → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Gestão de incidentes
│
├── exceptions/                     → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Gestão de exceções
│
├── vendors/                        → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → Gestão de fornecedores
│
├── kpis/                           → Página protegida
│   ├── layout.tsx                  → Usa AdminLayout
│   └── page.tsx                    → KPIs e métricas
│
└── admin/                          → Páginas de admin
    ├── layout.tsx                  → Usa AdminLayout
    └── users/page.tsx              → Gestão de usuários
```

---

## 🎯 3 Tipos de Layouts

### **1. Root Layout** (`src/app/layout.tsx`)
```tsx
// Layout minimalista - apenas estrutura HTML + Providers
<html>
  <body>
    <Providers>
      {children}  // Renderiza layouts filhos
    </Providers>
  </body>
</html>
```

**Usado por:** TODAS as páginas (base)

---

### **2. Layout Público** (`src/app/(public)/layout.tsx`)
```tsx
// Header público + Footer completo
<div>
  <header>
    // Logo + Nav público + Botão "Login Admin"
  </header>
  <main>{children}</main>
  <footer>
    // Footer completo com links e contatos
  </footer>
</div>
```

**Usado por:**
- `/` - Landing page
- `/politicas`
- `/reportar`
- `/treinamento`
- `/recursos`
- `/alertas`

---

### **3. Layout Administrativo** (`src/components/AdminLayout.tsx`)
```tsx
// Header admin + Footer simples
<div>
  <header>
    // Logo + Nav admin + UserMenu
    // Links: Dashboard, Políticas, Riscos, etc
  </header>
  <main>{children}</main>
  <footer>
    // Footer simples
  </footer>
</div>
```

**Usado por:**
- `/dashboard`
- `/policies`
- `/risks`
- `/incidents`
- `/exceptions`
- `/vendors`
- `/kpis`
- `/admin/users`

---

## 🔄 Como Funciona

### **Páginas Públicas:**
```
Root Layout
  └─ Public Layout (header + footer público)
      └─ Conteúdo da página
```

### **Páginas Protegidas:**
```
Root Layout
  └─ Admin Layout (header + footer admin)
      └─ Conteúdo da página
```

---

## ✨ Vantagens

### **Separação Limpa**
✅ Público e protegido 100% separados  
✅ Sem conflitos de headers/footers  
✅ Cada grupo tem seu próprio estilo

### **Componente Reutilizável**
✅ `AdminLayout` compartilhado por todas páginas protegidas  
✅ Mudanças no header admin afetam todas de uma vez  
✅ Código DRY (Don't Repeat Yourself)

### **Performance**
✅ Next.js otimiza layouts automaticamente  
✅ Apenas re-renderiza o que mudou  
✅ Layouts aninhados carregam uma vez

---

## 📝 Arquivos Criados/Modificados

### **Modificados:**
- ✅ `src/app/layout.tsx` - Simplificado para root minimalista

### **Criados:**
- ✅ `src/components/AdminLayout.tsx` - Componente compartilhado
- ✅ `src/app/dashboard/layout.tsx`
- ✅ `src/app/policies/layout.tsx`
- ✅ `src/app/risks/layout.tsx`
- ✅ `src/app/incidents/layout.tsx`
- ✅ `src/app/exceptions/layout.tsx`
- ✅ `src/app/vendors/layout.tsx`
- ✅ `src/app/kpis/layout.tsx`
- ✅ `src/app/admin/layout.tsx`

---

## 🎊 Resultado

### **Antes (Problema):**
```
Landing page: Header público + Header admin (duplicado) ❌
Dashboard: Header público + Header admin (duplicado) ❌
```

### **Depois (Resolvido):**
```
Landing page: Header público apenas ✅
Dashboard: Header admin apenas ✅
```

---

## 🚀 Teste Agora

1. **Acesse a landing page:**
   ```
   http://localhost:3001/
   ```
   → Deve ver APENAS o header público

2. **Faça login e acesse dashboard:**
   ```
   http://localhost:3001/dashboard
   ```
   → Deve ver APENAS o header administrativo

3. **Navegue entre páginas:**
   - Públicas mantêm header público
   - Protegidas mantêm header admin
   - Sem duplicação!

---

**✨ Agora cada tipo de página tem seu próprio layout isolado e limpo!**
