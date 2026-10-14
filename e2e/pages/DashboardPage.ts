import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TaskModalComponent } from './TaskModalComponent';

/**
 * DashboardPage: Page Object Model para el tablero de sprint.
 * Compone el componente TaskModalComponent y expone métodos de alto nivel
 * para interactuar con la lista de tareas, filtros y métricas.
 */
export class DashboardPage extends BasePage {
  readonly greetingHeading: Locator;
  readonly searchInput: Locator;
  readonly statusSelect: Locator;
  readonly taskCounter: Locator;
  readonly newTaskButton: Locator;
  readonly taskCards: Locator;
  readonly emptyState: Locator;
  readonly taskModal: TaskModalComponent;

  constructor(page: Page) {
    super(page);
    this.greetingHeading = page.getByRole('heading', { name: /Bienvenido,/i });
    this.searchInput = page.getByRole('searchbox', { name: 'Buscar tareas' });
    this.statusSelect = page.getByRole('combobox', { name: 'Filtrar por estado' });
    this.taskCounter = page.getByRole('status').filter({ hasText: /Mostrando:/i });
    this.newTaskButton = page.getByRole('button', { name: 'Nueva Tarea' });
    this.taskCards = page.getByRole('article');
    this.emptyState = page.getByRole('status').filter({ hasText: /No se encontraron tareas/i });
    this.taskModal = new TaskModalComponent(page);
  }

  /**
   * Navega a la ruta principal.
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Ejecuta una búsqueda de tareas por texto.
   */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  /**
   * Limpia el campo de búsqueda.
   */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  /**
   * Aplica un filtro por estado de sprint.
   */
  async filterByStatus(status: 'all' | 'backlog' | 'in_progress' | 'completed'): Promise<void> {
    await this.statusSelect.selectOption(status);
  }

  /**
   * Abre el modal de creación y lo retorna listo para interactuar.
   */
  async openNewTaskModal(): Promise<TaskModalComponent> {
    await this.newTaskButton.click();
    return this.taskModal;
  }

  /**
   * Retorna el Locator de una tarjeta de tarea específica por su título.
   */
  getTaskCardByTitle(title: string): Locator {
    return this.taskCards.filter({ hasText: title });
  }

  /**
   * Localiza y pulsa el botón de eliminación de una tarea por su título.
   */
  async deleteTaskByTitle(title: string): Promise<void> {
    const card = this.getTaskCardByTitle(title);
    const deleteBtn = card.getByRole('button', { name: new RegExp(`Eliminar tarea: ${title}`, 'i') });
    await deleteBtn.click();
  }
}
