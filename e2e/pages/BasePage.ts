import type { Page, Locator } from '@playwright/test';

/**
 * BasePage: Clase base abstracta para todos los Page Objects.
 * Encapsula la instancia del Page de Playwright y elementos comunes
 * como el navbar, notificaciones Toast y controles globales.
 */
export class BasePage {
  readonly page: Page;
  readonly navbarBrand: Locator;
  readonly toastNotification: Locator;
  readonly logoutButton: Locator;
  readonly v1VersionButton: Locator;
  readonly v2VersionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbarBrand = page.getByRole('heading', { name: 'TaskFlow', level: 1 });
    this.toastNotification = page.getByRole('status', { name: 'Notificación del sistema' });
    this.logoutButton = page.getByRole('button', { name: 'Cerrar Sesión' });
    this.v1VersionButton = page.getByRole('button', { name: /v1 \(Estándar\)/i });
    this.v2VersionButton = page.getByRole('button', { name: /v2 \(Rediseño Alterado\)/i });
  }

  /**
   * Cambia la versión de la interfaz para demostración de QA Adaptativo.
   */
  async toggleUIVersion(version: 'v1' | 'v2'): Promise<void> {
    if (version === 'v1') {
      await this.v1VersionButton.click();
    } else {
      await this.v2VersionButton.click();
    }
  }

  /**
   * Cierra la sesión activa.
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
