# 🎨 Design System - Portal de Cibersegurança UniLicungo

Sistema de design profissional e corporativo para o portal de governança de cibersegurança.

---

## 📐 Fundamentos

### Princípios de Design

1. **Profissional e Sério** - Visual corporativo e confiável
2. **Limpo e Minimalista** - Foco no conteúdo, sem distrações
3. **Acessível** - Contraste adequado e legibilidade
4. **Responsivo** - Funciona perfeitamente em todos os dispositivos
5. **Consistente** - Padrões visuais uniformes

---

## 🎨 Paleta de Cores

### Cores Principais (Primary)

**Azul Corporativo** - Confiança, segurança, profissionalismo

```css
primary-50:  #eff6ff  /* Backgrounds muito claros */
primary-100: #dbeafe  /* Backgrounds claros */
primary-200: #bfdbfe  /* Borders hover */
primary-300: #93c5fd  /* Elementos secundários */
primary-400: #60a5fa  /* Elementos interativos */
primary-500: #1e40af  /* Principal - Azul corporativo */
primary-600: #1e3a8a  /* Hover states */
primary-700: #1e3a8a  /* Active states */
primary-800: #1e3a8a  /* Textos em fundos claros */
primary-900: #172554  /* Textos enfatizados */
primary-950: #0f172a  /* Textos muito escuros */
```

**Uso:**
- Botões primários
- Links importantes
- Headers e navegação
- Elementos de marca

### Cores Secundárias (Secondary)

**Teal Profissional** - Equilíbrio, tecnologia, modernidade

```css
secondary-50:  #f0fdfa  /* Backgrounds sutis */
secondary-100: #ccfbf1  /* Highlights */
secondary-200: #99f6e4  /* Borders */
secondary-300: #5eead4  /* Decorações */
secondary-400: #2dd4bf  /* Hover effects */
secondary-500: #0d9488  /* Principal - Teal */
secondary-600: #0f766e  /* Hover */
secondary-700: #115e59  /* Active */
secondary-800: #134e4a  /* Textos */
secondary-900: #134e4a  /* Textos enfatizados */
```

**Uso:**
- Elementos de suporte
- Badges informativos
- Decorações subtis
- Estados de hover

### Cores de Acento (Accent)

**Âmbar Profissional** - Atenção, alertas, destaques

```css
accent-50:  #fefce8  /* Backgrounds */
accent-100: #fef9c3  /* Highlights */
accent-200: #fef08a  /* Borders */
accent-300: #fde047  /* Decorações */
accent-400: #facc15  /* Elementos vibrantes */
accent-500: #d97706  /* Principal - Âmbar */
accent-600: #b45309  /* Hover */
accent-700: #92400e  /* Active */
accent-800: #78350f  /* Textos */
accent-900: #78350f  /* Textos enfatizados */
```

**Uso:**
- Badges MVP/Premium
- Alertas importantes
- Call-to-actions secundários
- Elementos de destaque

### Tons Neutros (Slate)

**Cinzas Modernos** - Textos, fundos, borders

```css
slate-50:  #f8fafc  /* Fundo da página */
slate-100: #f1f5f9  /* Backgrounds sutis */
slate-200: #e2e8f0  /* Borders padrão */
slate-300: #cbd5e1  /* Borders hover */
slate-400: #94a3b8  /* Placeholders, ícones */
slate-500: #64748b  /* Textos secundários */
slate-600: #475569  /* Textos principais */
slate-700: #334155  /* Textos enfatizados */
slate-800: #1e293b  /* Headers */
slate-900: #0f172a  /* Textos muito escuros */
slate-950: #020617  /* Preto quase puro */
```

**Uso:**
- Textos em geral
- Backgrounds
- Borders
- Shadows

### Cores de Status

```css
success: #059669  /* Verde - Sucesso, aprovado */
warning: #d97706  /* Âmbar - Atenção, pendente */
danger:  #dc2626  /* Vermelho - Erro, crítico */
info:    #0284c7  /* Azul - Informação */
```

**Uso:**
- Alerts e mensagens
- Status de riscos
- Badges de estado
- Feedbacks de ações

---

## 📝 Tipografia

### Fontes

```css
/* Sans-serif principal */
font-sans: Inter, system-ui, sans-serif

/* Display (Títulos) */
font-display: Plus Jakarta Sans, Inter, sans-serif

/* Monospace (Código) */
font-mono: JetBrains Mono, Fira Code, monospace
```

### Tamanhos e Hierarquia

| Classe | Tamanho | Line Height | Uso |
|--------|---------|-------------|-----|
| `text-xs` | 0.75rem (12px) | 1rem | Legendas, meta info |
| `text-sm` | 0.875rem (14px) | 1.25rem | Textos secundários |
| `text-base` | 1rem (16px) | 1.5rem | Texto padrão |
| `text-lg` | 1.125rem (18px) | 1.75rem | Texto destacado |
| `text-xl` | 1.25rem (20px) | 1.75rem | Subtítulos |
| `text-2xl` | 1.5rem (24px) | 2rem | Títulos H3 |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Títulos H2 |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Títulos H1 |

### Pesos de Fonte

```css
font-light:     300  /* Textos muito leves */
font-normal:    400  /* Textos padrão */
font-medium:    500  /* Textos com ênfase */
font-semibold:  600  /* Subtítulos, labels */
font-bold:      700  /* Títulos principais */
font-extrabold: 800  /* Títulos muito enfatizados */
```

### Exemplos de Uso

```tsx
{/* Título principal */}
<h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
  Portal de Cibersegurança
</h1>

{/* Subtítulo */}
<h2 className="text-2xl font-display font-semibold text-slate-800">
  Dashboard de Riscos
</h2>

{/* Texto padrão */}
<p className="text-base text-slate-600">
  Governança e Operações de Cibersegurança
</p>

{/* Label */}
<label className="text-sm font-medium text-slate-700">
  Email Institucional
</label>

{/* Meta informação */}
<span className="text-xs text-slate-500">
  Última atualização: Hoje às 14:30
</span>
```

---

## 🎯 Componentes

### Botões

#### Primário
```tsx
<button className="btn btn-primary btn-lg">
  Entrar no Sistema
</button>

/* Classes aplicadas:
- bg-primary-600 text-white
- hover:bg-primary-700
- focus:ring-primary-500
- rounded-lg shadow-sm
- px-6 py-3
*/
```

#### Secundário
```tsx
<button className="btn btn-secondary btn-md">
  Cancelar
</button>

/* Classes aplicadas:
- bg-white text-slate-700
- border border-slate-300
- hover:bg-slate-50
- rounded-lg shadow-sm
- px-4 py-2
*/
```

#### Tamanhos
```css
.btn-sm  /* px-3 py-1.5 text-sm */
.btn-md  /* px-4 py-2 text-sm */
.btn-lg  /* px-6 py-3 text-base */
```

### Cards

```tsx
{/* Card padrão */}
<div className="card">
  <div className="card-header">
    <h3>Título do Card</h3>
  </div>
  <div className="card-body">
    Conteúdo do card
  </div>
</div>

/* Classes aplicadas:
- card: bg-white rounded-xl border shadow-sm
- card-header: border-b px-6 py-4
- card-body: px-6 py-4
*/
```

#### Card com Hover
```tsx
<div className="card hover:border-primary-200 hover:shadow-md transition-all">
  {/* Conteúdo */}
</div>
```

### Inputs

```tsx
{/* Input padrão */}
<input className="input" type="text" placeholder="Digite aqui..." />

/* Classes aplicadas:
- w-full rounded-lg
- border border-slate-300
- px-4 py-2.5
- text-sm text-slate-900
- placeholder-slate-400
- focus:border-primary-500
- focus:ring-2 focus:ring-primary-500/20
*/
```

#### Com Label
```tsx
<div>
  <label className="label">
    Email Institucional
  </label>
  <input className="input" type="email" />
</div>

/* label: 
- block text-sm font-medium
- text-slate-700 mb-2
*/
```

#### Com Ícone
```tsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
    <svg className="h-5 w-5 text-slate-400">...</svg>
  </div>
  <input className="input pl-10" />
</div>
```

### Badges

```tsx
{/* Badge primário */}
<span className="badge badge-primary">MVP</span>

{/* Badge de sucesso */}
<span className="badge badge-success">Ativo</span>

{/* Badge de alerta */}
<span className="badge badge-warning">Pendente</span>

{/* Badge de erro */}
<span className="badge badge-danger">Crítico</span>

/* Classes base:
- inline-flex items-center
- rounded-full px-2.5 py-0.5
- text-xs font-medium
*/
```

### KPI Cards

```tsx
<div className="card group hover:border-primary-200">
  <div className="card-body">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600">MFA Cobertura</p>
        <p className="text-3xl font-display font-bold text-slate-900">40%</p>
        <p className="text-xs text-slate-500 mt-2">Meta: 90%</p>
      </div>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50">
        <svg className="w-5 h-5 text-primary-600">...</svg>
      </div>
    </div>
  </div>
</div>
```

---

## 🎭 Animações

### Animações Disponíveis

```css
/* Blob animation (background decorativo) */
animate-blob

/* Float animation (elementos flutuantes) */
animate-float

/* Shimmer (loading states) */
animate-shimmer

/* Spin (loading spinners) */
animate-spin
```

### Exemplos de Uso

```tsx
{/* Background decorativo */}
<div className="absolute bg-primary-100 rounded-full blur-3xl opacity-30 animate-blob"></div>

{/* Elemento flutuante */}
<div className="animate-float">
  <svg>...</svg>
</div>

{/* Loading spinner */}
<svg className="animate-spin h-5 w-5">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
  <path className="opacity-75" fill="currentColor" d="..."></path>
</svg>
```

---

## 📏 Espaçamento

### Escala de Espaçamento

| Classe | Valor | Uso |
|--------|-------|-----|
| `gap-1` | 0.25rem (4px) | Elementos muito próximos |
| `gap-2` | 0.5rem (8px) | Elementos próximos |
| `gap-3` | 0.75rem (12px) | Espaçamento padrão |
| `gap-4` | 1rem (16px) | Seções pequenas |
| `gap-6` | 1.5rem (24px) | Seções médias |
| `gap-8` | 2rem (32px) | Seções grandes |

### Padding/Margin

```css
p-4   /* 1rem (16px) - Mobile */
p-6   /* 1.5rem (24px) - Tablet+ */
p-8   /* 2rem (32px) - Desktop */

sm:p-6   /* Responsive padding */
lg:p-8
```

---

## 🔲 Bordas e Sombras

### Border Radius

```css
rounded-sm   /* 0.25rem - Elementos pequenos */
rounded      /* 0.375rem - Padrão */
rounded-md   /* 0.5rem - Inputs, pequenos cards */
rounded-lg   /* 0.75rem - Botões, médios cards */
rounded-xl   /* 1rem - Cards grandes */
rounded-2xl  /* 1.25rem - Cards especiais */
rounded-3xl  /* 1.5rem - Elementos destaque */
```

### Box Shadow

```css
shadow-sm  /* Sombra sutil - Inputs, cards simples */
shadow     /* Sombra padrão - Cards, dropdowns */
shadow-md  /* Sombra média - Cards hover */
shadow-lg  /* Sombra grande - Modals, popovers */
shadow-xl  /* Sombra extra - Overlays */
```

---

## 📱 Responsividade

### Breakpoints

```css
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Padrões de Uso

```tsx
{/* Text responsive */}
<h1 className="text-2xl sm:text-3xl lg:text-4xl">

{/* Padding responsive */}
<div className="p-4 sm:p-6 lg:p-8">

{/* Grid responsive */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* Visibility */}
<nav className="hidden lg:flex">
```

---

## 🎨 Gradientes

### Gradientes de Fundo

```css
/* Azul corporativo */
bg-gradient-to-br from-primary-600 to-primary-800

/* Teal suave */
bg-gradient-to-r from-secondary-500 to-secondary-600

/* Neutro */
bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-100
```

### Gradientes de Texto

```css
/* Ainda não implementado, use bordas ou backgrounds */
```

---

## ✅ Checklist de Implementação

### Páginas

- [x] Login - Redesenhada completamente
- [x] Layout Principal - Header + Footer
- [x] KPI Cards - Novo design
- [ ] Dashboard - Aguardando
- [ ] Políticas - Aguardando
- [ ] Riscos - Aguardando
- [ ] Outros módulos - Aguardando

### Componentes

- [x] Botões - Sistema completo
- [x] Inputs - Sistema completo
- [x] Cards - Sistema completo
- [x] Badges - Sistema completo
- [x] KPI Cards - Redesenhado
- [ ] Tables - Aguardando
- [ ] Modals - Aguardando
- [ ] Dropdowns - Aguardando
- [ ] Tabs - Aguardando

---

## 📖 Guias de Uso

### Como Aplicar o Design System

1. **Use classes utilitárias do Tailwind**
   ```tsx
   <button className="btn btn-primary btn-lg">
   ```

2. **Combine com estados**
   ```tsx
   <div className="card hover:border-primary-200 transition-all">
   ```

3. **Seja responsivo**
   ```tsx
   <h1 className="text-2xl sm:text-3xl lg:text-4xl">
   ```

4. **Mantenha consistência**
   - Use as cores definidas
   - Siga a hierarquia de tipografia
   - Aplique espaçamentos padrão

### Anti-padrões (Evitar)

❌ Cores hard-coded
```tsx
<div style={{color: '#ff0000'}}> {/* EVITAR */}
```

✅ Use o sistema
```tsx
<div className="text-danger"> {/* CORRETO */}
```

❌ Tamanhos arbitrários
```tsx
<p style={{fontSize: '17px'}}> {/* EVITAR */}
```

✅ Use a escala
```tsx
<p className="text-lg"> {/* CORRETO */}
```

---

## 🔄 Migração

### Cores Antigas → Novas

```tsx
/* ANTES */
className="text-uni-blue"
className="bg-uni-teal"
className="text-uni-gold"
className="bg-uni-light"

/* DEPOIS */
className="text-primary-600"
className="bg-secondary-500"
className="text-accent-600"
className="bg-slate-50"
```

### Componentes

```tsx
/* ANTES */
<div className="rounded-2xl border bg-white p-4">

/* DEPOIS */
<div className="card">
  <div className="card-body">
```

---

## 📊 Métricas de Qualidade

### Contraste (WCAG AAA)

- Texto normal: >7:1
- Texto grande: >4.5:1
- Ícones: >3:1

### Performance

- Fontes carregadas via Google Fonts
- Otimização `font-display: swap`
- Preconnect para fonts.googleapis.com

### Acessibilidade

- Cores com bom contraste
- Focus states visíveis
- Hierarquia semântica (h1-h6)
- Labels em inputs

---

## 🎓 Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Inter Font](https://rsms.me/inter/)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Versão:** 1.0  
**Data:** 15 de Outubro de 2025  
**Status:** ✅ Implementado
