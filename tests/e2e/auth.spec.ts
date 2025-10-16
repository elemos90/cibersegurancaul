import { test, expect } from '@playwright/test';

/**
 * Testes E2E para Autenticação
 * 
 * Nota: Antes de executar, certifique-se de:
 * 1. Servidor Next.js rodando (npm run dev)
 * 2. Banco de dados MySQL ativo
 * 3. Usuário de teste criado na base
 */

test.describe('Autenticação', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
  });

  test('deve redirecionar para login quando não autenticado', async ({ page }) => {
    // Verificar se foi redirecionado para página de login
    await expect(page).toHaveURL(/\/auth\/signin/);
    
    // Verificar elementos da página de login
    await expect(page.locator('text=Portal de Cibersegurança')).toBeVisible();
  });

  test('deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Preencher formulário com credenciais inválidas
    await page.fill('input[name="email"]', 'invalido@unilicungo.ac.mz');
    await page.fill('input[name="password"]', 'senhaerrada');
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Verificar mensagem de erro
    await expect(page.locator('text=Credenciais inválidas')).toBeVisible({
      timeout: 5000,
    });
  });

  test('deve fazer login com credenciais válidas', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Preencher formulário (ajuste o email/senha conforme seu usuário de teste)
    await page.fill('input[name="email"]', 'test@unilicungo.ac.mz');
    await page.fill('input[name="password"]', 'TestPassword123!');
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento para dashboard
    await expect(page).toHaveURL('/', { timeout: 10000 });
    
    // Verificar elementos do dashboard
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=MFA Cobertura')).toBeVisible();
  });

  test('deve fazer logout com sucesso', async ({ page, context }) => {
    // Primeiro fazer login (você pode usar storageState para otimizar)
    await page.goto('/auth/signin');
    await page.fill('input[name="email"]', 'test@unilicungo.ac.mz');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/', { timeout: 10000 });
    
    // Fazer logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Sair');
    
    // Verificar redirecionamento para login
    await expect(page).toHaveURL(/\/auth\/signin/);
  });

  test('deve validar domínio de email institucional', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Tentar login com email não institucional
    await page.fill('input[name="email"]', 'test@gmail.com');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    
    // Verificar mensagem de erro
    await expect(page.locator('text=domínio @unilicungo.ac.mz')).toBeVisible({
      timeout: 5000,
    });
  });
});
