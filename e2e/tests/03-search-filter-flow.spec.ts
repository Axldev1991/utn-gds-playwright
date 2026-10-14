import { test, expect } from '../fixtures/test.fixture';

/**
 * Flujo Funcional 2: Búsqueda Reactiva con Debounce y Filtrado por Estado.
 * Demuestra:
 * - Capacidad de Playwright para sincronizarse con renderizados asincrónicos del DOM.
 * - Validación de mutaciones en tiempo real sin recarga de página (arquitectura SPA).
 * - Manejo de estados vacíos (Empty States) accesibles.
 */
test.describe('Flujo 2: Búsqueda y Filtrado Asincrónico de Tareas', () => {
  test('2.1 Filtrado reactivo por texto sincroniza tras el debounce de 300ms', async ({ dashboardPage }) => {
    // Verificar estado inicial con todas las tareas semilla
    await expect(dashboardPage.taskCards).toHaveCount(4);

    // Escribir término de búsqueda
    await dashboardPage.search('Playwright');

    // Playwright auto-espera a que el debounce termine y el DOM mute
    await expect(dashboardPage.taskCards).toHaveCount(1);
    await expect(dashboardPage.getTaskCardByTitle('Configurar suite de Playwright')).toBeVisible();

    // Validar actualización reactiva del contador
    await expect(dashboardPage.taskCounter).toContainText('Mostrando: 1 tarea');

    // Limpiar búsqueda y validar restauración de la lista completa
    await dashboardPage.clearSearch();
    await expect(dashboardPage.taskCards).toHaveCount(4);
    await expect(dashboardPage.taskCounter).toContainText('Mostrando: 4 tareas');
  });

  test('2.2 Filtrado por estado de sprint actualiza las tarjetas en el tablero', async ({ dashboardPage }) => {
    // Filtrar por tareas completadas
    await dashboardPage.filterByStatus('completed');

    // Validar que se muestren únicamente las 2 tareas completadas iniciales
    await expect(dashboardPage.taskCards).toHaveCount(2);

    // Validar que ninguna tarjeta en backlog o en progreso esté visible
    await expect(dashboardPage.getTaskCardByTitle('Implementar Page Object Model')).not.toBeVisible();
    await expect(dashboardPage.getTaskCardByTitle('Demostración de Trace Viewer y Video')).not.toBeVisible();

    // Cambiar filtro a "En Progreso"
    await dashboardPage.filterByStatus('in_progress');
    await expect(dashboardPage.taskCards).toHaveCount(1);
    await expect(dashboardPage.getTaskCardByTitle('Implementar Page Object Model')).toBeVisible();

    // Restaurar a todos los estados
    await dashboardPage.filterByStatus('all');
    await expect(dashboardPage.taskCards).toHaveCount(4);
  });

  test('2.3 Búsqueda sin coincidencias renderiza el contenedor accesible de Empty State', async ({ dashboardPage }) => {
    // Buscar un término que no existe en el sprint
    await dashboardPage.search('TERMINO-INEXISTENTE-XYZ');

    // Validar que no hay tarjetas en el DOM
    await expect(dashboardPage.taskCards).toHaveCount(0);

    // Validar presencia del estado vacío accesible con su mensaje explicativo
    await expect(dashboardPage.emptyState).toBeVisible();
    await expect(dashboardPage.emptyState).toContainText(/No se encontraron tareas coincidentes/i);

    // Validar contador en 0
    await expect(dashboardPage.taskCounter).toContainText('Mostrando: 0 tareas');
  });
});
