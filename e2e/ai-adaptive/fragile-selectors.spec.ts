import { test, expect } from '../fixtures/test.fixture';

test.describe('Demostración de QA: Fragilidad de Selectores Tradicionales (CSS / IDs)', () => {
  test('5.1.A Los selectores rígidos funcionan en UI v1 estándar', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // Asegurar que estamos en v1
    await page.getByRole('button', { name: /v1 \(Estándar\)/i }).click();

    // 1. Uso de IDs y clases rígidas tradicionales (antipatrón acoplado a implementación)
    const searchInput = page.locator('#input-search-tasks');
    const createTaskBtn = page.locator('#btn-create-task');
    const taskCards = page.locator('.task-card');

    // Validar que en v1 los elementos existen con estos identificadores específicos
    await expect(searchInput).toBeVisible();
    await expect(createTaskBtn).toBeVisible();
    await expect(taskCards.first()).toBeVisible();

    // Interacción mediante selector CSS rígido
    await searchInput.fill('Playwright');
    await expect(taskCards).toHaveCount(1);
    await expect(page.locator('.task-card .task-title')).toContainText('Playwright');
  });

  test('5.1.B Los selectores rígidos COLAPSAN cuando el DOM muta a UI v2', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // Mutamos la interfaz a UI v2 (simulando un refactor o rediseño de frontend)
    await page.getByRole('button', { name: /v2 \(Rediseño Alterado\)/i }).click();

    // 1. El selector rígido '#btn-create-task' ya NO existe en v2 (ahora es #act_btn_new_item_99f)
    const obsoleteCreateBtn = page.locator('#btn-create-task');
    
    // Verificamos que falla con TimeoutError si intentamos interactuar con él
    await expect(async () => {
      await obsoleteCreateBtn.click({ timeout: 1500 });
    }).rejects.toThrow(/Timeout 1500ms exceeded/);

    // 2. La clase CSS rígida '.task-card' ya NO existe en v2 (mutó a .task-item-mutated-layout)
    const obsoleteCards = page.locator('.task-card');
    await expect(obsoleteCards).toHaveCount(0);

    // 3. El campo de búsqueda '#input-search-tasks' tampoco existe (mutó a #fld_query_hash_41a)
    const obsoleteSearch = page.locator('#input-search-tasks');
    await expect(obsoleteSearch).not.toBeAttached();

    // Conclusión pedagógica: La funcionalidad está 100% operativa para el usuario real,
    // pero la prueba automatizada tradicional se rompió por estar acoplada a detalles internos de implementación.
  });
});
