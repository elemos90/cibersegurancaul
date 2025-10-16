import { test, expect } from '@playwright/test';
import { login, TEST_USER } from './helpers/auth';

/**
 * Testes E2E para Dashboard
 */

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Fazer login antes de cada teste
    await login(page, TEST_USER);
  });

  test('deve exibir KPIs no dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Verificar título
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Verificar KPIs
    await expect(page.locator('text=MFA Cobertura')).toBeVisible();
    await expect(page.locator('text=EDR Cobertura')).toBeVisible();
    await expect(page.locator('text=Patches ≤7d')).toBeVisible();
    await expect(page.locator('text=Phishing Click')).toBeVisible();
  });

  test('deve exibir badge MVP', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=MVP')).toBeVisible();
  });

  test('deve exibir seção de alertas', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Alertas Recentes')).toBeVisible();
  });

  test('deve ter navegação funcional no header', async ({ page }) => {
    await page.goto('/');
    
    // Verificar links de navegação
    await expect(page.locator('a:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('a:has-text("Políticas")')).toBeVisible();
    await expect(page.locator('a:has-text("Riscos")')).toBeVisible();
    await expect(page.locator('a:has-text("Incidentes")')).toBeVisible();
    await expect(page.locator('a:has-text("Exceções")')).toBeVisible();
    await expect(page.locator('a:has-text("Fornecedores")')).toBeVisible();
    await expect(page.locator('a:has-text("KPIs")')).toBeVisible();
  });

  test('deve navegar para página de políticas', async ({ page }) => {
    await page.goto('/');
    
    await page.click('a:has-text("Políticas")');
    
    await expect(page).toHaveURL('/policies');
    await expect(page.locator('h1')).toContainText('Políticas');
  });

  test('deve navegar para página de riscos', async ({ page }) => {
    await page.goto('/');
    
    await page.click('a:has-text("Riscos")');
    
    await expect(page).toHaveURL('/risks');
  });

  test('deve exibir logo da universidade', async ({ page }) => {
    await page.goto('/');
    
    const logo = page.locator('img[alt*="UniLicungo"]');
    await expect(logo).toBeVisible();
    
    // Verificar que a imagem carregou
    const isImageLoaded = await logo.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalHeight > 0;
    });
    expect(isImageLoaded).toBe(true);
  });

  test('deve exibir nome do portal', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Portal de Cibersegurança UniLicungo')).toBeVisible();
  });

  test('deve ter footer com informações corretas', async ({ page }) => {
    await page.goto('/');
    
    const currentYear = new Date().getFullYear();
    await expect(page.locator(`text=© ${currentYear} Universidade Licungo`)).toBeVisible();
  });

  test('deve ser responsivo em mobile', async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verificar que elementos principais ainda são visíveis
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // KPIs devem empilhar verticalmente
    const kpis = page.locator('[data-testid="kpi-card"]');
    const firstKpi = kpis.first();
    
    if (await firstKpi.isVisible()) {
      const box = await firstKpi.boundingBox();
      expect(box?.width).toBeLessThan(400); // Deve caber na largura mobile
    }
  });
});
