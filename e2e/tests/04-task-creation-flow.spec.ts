import { test, expect } from '../fixtures/test.fixture';

/**
 * Flujo Funcional 3: Alta de Tareas con Modal, Validaciones y Feedback Efímero.
 * Demuestra:
 * - Interacción con componentes modales y elementos superpuestos (dialog).
 * - Detección y aserción de notificaciones efímeras (Toasts con auto-dismiss).
 * - Manejo de validaciones accesibles en formularios antes del envío.
 */
test.describe('Flujo 3: Alta y Gestión de Tareas con Modal', () => {
  test('3.1 Creación exitosa de tarea muestra Toast y la prepende al tablero', async ({ dashboardPage }) => {
    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    const uniqueTitle = `Tarea Automatizada ${Date.now()}`;
    const taskDescription = 'Validación completa de creación mediante suite Playwright.';

    // Completar el formulario a través del Component Object Model
    await modal.createTask({
      title: uniqueTitle,
      description: taskDescription,
      priority: 'alta',
      assignee: 'Axel Castellano',
    });

    // 1. Validar que el modal se cerró
    await expect(modal.dialog).not.toBeVisible();

    // 2. Validar notificación Toast accesible con mensaje de confirmación
    await expect(dashboardPage.toastNotification).toBeVisible();
    await expect(dashboardPage.toastNotification).toContainText(uniqueTitle);

    // 3. Validar que la nueva tarjeta aparece en el tablero
    const createdCard = dashboardPage.getTaskCardByTitle(uniqueTitle);
    await expect(createdCard).toBeVisible();
    await expect(createdCard.getByRole('status', { name: /Prioridad: alta/i })).toBeVisible();
    await expect(createdCard.getByText(/Axel Castellano/i)).toBeVisible();

    // 4. Limpieza: Eliminar la tarea creada para dejar el estado limpio
    await dashboardPage.deleteTaskByTitle(uniqueTitle);
    await expect(createdCard).not.toBeVisible();
  });

  test('3.2 Validación de formulario previene el envío cuando falta el título', async ({ dashboardPage }) => {
    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    // Intentar guardar con título en blanco pero completando asignado
    await modal.assigneeInput.fill('Franco Esposito');
    await modal.saveButton.click({ force: true });

    // Validar que el modal permanece visible
    await expect(modal.dialog).toBeVisible();

    // Validar mensaje de error accesible (role="alert")
    await expect(modal.validationAlert).toBeVisible();
    await expect(modal.validationAlert).toContainText(/El título de la tarea es obligatorio/i);

    // Cancelar y cerrar modal
    await modal.cancel();
    await expect(modal.dialog).not.toBeVisible();
  });

  test('3.3 Cancelación del modal descarta los cambios sin mutar el tablero', async ({ dashboardPage }) => {
    // Asegurar que las tareas iniciales estén cargadas
    await expect(dashboardPage.taskCards.first()).toBeVisible();
    const initialCount = await dashboardPage.taskCards.count();

    const modal = await dashboardPage.openNewTaskModal();
    await expect(modal.dialog).toBeVisible();

    // Escribir datos pero cancelar
    await modal.titleInput.fill('Tarea que no debe guardarse');
    await modal.cancel();

    // Validar que el modal se cerró
    await expect(modal.dialog).not.toBeVisible();

    // Validar que la tarea no fue creada y el conteo no mutó
    await expect(dashboardPage.taskCards).toHaveCount(initialCount);
    await expect(dashboardPage.getTaskCardByTitle('Tarea que no debe guardarse')).not.toBeVisible();
  });
});
