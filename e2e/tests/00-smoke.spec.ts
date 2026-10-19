import { test, expect } from '../fixtures/test.fixture';

/**
 * Suite de Smoke Tests (Pruebas de Humo).
 * Objetivo: Validar la configuración del webServer, la inicialización del navegador
 * y la correcta inyección de dependencias mediante el fixture authenticatedPage.
 */
test.describe('Smoke Test & Infraestructura Playwright', () => {
  test('debe cargar la SPA TaskFlow y mostrar la pantalla de autenticación', async ({ page }) => {
    await page.goto('/');

    // Validar título de página
    await expect(page).toHaveTitle(/TaskFlow/i);

    // Validar visibilidad del título principal
    const title = page.getByRole('heading', { name: 'TaskFlow', level: 1 });
    await expect(title).toBeVisible();

    // Validar que los campos de entrada estén listos para interacción (Auto-waiting)
    await expect(page.getByLabel('Correo Electrónico')).toBeVisible();
    await expect(page.getByLabel('Contraseña')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();
  });

  test('el fixture authenticatedPage debe resolver la sesión e ingresar al Dashboard', async ({ authenticatedPage }) => {
    // El fixture se encarga de loguearse antes de llegar a este punto
    const greeting = authenticatedPage.getByRole('heading', { name: /Bienvenido, Administrador GDS/i });
    await expect(greeting).toBeVisible();

    // Validar presencia de controles del tablero
    await expect(authenticatedPage.getByRole('searchbox', { name: 'Buscar tareas' })).toBeVisible();
    await expect(authenticatedPage.getByRole('button', { name: 'Nueva Tarea' })).toBeVisible();
    await expect(authenticatedPage.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  });
});
