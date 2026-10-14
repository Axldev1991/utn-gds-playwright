import { test as base, expect, type Page } from '@playwright/test';

/**
 * Definición de tipos para los fixtures personalizados de TaskFlow.
 * Aplica el principio de Inversión de Dependencias (DIP) y SRP:
 * la configuración del estado de prueba no contamina la lógica del test.
 */
export interface CustomFixtures {
  /**
   * Fixture que entrega una página con sesión iniciada y ubicada en el Dashboard.
   * Encapsula el flujo de login y evita repetir credenciales en cada test.
   */
  authenticatedPage: Page;

  /**
   * Fixture que garantiza un almacenamiento local completamente limpio.
   */
  cleanPage: Page;
}

export const test = base.extend<CustomFixtures>({
  cleanPage: async ({ page }, use) => {
    // Navegar y limpiar almacenamiento para aislamiento absoluto
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await use(page);
  },

  authenticatedPage: async ({ page }, use) => {
    // 1. Navegar a la página de login
    await page.goto('/');

    // 2. Si ya está autenticado (por sesión previa), no repite el login
    const isAlreadyLoggedIn = await page.getByRole('button', { name: 'Cerrar Sesión' }).isVisible().catch(() => false);

    if (!isAlreadyLoggedIn) {
      // Localizar inputs mediante semántica accesible (getByLabel / getByRole)
      await page.getByLabel('Correo Electrónico').fill('admin@taskflow.dev');
      await page.getByLabel('Contraseña').fill('password123');

      // Enviar formulario
      await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

      // Espera determinista (auto-waiting de Playwright) a que aparezca el dashboard
      await expect(page.getByRole('heading', { name: /Bienvenido,/i })).toBeVisible({
        timeout: 10_000,
      });
    }

    // 3. Ceder la página ya autenticada al test que consuma el fixture
    await use(page);

    // 4. Teardown opcional: se ejecuta automáticamente tras finalizar el test
  },
});

export { expect };
