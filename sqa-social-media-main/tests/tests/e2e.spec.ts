import { test, expect } from '@playwright/test';

const CLIENT_URL = 'http://localhost:3000';
const emailUnico = `e2e_${Date.now()}@teste.com`;

test.describe.serial('Testes E2E - Fluxos de Usuário', () => {

  test('Deve realizar o fluxo completo de Cadastro com sucesso', async ({ page }) => {
    await page.goto(CLIENT_URL);
    
    await page.getByText('Criar Conta').first().click();

    await page.fill('input[placeholder="seu@email.com"]', emailUnico);
    await page.locator('input[type="password"]').nth(0).fill('Senha@123');
    await page.locator('input[type="password"]').nth(1).fill('Senha@123');

    await page.locator('button:has-text("Criar Conta")').last().click();

    await page.waitForURL(CLIENT_URL + '/');
    expect(page.url()).toBe(CLIENT_URL + '/');
  });

  test('Deve realizar o fluxo completo de Login', async ({ page }) => {
    await page.goto(CLIENT_URL);

    await page.getByText('Entrar').first().click();

    await page.fill('input[placeholder="seu@email.com"]', emailUnico);
    await page.locator('input[type="password"]').first().fill('Senha@123');

    await page.locator('button:has-text("Entrar")').last().click();

    await expect(page.locator('button:has-text("Sair")')).toBeVisible();
  });

});