import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage: Page Object Model para la pantalla de inicio de sesión.
 * Utiliza selectores orientados a accesibilidad (Role y Label)
 * para garantizar robustez y cumplir con las mejores prácticas de Playwright.
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly autofillButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Correo Electrónico');
    this.passwordInput = page.getByLabel('Contraseña');
    this.submitButton = page.getByRole('button', { name: /Iniciar Sesión/i });
    this.autofillButton = page.getByRole('button', { name: /Autocompletar credenciales/i });
    this.errorAlert = page.getByRole('alert');
  }

  /**
   * Navega a la ruta principal de la aplicación.
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Completa credenciales y ejecuta el envío del formulario.
   */
  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }

  /**
   * Utiliza el asistente de autocompletado y envía el formulario.
   */
  async autofillAndSubmit(): Promise<void> {
    await this.autofillButton.click();
    await this.submitButton.click();
  }

  /**
   * Retorna el texto del mensaje de error accesible.
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorAlert.textContent()) || '';
  }
}
