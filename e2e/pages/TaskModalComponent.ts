import type { Page, Locator } from '@playwright/test';

export interface TaskFormData {
  title: string;
  description?: string;
  priority?: 'baja' | 'media' | 'alta';
  assignee: string;
}

/**
 * TaskModalComponent: Component Object Model que encapsula el diálogo modal
 * de creación de tareas. Demuestra el principio de composición sobre herencia.
 */
export class TaskModalComponent {
  readonly page: Page;
  readonly dialog: Locator;
  readonly titleInput: Locator;
  readonly descInput: Locator;
  readonly prioritySelect: Locator;
  readonly assigneeInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly validationAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.titleInput = this.dialog.getByLabel('Título', { exact: true });
    this.descInput = this.dialog.getByLabel('Descripción', { exact: true });
    this.prioritySelect = this.dialog.getByLabel('Prioridad', { exact: true });
    this.assigneeInput = this.dialog.getByLabel('Asignado', { exact: true });
    this.saveButton = this.dialog.getByRole('button', { name: 'Guardar Tarea' });
    this.cancelButton = this.dialog.getByRole('button', { name: 'Cancelar' });
    this.closeButton = this.dialog.getByRole('button', { name: 'Cerrar modal' });
    this.validationAlert = this.dialog.getByRole('alert');
  }

  /**
   * Completa el formulario y envía la creación de la tarea.
   */
  async createTask(data: TaskFormData): Promise<void> {
    await this.titleInput.fill(data.title);
    if (data.description) {
      await this.descInput.fill(data.description);
    }
    if (data.priority) {
      await this.prioritySelect.selectOption(data.priority);
    }
    await this.assigneeInput.fill(data.assignee);
    await this.saveButton.scrollIntoViewIfNeeded();
    await this.saveButton.click({ force: true });
  }

  /**
   * Cancela la creación y cierra el modal.
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
