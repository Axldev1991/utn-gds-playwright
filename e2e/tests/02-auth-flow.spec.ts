import { test, expect } from '../fixtures/test.fixture';

/**
 * Flujo Funcional 1: Autenticación, Control de Sesión y Auto-waiting.
 * Demuestra:
 * - Manejo de estados asincrónicos (spinner durante petición de red).
 * - Sincronización determinista sin pausas artificiales (Auto-waiting de Playwright).
 * - Persistencia y destrucción de sesión (Login & Logout).
 */
test.describe('Flujo 1: Autenticación y Control de Sesión', () => {
  test('1.1 Login Exitoso con credenciales válidas y transición fluida al Dashboard', async ({ loginPage, page }) => {
    await loginPage.goto();

    // Completar credenciales válidas
    await loginPage.login('admin@taskflow.dev', 'password123');

    // Auto-waiting determinista: Playwright espera automáticamente a que la SPA
    // procese la latencia de 600ms y renderice el encabezado de bienvenida
    const greeting = page.getByRole('heading', { name: /Bienvenido, Administrador GDS/i });
    await expect(greeting).toBeVisible();

    // Validar presencia del botón de cerrar sesión
    await expect(page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  });

  test('1.2 Intento de Login con credenciales inválidas muestra alerta accesible', async ({ loginPage }) => {
    await loginPage.goto();

    // Intentar ingresar con credenciales erróneas
    await loginPage.login('usuario_inexistente@gds.utn.edu.ar', 'claveIncorrecta999');

    // Validar mensaje de error accesible (role="alert")
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText(/Credenciales inválidas/i);

    // Validar que el botón de inicio de sesión vuelve a estar habilitado para reintentar
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test('1.3 Logout exitoso destruye la sesión y retorna a la pantalla de Login', async ({ dashboardPage, page }) => {
    // El fixture dashboardPage provee la sesión ya iniciada
    await expect(dashboardPage.greetingHeading).toBeVisible();

    // Ejecutar Logout mediante el Page Object
    await dashboardPage.logout();

    // Validar redirección a pantalla de login
    await expect(page.getByRole('heading', { name: 'TaskFlow', level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: /Iniciar Sesión/i })).toBeVisible();

    // Validar que el botón de cerrar sesión ya no existe en el DOM
    await expect(page.getByRole('button', { name: 'Cerrar Sesión' })).not.toBeVisible();
  });
});
