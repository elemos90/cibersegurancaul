# Guia de Testes - Portal de Cibersegurança UniLicungo

Este documento explica como executar e criar testes para o portal.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração Inicial](#configuração-inicial)
3. [Tipos de Testes](#tipos-de-testes)
4. [Executando Testes](#executando-testes)
5. [Escrevendo Novos Testes](#escrevendo-novos-testes)
6. [Boas Práticas](#boas-práticas)
7. [CI/CD](#cicd)

---

## Visão Geral

O projeto utiliza três tipos principais de testes:

- **Testes Unitários**: Testam componentes e funções isoladamente (Jest + Testing Library)
- **Testes de Integração**: Testam APIs e interações entre módulos (Jest)
- **Testes E2E**: Testam fluxos completos da aplicação (Playwright)

### Estrutura de Testes

```
tests/
├── e2e/                    # Testes End-to-End (Playwright)
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── policies.spec.ts
│   └── helpers/
│       └── auth.ts
├── integration/            # Testes de Integração
│   └── api/
│       ├── policies.test.ts
│       └── risks.test.ts
├── unit/                   # Testes Unitários
│   ├── components/
│   │   └── KpiCard.test.tsx
│   └── lib/
│       └── risk-calculator.test.ts
├── mocks/                  # Mocks compartilhados
│   ├── fileMock.js
│   └── next-auth.mock.ts
├── setup/                  # Configuração de testes
│   └── jest.setup.ts
└── utils/                  # Utilitários de teste
    ├── test-helpers.ts
    └── prisma-mock.ts
```

---

## Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

Isso instalará automaticamente:
- Jest (framework de testes)
- Testing Library (testes de componentes React)
- Playwright (testes E2E)
- ts-jest (suporte TypeScript)

### 2. Configurar Variáveis de Ambiente para Testes

Crie um arquivo `.env.test` (opcional):

```env
# Banco de dados de teste (separado do desenvolvimento)
DATABASE_URL="mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal_test"

# Credenciais de teste para Playwright
TEST_USER_EMAIL="test@unilicungo.ac.mz"
TEST_USER_PASSWORD="TestPassword123!"
TEST_ADMIN_EMAIL="admin@unilicungo.ac.mz"
TEST_ADMIN_PASSWORD="AdminPassword123!"

# NextAuth
NEXTAUTH_SECRET="test-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Criar Banco de Dados de Teste (para E2E)

```sql
CREATE DATABASE security_portal_test DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON security_portal_test.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;
```

```bash
# Executar migrações no banco de teste
DATABASE_URL="mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal_test" npx prisma migrate deploy

# Popular com dados de teste
DATABASE_URL="mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal_test" npm run seed
```

### 4. Instalar Browsers do Playwright

```bash
npx playwright install
```

---

## Tipos de Testes

### Testes Unitários

Testam componentes e funções isoladamente.

**Quando usar:**
- Testar componentes React
- Testar funções utilitárias
- Testar lógica de negócio

**Exemplo:**
```typescript
// tests/unit/components/KpiCard.test.tsx
import { render, screen } from '@testing-library/react';
import { KpiCard } from '@/components/KpiCard';

test('deve renderizar KPI corretamente', () => {
  render(<KpiCard label="MFA" value="40%" />);
  expect(screen.getByText('MFA')).toBeInTheDocument();
  expect(screen.getByText('40%')).toBeInTheDocument();
});
```

### Testes de Integração

Testam APIs e interações entre módulos.

**Quando usar:**
- Testar rotas de API
- Testar integração com banco de dados (com mocks)
- Testar autenticação

**Exemplo:**
```typescript
// tests/integration/api/policies.test.ts
import { GET } from '@/app/api/policies/route';

test('deve retornar lista de políticas', async () => {
  const req = new NextRequest('http://localhost:3000/api/policies');
  const response = await GET(req);
  const data = await response.json();
  
  expect(response.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
});
```

### Testes E2E (End-to-End)

Testam fluxos completos no navegador real.

**Quando usar:**
- Testar fluxos críticos de usuário
- Testar integração completa
- Testar comportamento em diferentes browsers

**Exemplo:**
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('deve fazer login com sucesso', async ({ page }) => {
  await page.goto('/auth/signin');
  await page.fill('input[name="email"]', 'test@unilicungo.ac.mz');
  await page.fill('input[name="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/');
});
```

---

## Executando Testes

### Testes Unitários e de Integração (Jest)

```bash
# Executar todos os testes Jest
npm test

# Executar em modo watch (útil durante desenvolvimento)
npm run test:watch

# Executar com cobertura de código
npm run test:coverage

# Executar apenas testes unitários
npm run test:unit

# Executar apenas testes de integração
npm run test:integration

# Executar um arquivo específico
npm test -- tests/unit/components/KpiCard.test.tsx
```

### Testes E2E (Playwright)

```bash
# Executar todos os testes E2E
npm run test:e2e

# Executar com interface gráfica
npm run test:e2e:ui

# Executar com browser visível
npm run test:e2e:headed

# Executar em modo debug
npm run test:e2e:debug

# Executar um arquivo específico
npx playwright test tests/e2e/auth.spec.ts

# Executar apenas em Chromium
npx playwright test --project=chromium
```

**Nota:** Antes de executar testes E2E, certifique-se de que o servidor está rodando:

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Executar testes E2E
npm run test:e2e
```

### Executar Todos os Testes

```bash
# Executar Jest + Playwright
npm run test:all

# Executar validação completa (lint + type-check + tests)
npm run validate
```

### Visualizar Relatórios

```bash
# Ver relatório de cobertura Jest
npm run test:coverage
# Abre em: coverage/lcov-report/index.html

# Ver relatório do Playwright
npx playwright show-report
# Abre em: playwright-report/index.html
```

---

## Escrevendo Novos Testes

### Teste Unitário de Componente

```typescript
// tests/unit/components/MeuComponente.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MeuComponente } from '@/components/MeuComponente';

describe('MeuComponente', () => {
  it('deve renderizar corretamente', () => {
    render(<MeuComponente titulo="Teste" />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('deve reagir a cliques', () => {
    const handleClick = jest.fn();
    render(<MeuComponente onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Teste de Integração de API

```typescript
// tests/integration/api/minha-rota.test.ts
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/minha-rota/route';
import { prismaMock } from '../../utils/prisma-mock';

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

describe('API /api/minha-rota', () => {
  it('deve retornar dados', async () => {
    prismaMock.minhaTabela.findMany.mockResolvedValue([
      { id: '1', nome: 'Teste' }
    ]);

    const req = new NextRequest('http://localhost:3000/api/minha-rota');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
  });
});
```

### Teste E2E

```typescript
// tests/e2e/meu-fluxo.spec.ts
import { test, expect } from '@playwright/test';
import { login, TEST_USER } from './helpers/auth';

test.describe('Meu Fluxo', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
  });

  test('deve completar fluxo com sucesso', async ({ page }) => {
    await page.goto('/minha-pagina');
    
    // Interagir com a página
    await page.click('button:has-text("Ação")');
    
    // Verificar resultado
    await expect(page.locator('text=Sucesso')).toBeVisible();
  });
});
```

---

## Boas Práticas

### Gerais

✅ **Escrever testes antes ou junto com o código** (TDD/BDD)
✅ **Manter testes independentes** (não devem depender uns dos outros)
✅ **Usar nomes descritivos** (`deve fazer X quando Y`)
✅ **Testar casos de sucesso e erro**
✅ **Manter testes rápidos** (< 1s para unitários)
✅ **Limpar estado após cada teste**

❌ **Evitar testes flaky** (que falham aleatoriamente)
❌ **Não testar implementação, teste comportamento**
❌ **Não duplicar lógica de produção nos testes**

### Jest

```typescript
// ✅ BOM: Testa comportamento
test('deve exibir erro quando email inválido', () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'invalido' }
  });
  expect(screen.getByText('Email inválido')).toBeInTheDocument();
});

// ❌ RUIM: Testa implementação
test('deve chamar validateEmail', () => {
  const spy = jest.spyOn(validator, 'validateEmail');
  // ...
  expect(spy).toHaveBeenCalled();
});
```

### Playwright

```typescript
// ✅ BOM: Usar data-testid para elementos dinâmicos
await page.click('[data-testid="submit-button"]');

// ⚠️ EVITAR: Seletores frágeis
await page.click('div > div > button.btn-primary');

// ✅ BOM: Esperar explicitamente
await expect(page.locator('text=Sucesso')).toBeVisible();

// ❌ RUIM: Esperas arbitrárias
await page.waitForTimeout(5000);
```

### Cobertura de Código

**Meta:** >70% de cobertura em todas as métricas

```bash
npm run test:coverage
```

Verifique o relatório em `coverage/lcov-report/index.html`

**Foco:**
- Funções críticas: 100%
- APIs: >90%
- Componentes UI: >80%
- Utilitários: >90%

---

## CI/CD

### GitHub Actions (Exemplo)

Crie `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: security_portal_test
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Build application
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: mysql://root:root@localhost:3306/security_portal_test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: |
            coverage/
            playwright-report/
```

---

## Troubleshooting

### Erro: "Cannot find module '@/...'"

**Solução:** Verificar `tsconfig.json` e `jest.config.js` têm o mesmo path mapping.

### Testes Playwright falhando com timeout

**Solução:** 
1. Verificar se o servidor está rodando
2. Aumentar timeout: `test.setTimeout(60000)`
3. Verificar logs do navegador no relatório

### Mock do Prisma não funciona

**Solução:**
```typescript
// Certifique-se de fazer mock antes de importar a rota
jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));
```

### Testes passam localmente mas falham no CI

**Causas comuns:**
- Diferença de timezone
- Banco de dados não inicializado
- Variáveis de ambiente faltando
- Dependências de ordem de execução

---

## Recursos Adicionais

- [Jest Docs](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright Docs](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

## Checklist de Testes

Antes de fazer commit/PR:

- [ ] Todos os testes passam localmente
- [ ] Cobertura de código >70%
- [ ] Novos recursos têm testes
- [ ] Lint e type-check sem erros
- [ ] Testes E2E passam nos principais browsers
- [ ] Documentação de testes atualizada

Execute:
```bash
npm run validate
```
