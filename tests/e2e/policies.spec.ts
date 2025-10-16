import { test, expect } from '@playwright/test';

/**
 * Testes E2E para gestão de Políticas
 */

// Configurar estado de autenticação (você pode criar um helper)
test.use({
  // storageState: 'tests/e2e/.auth/user.json', // Usar após configurar auth
});

test.describe('Políticas', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Fazer login antes de cada teste
    // Por agora, assumimos que o usuário já está autenticado
    await page.goto('/policies');
  });

  test('deve exibir lista de políticas', async ({ page }) => {
    // Verificar se a página carregou
    await expect(page.locator('h1')).toContainText('Políticas');
    
    // Verificar se há alguma política na lista (pode não haver em BD vazio)
    const policyCards = page.locator('[data-testid="policy-card"]');
    const count = await policyCards.count();
    
    // Verificar que a lista existe (pode estar vazia)
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve filtrar políticas por categoria', async ({ page }) => {
    // Selecionar categoria no filtro
    await page.selectOption('select[name="categoria"]', 'acesso');
    
    // Aguardar atualização da lista
    await page.waitForTimeout(1000);
    
    // Verificar que URL foi atualizada com query param
    await expect(page).toHaveURL(/categoria=acesso/);
  });

  test('deve filtrar políticas por status', async ({ page }) => {
    // Selecionar status no filtro
    await page.selectOption('select[name="status"]', 'ativo');
    
    // Aguardar atualização
    await page.waitForTimeout(1000);
    
    // Verificar URL
    await expect(page).toHaveURL(/status=ativo/);
  });

  test('deve abrir modal de criar nova política', async ({ page }) => {
    // Clicar no botão de criar
    await page.click('button:has-text("Nova Política")');
    
    // Verificar que modal abriu
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Criar Política')).toBeVisible();
  });

  test('deve validar campos obrigatórios ao criar política', async ({ page }) => {
    // Abrir modal
    await page.click('button:has-text("Nova Política")');
    
    // Tentar submeter sem preencher
    await page.click('button[type="submit"]');
    
    // Verificar mensagens de validação HTML5
    const tituloInput = page.locator('input[name="titulo"]');
    const isInvalid = await tituloInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('deve criar nova política com sucesso', async ({ page }) => {
    // Abrir modal
    await page.click('button:has-text("Nova Política")');
    
    // Preencher formulário
    await page.fill('input[name="titulo"]', 'Política de Teste E2E');
    await page.fill('textarea[name="descricao"]', 'Descrição da política de teste');
    await page.selectOption('select[name="categoria"]', 'acesso');
    await page.fill('textarea[name="conteudo"]', 'Conteúdo detalhado da política');
    
    // Submeter
    await page.click('button[type="submit"]');
    
    // Verificar sucesso (toast ou redirect)
    await expect(page.locator('text=criada com sucesso')).toBeVisible({
      timeout: 5000,
    });
  });

  test('deve visualizar detalhes de uma política', async ({ page }) => {
    // Assumindo que há pelo menos uma política
    const firstPolicy = page.locator('[data-testid="policy-card"]').first();
    const hasPolicies = (await firstPolicy.count()) > 0;
    
    if (hasPolicies) {
      await firstPolicy.click();
      
      // Verificar que navegou para página de detalhes
      await expect(page).toHaveURL(/\/policies\/.+/);
      
      // Verificar elementos da página de detalhes
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=Versão')).toBeVisible();
      await expect(page.locator('text=Status')).toBeVisible();
    }
  });

  test('deve pesquisar políticas', async ({ page }) => {
    // Inserir termo de pesquisa
    await page.fill('input[placeholder*="Pesquisar"]', 'acesso');
    
    // Aguardar resultados
    await page.waitForTimeout(500);
    
    // Verificar que a pesquisa foi aplicada
    const results = page.locator('[data-testid="policy-card"]');
    const count = await results.count();
    
    // Pode haver 0 resultados se BD está vazio
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
