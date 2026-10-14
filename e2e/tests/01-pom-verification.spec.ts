import { test, expect } from '../fixtures/test.fixture';

/**
 * Suite de Verificación de la Arquitectura Page Object Model (POM).
 * Demuestra:
 * 1. Inyección de LoginPage y DashboardPage como fixtures.
 * 2. Ausencia total de selectores CSS/XPath dispersos en el test.
 * 3. Composición limpia entre DashboardPage y TaskModalComponent.
 */
test.describe('Page Object Model (POM) — Verificación Arquitectónica', () => {
  test('LoginPage: debe autenticar mediante métodos de alto nivel del Page Object', async ({ loginPage, page }) => {
    await loginPage.goto();

    // Intentar login con credenciales erróneas
    await loginPage.login('invalido@test.com', 'wrongpassword');
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText(/Credenciales inválidas/i);

    // Login exitoso mediante Page Object
    await loginPage.login('admin@taskflow.dev', 'password123');

    // Aserción semántica de cambio de vista
    await expect(page.getByRole('heading', { name: /Bienvenido, Administrador GDS/i })).toBeVisible();
  });

  test('DashboardPage & TaskModal: debe buscar, crear y eliminar tarea mediante POM', async ({ dashboardPage }) => {
    // 1. Verificar presencia de tarjetas de tareas
    await expect(dashboardPage.taskCards.first()).toBeVisible();

    // 2. Probar búsqueda mediante POM
    await dashboardPage.search('Playwright');
    await expect(dashboardPage.taskCards).toHaveCount(1);
    await expect(dashboardPage.getTaskCardByTitle('Configurar suite de Playwright')).toBeVisible();

    // Limpiar búsqueda
    await dashboardPage.clearSearch();

    // 3. Crear nueva tarea mediante composición con TaskModalComponent
    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    const taskTitle = `Tarea POM ${Date.now()}`;
    await modal.createTask({
      title: taskTitle,
      description: 'Verificando creación mediante Page Object Model.',
      priority: 'alta',
      assignee: 'Franco Esposito',
    });

    // Validar cierre de modal y feedback Toast
    await expect(modal.dialog).not.toBeVisible();
    await expect(dashboardPage.toastNotification).toBeVisible();

    // Validar que la nueva tarea existe en el tablero
    const newCard = dashboardPage.getTaskCardByTitle(taskTitle);
    await expect(newCard).toBeVisible();

    // 4. Eliminar la tarea recién creada mediante método del POM
    await dashboardPage.deleteTaskByTitle(taskTitle);
    await expect(newCard).not.toBeVisible();
  });
});
