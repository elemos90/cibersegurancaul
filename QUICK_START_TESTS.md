# 🚀 Quick Start - Testes

Guia rápido para começar a usar o sistema de testes.

## ⚡ Instalação (3 minutos)

```bash
# 1. Instalar dependências (se ainda não instalou)
npm install

# 2. Instalar browsers do Playwright
npx playwright install

# 3. Verificar instalação
npm test -- --version
```

## 🧪 Executar Testes

### Testes Rápidos (Unitários + Integração)

```bash
# Executar todos os testes Jest
npm test

# Executar com watch mode (útil durante desenvolvimento)
npm run test:watch
```

### Testes E2E (Playwright)

```bash
# Terminal 1: Iniciar servidor de desenvolvimento
npm run dev

# Terminal 2: Executar testes E2E
npm run test:e2e

# Ou com interface gráfica
npm run test:e2e:ui
```

### Cobertura de Código

```bash
npm run test:coverage
```

Abra `coverage/lcov-report/index.html` no navegador para ver o relatório.

## 📝 Criar Seu Primeiro Teste

### 1. Teste Unitário

Crie `tests/unit/exemplo.test.ts`:

```typescript
describe('Meu Primeiro Teste', () => {
  it('deve somar dois números', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Execute: `npm test`

### 2. Teste de Componente

Crie `tests/unit/components/MeuComponente.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { MeuComponente } from '@/components/MeuComponente';

test('deve renderizar texto', () => {
  render(<MeuComponente texto="Olá" />);
  expect(screen.getByText('Olá')).toBeInTheDocument();
});
```

### 3. Teste E2E

Crie `tests/e2e/meu-teste.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('meu primeiro teste E2E', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

Execute: `npm run test:e2e`

## 🎯 Comandos Mais Usados

```bash
# Desenvolvimento
npm run test:watch              # Modo watch para Jest
npm run test:e2e:ui            # UI interativa do Playwright

# CI/CD
npm run validate               # Lint + Type-check + Tests

# Debug
npm run test:e2e:debug         # Debug de testes E2E
npm test -- --detectOpenHandles # Debug de memory leaks
```

## 📊 Estrutura de Arquivos

```
tests/
├── unit/              # Componentes e funções
├── integration/       # APIs e rotas
├── e2e/              # Fluxos completos
└── utils/            # Helpers compartilhados
```

## 💡 Dicas

1. **Testes unitários** devem ser rápidos (< 1s)
2. **Testes E2E** devem testar fluxos críticos
3. Use `test.only()` para executar um teste específico
4. Use `test.skip()` para pular temporariamente

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
npm run type-check
```

### Testes E2E com timeout

```bash
# Aumentar timeout global
npx playwright test --timeout=60000
```

### Limpar cache

```bash
npm run test -- --clearCache
```

## 📚 Próximos Passos

- [ ] Ler [TESTING.md](./TESTING.md) completo
- [ ] Escrever testes para suas features
- [ ] Configurar CI/CD (ver TESTING.md)
- [ ] Atingir >70% de cobertura

## 🆘 Precisa de Ajuda?

- 📖 [Documentação Completa](./TESTING.md)
- 🌐 [Jest Docs](https://jestjs.io/)
- 🎭 [Playwright Docs](https://playwright.dev/)
