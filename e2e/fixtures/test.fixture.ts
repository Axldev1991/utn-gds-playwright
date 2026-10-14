import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages';

/**
 * Definición de tipos para los fixtures personalizados de TaskFlow.
 * Aplica Inversión de Dependencias (DIP) y Page Object Model:
 * las páginas se inyectan automáticamente en los tests sin instanciación repetitiva.
 */
export interface CustomFixtures {
  /** Page Object de la pantalla de Login */
  loginPage: LoginPage;

  /** Page Object del Dashboard con sesión ya iniciada */
  dashboardPage: DashboardPage;

  /** Página con sesión iniciada en el Dashboard */
  authenticatedPage: Page;

  /** Página con almacenamiento local limpio */
  cleanPage: Page;
}

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const isAlreadyLoggedIn = await page.getByRole('button', { name: 'Cerrar Sesión' }).isVisible().catch(() => false);
    if (!isAlreadyLoggedIn) {
      await loginPage.login('admin@taskflow.dev', 'password123');
      await expect(page.getByRole('heading', { name: /Bienvenido,/i })).toBeVisible({ timeout: 10_000 });
    }

    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  cleanPage: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await use(page);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const isAlreadyLoggedIn = await page.getByRole('button', { name: 'Cerrar Sesión' }).isVisible().catch(() => false);
    if (!isAlreadyLoggedIn) {
      await loginPage.login('admin@taskflow.dev', 'password123');
      await expect(page.getByRole('heading', { name: /Bienvenido,/i })).toBeVisible({ timeout: 10_000 });
    }

    await use(page);
  },
});

export { expect };

