# 📚 Exemplos de Testes

Coleção de exemplos práticos de testes para o portal.

## 🎯 Testes Unitários

### Testar Função de Cálculo

```typescript
// src/lib/calculator.ts
export function calcularPercentagem(valor: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((valor / total) * 100);
}

// tests/unit/lib/calculator.test.ts
import { calcularPercentagem } from '@/lib/calculator';

describe('calcularPercentagem', () => {
  it('deve calcular percentagem corretamente', () => {
    expect(calcularPercentagem(40, 100)).toBe(40);
    expect(calcularPercentagem(1, 3)).toBe(33);
  });

  it('deve retornar 0 quando total é zero', () => {
    expect(calcularPercentagem(10, 0)).toBe(0);
  });

  it('deve arredondar o resultado', () => {
    expect(calcularPercentagem(1, 3)).toBe(33); // 33.33... -> 33
  });
});
```

### Testar Componente com Props

```typescript
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('deve renderizar com texto correto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });

  it('deve aplicar className customizada', () => {
    const { container } = render(
      <Button className="custom-class">Click</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### Testar Hook Customizado

```typescript
// src/hooks/useCounter.ts
import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  return {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
    reset: () => setCount(initialValue),
  };
}

// tests/unit/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('deve inicializar com valor padrão', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('deve inicializar com valor customizado', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('deve incrementar contador', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('deve decrementar contador', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('deve resetar para valor inicial', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

## 🔗 Testes de Integração

### Testar API Route com Mock do Prisma

```typescript
// tests/integration/api/users.test.ts
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/users/route';
import { getServerSession } from 'next-auth';
import { prismaMock } from '../../utils/prisma-mock';

jest.mock('next-auth');
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }));

describe('API /api/users', () => {
  const mockSession = {
    user: { id: 'user-1', email: 'admin@unilicungo.ac.mz', papel: 'admin' },
  };

  beforeEach(() => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
  });

  describe('GET', () => {
    it('deve retornar lista de usuários', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', email: 'user1@unilicungo.ac.mz' },
        { id: '2', name: 'User 2', email: 'user2@unilicungo.ac.mz' },
      ];

      prismaMock.user.findMany.mockResolvedValue(mockUsers as any);

      const req = new NextRequest('http://localhost:3000/api/users');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(2);
      expect(data[0].email).toBe('user1@unilicungo.ac.mz');
    });

    it('deve filtrar por papel', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);

      const req = new NextRequest('http://localhost:3000/api/users?papel=admin');
      await GET(req);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { papel: 'admin' },
        })
      );
    });
  });

  describe('POST', () => {
    it('deve criar novo usuário', async () => {
      const newUser = {
        id: 'new-user',
        name: 'New User',
        email: 'new@unilicungo.ac.mz',
        papel: 'ti',
      };

      prismaMock.user.create.mockResolvedValue(newUser as any);

      const req = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New User',
          email: 'new@unilicungo.ac.mz',
          papel: 'ti',
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.email).toBe('new@unilicungo.ac.mz');
      expect(prismaMock.user.create).toHaveBeenCalled();
    });

    it('deve validar email institucional', async () => {
      const req = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Invalid User',
          email: 'invalid@gmail.com',
          papel: 'ti',
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('domínio');
    });
  });
});
```

### Testar com Dados Assíncronos

```typescript
// tests/integration/services/email.test.ts
import { enviarEmail } from '@/lib/email';

describe('Email Service', () => {
  it('deve enviar email com sucesso', async () => {
    const resultado = await enviarEmail({
      to: 'test@unilicungo.ac.mz',
      subject: 'Teste',
      body: 'Conteúdo do teste',
    });

    expect(resultado.success).toBe(true);
    expect(resultado.messageId).toBeDefined();
  });

  it('deve retornar erro para email inválido', async () => {
    await expect(
      enviarEmail({
        to: 'invalido',
        subject: 'Teste',
        body: 'Conteúdo',
      })
    ).rejects.toThrow('Email inválido');
  });
});
```

## 🎭 Testes E2E

### Fluxo de Login

```typescript
// tests/e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação Completo', () => {
  test('deve fazer login, navegar e logout', async ({ page }) => {
    // 1. Acessar página de login
    await page.goto('/auth/signin');
    await expect(page).toHaveTitle(/Portal de Cibersegurança/);

    // 2. Fazer login
    await page.fill('input[name="email"]', 'test@unilicungo.ac.mz');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');

    // 3. Verificar redirecionamento para dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Dashboard');

    // 4. Navegar para políticas
    await page.click('a:has-text("Políticas")');
    await expect(page).toHaveURL('/policies');

    // 5. Fazer logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Sair');
    
    // 6. Verificar redirecionamento para login
    await expect(page).toHaveURL(/\/auth\/signin/);
  });
});
```

### CRUD Completo

```typescript
// tests/e2e/policies-crud.spec.ts
import { test, expect } from '@playwright/test';
import { login, TEST_ADMIN } from './helpers/auth';

test.describe('CRUD de Políticas', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_ADMIN);
    await page.goto('/policies');
  });

  test('deve criar, editar e deletar política', async ({ page }) => {
    const policyTitle = `Política E2E ${Date.now()}`;

    // CREATE
    await page.click('button:has-text("Nova Política")');
    await page.fill('input[name="titulo"]', policyTitle);
    await page.fill('textarea[name="descricao"]', 'Descrição de teste');
    await page.selectOption('select[name="categoria"]', 'acesso');
    await page.fill('textarea[name="conteudo"]', 'Conteúdo da política');
    await page.click('button[type="submit"]');

    await expect(page.locator(`text=${policyTitle}`)).toBeVisible();

    // READ/VIEW
    await page.click(`text=${policyTitle}`);
    await expect(page.locator('h1')).toContainText(policyTitle);

    // UPDATE
    await page.click('button:has-text("Editar")');
    await page.fill('input[name="titulo"]', `${policyTitle} (Editada)`);
    await page.click('button[type="submit"]');
    await expect(page.locator('text=(Editada)')).toBeVisible();

    // DELETE
    await page.click('button:has-text("Deletar")');
    await page.click('button:has-text("Confirmar")');
    await expect(page.locator(`text=${policyTitle}`)).not.toBeVisible();
  });
});
```

### Testar Responsividade

```typescript
// tests/e2e/responsive.spec.ts
import { test, expect, devices } from '@playwright/test';

test.describe('Responsividade', () => {
  test('deve funcionar em mobile', async ({ page }) => {
    await page.setViewportSize(devices['iPhone 12'].viewport);
    await page.goto('/');

    // Verificar que elementos principais são visíveis
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar que menu mobile funciona
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });

  test('deve funcionar em tablet', async ({ page }) => {
    await page.setViewportSize(devices['iPad'].viewport);
    await page.goto('/');
    
    // Testes específicos para tablet
  });
});
```

### Testar Upload de Arquivos

```typescript
// tests/e2e/file-upload.spec.ts
import { test, expect } from '@playwright/test';
import { login, TEST_USER } from './helpers/auth';
import path from 'path';

test('deve fazer upload de evidência', async ({ page }) => {
  await login(page, TEST_USER);
  await page.goto('/policies/pol-001');

  // Selecionar arquivo
  const filePath = path.join(__dirname, 'fixtures', 'test-file.pdf');
  await page.setInputFiles('input[type="file"]', filePath);

  // Submeter
  await page.click('button:has-text("Upload")');

  // Verificar sucesso
  await expect(page.locator('text=Upload realizado')).toBeVisible();
  await expect(page.locator('text=test-file.pdf')).toBeVisible();
});
```

## 🔒 Testar Permissões

```typescript
// tests/e2e/permissions.spec.ts
import { test, expect } from '@playwright/test';
import { login, TEST_USER, TEST_ADMIN } from './helpers/auth';

test.describe('Controle de Acesso', () => {
  test('usuário comum não deve ver painel admin', async ({ page }) => {
    await login(page, TEST_USER);
    await page.goto('/');

    // Link de admin não deve estar visível
    await expect(page.locator('a:has-text("Admin")')).not.toBeVisible();

    // Tentar acessar diretamente deve redirecionar
    await page.goto('/admin/users');
    await expect(page).toHaveURL('/'); // Redirecionado para home
  });

  test('admin deve ter acesso completo', async ({ page }) => {
    await login(page, TEST_ADMIN);
    await page.goto('/');

    // Link de admin deve estar visível
    await expect(page.locator('a:has-text("Admin")')).toBeVisible();

    // Deve conseguir acessar painel
    await page.click('a:has-text("Admin")');
    await expect(page).toHaveURL('/admin/users');
  });
});
```

## 📸 Testar com Screenshots

```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test';

test('deve manter layout consistente', async ({ page }) => {
  await page.goto('/');
  
  // Tirar screenshot da página completa
  await expect(page).toHaveScreenshot('dashboard-full.png', {
    fullPage: true,
  });

  // Screenshot de elemento específico
  const kpiSection = page.locator('[data-testid="kpi-section"]');
  await expect(kpiSection).toHaveScreenshot('kpi-section.png');
});
```

## 🎯 Boas Práticas

### ✅ BOM
```typescript
// Usar data-testid para elementos importantes
<button data-testid="submit-button">Enviar</button>

// Esperar explicitamente
await expect(page.locator('text=Sucesso')).toBeVisible();

// Usar helpers compartilhados
await login(page, TEST_USER);
```

### ❌ EVITAR
```typescript
// Seletores frágeis
await page.click('.btn.btn-primary.submit-btn');

// Esperas arbitrárias
await page.waitForTimeout(5000);

// Código duplicado
// Repetir login em cada teste ao invés de usar helper
```

## 📚 Recursos

- Ver `TESTING.md` para guia completo
- Ver `tests/unit/` para mais exemplos unitários
- Ver `tests/e2e/` para mais exemplos E2E
