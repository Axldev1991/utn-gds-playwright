import { test, expect } from '../fixtures/test.fixture';

test.describe('Demostración de QA Adaptativo: Resiliencia de Locators Semánticos (Accessibility Tree)', () => {
  test('5.2.A Locators semánticos operan exitosamente en UI v1 Estándar', async ({ dashboardPage }) => {
    // 1. Asegurar interfaz v1 y tarjetas cargadas
    await dashboardPage.page.getByRole('button', { name: /v1 \(Estándar\)/i }).click();
    await expect(dashboardPage.taskCards.first()).toBeVisible();

    // 2. Filtrar tareas usando locator semántico accesible
    await dashboardPage.search('Playwright');
    await expect(dashboardPage.taskCards).toHaveCount(1);
    await expect(dashboardPage.getTaskCardByTitle('Configurar suite de Playwright')).toBeVisible();

    // 3. Limpiar filtro y abrir modal mediante getByRole
    await dashboardPage.clearSearch();
    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    // 4. Cancelar y cerrar
    await modal.cancel();
    await expect(modal.dialog).not.toBeVisible();
  });

  test('5.2.B Locators semánticos SOBREVIVEN a la mutación en UI v2 sin alterar el código de prueba', async ({ dashboardPage }) => {
    // 1. Mutar interfaz a UI v2 y esperar carga
    await dashboardPage.page.getByRole('button', { name: /v2 \(Rediseño Alterado\)/i }).click();
    await expect(dashboardPage.taskCards.first()).toBeVisible();

    // 2. Ejecutar exactamente las mismas operaciones de negocio:
    // A pesar de que los IDs y clases cambiaron completamente en v2,
    // el Árbol de Accesibilidad (Accessibility Tree) preserva los roles 'searchbox', 'article' y 'button'.
    await dashboardPage.search('Playwright');
    await expect(dashboardPage.taskCards).toHaveCount(1);
    await expect(dashboardPage.getTaskCardByTitle('Configurar suite de Playwright')).toBeVisible();

    // 3. Crear una nueva tarea en UI v2 mediante Page Object y locators semánticos
    await dashboardPage.clearSearch();
    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    await modal.createTask({
      title: 'Tarea creada en UI v2 Mutada',
      description: 'Demostración de resiliencia semántica en Playwright.',
      priority: 'alta',
      assignee: 'Axel Castellano',
    });

    // 4. Validar que la tarea fue creada y es accesible en el tablero mutado
    await expect(dashboardPage.toastNotification).toBeVisible();
    await expect(dashboardPage.getTaskCardByTitle('Tarea creada en UI v2 Mutada')).toBeVisible();

    // Conclusión pedagógica: Las pruebas orientadas a accesibilidad no sufren 'flakiness'
    // ante rediseños visuales o refactorizaciones de clases CSS.
  });
});
