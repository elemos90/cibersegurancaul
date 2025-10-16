import { Page } from '@playwright/test';

/**
 * Helpers para autenticação em testes E2E
 */

export interface TestUser {
  email: string;
  password: string;
  name: string;
}

// Usuário de teste padrão
export const TEST_USER: TestUser = {
  email: process.env.TEST_USER_EMAIL || 'test@unilicungo.ac.mz',
  password: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
  name: 'Test User',
};

// Admin de teste
export const TEST_ADMIN: TestUser = {
  email: process.env.TEST_ADMIN_EMAIL || 'admin@unilicungo.ac.mz',
  password: process.env.TEST_ADMIN_PASSWORD || 'AdminPassword123!',
  name: 'Admin User',
};

/**
 * Faz login no sistema
 */
export async function login(page: Page, user: TestUser = TEST_USER) {
  await page.goto('/auth/signin');
  
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', user.password);
  
  await page.click('button[type="submit"]');
  
  // Aguardar redirecionamento
  await page.waitForURL('/', { timeout: 10000 });
}

/**
 * Faz logout do sistema
 */
export async function logout(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('text=Sair');
  
  // Aguardar redirecionamento para login
  await page.waitForURL(/\/auth\/signin/, { timeout: 5000 });
}

/**
 * Verifica se o usuário está autenticado
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Verificar presença de elemento que só aparece quando autenticado
    const userMenu = page.locator('[data-testid="user-menu"]');
    return await userMenu.isVisible({ timeout: 1000 });
  } catch {
    return false;
  }
}

/**
 * Garante que o usuário está autenticado, fazendo login se necessário
 */
export async function ensureAuthenticated(page: Page, user: TestUser = TEST_USER) {
  const authenticated = await isAuthenticated(page);
  
  if (!authenticated) {
    await login(page, user);
  }
}
