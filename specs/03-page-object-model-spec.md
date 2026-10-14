# SDD Spec — Fase 3: Page Object Model (POM) Architecture

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 3 de 6  
> **Estado:** Aprobada para Implementación  
> **Área:** Patrón de Diseño Page Object Model & Desacoplamiento de Pruebas  

---

## 1. Objetivo y Alcance
Implementar la capa de **Page Object Model (POM)** para la aplicación TaskFlow bajo el **Principio de Responsabilidad Única (SRP)**. El objetivo es:
- Desacoplar por completo los tests de los selectores del DOM.
- Utilizar **selectores de accesibilidad semánticos** recomendados por Playwright (`getByRole`, `getByLabel`, `getByPlaceholder`) en lugar de IDs o clases CSS rígidas.
- Proveer métodos de acción semánticos de alto nivel para los flujos de autenticación, filtrado de tareas y creación modal.

---

## 2. Diagrama de Clases del POM

```
               +----------------------------------+
               |             BasePage             |
               +----------------------------------+
               | - page: Page                     |
               | - navbarBrand: Locator           |
               | - toastNotification: Locator     |
               | - logoutButton: Locator          |
               | - v1VersionButton: Locator       |
               | - v2VersionButton: Locator       |
               +----------------------------------+
               | + toggleUIVersion(version)       |
               | + logout()                       |
               | + waitForToast()                 |
               +----------------------------------+
                               ^
                               | (hereda)
        +----------------------+----------------------+
        |                                             |
+------------------------------+     +-------------------------------+
|          LoginPage           |     |         DashboardPage         |
+------------------------------+     +-------------------------------+
| - emailInput: Locator        |     | - greetingHeading: Locator    |
| - passwordInput: Locator     |     | - searchInput: Locator        |
| - submitButton: Locator      |     | - statusSelect: Locator       |
| - autofillButton: Locator    |     | - taskCounter: Locator        |
| - errorAlert: Locator        |     | - newTaskButton: Locator      |
+------------------------------+     | - taskCards: Locator          |
| + goto()                     |     | - emptyState: Locator         |
| + login(email, pass)         |     | - modal: TaskModalComponent   |
| + autofillDemoCredentials()  |     +-------------------------------+
| + getErrorMessage()          |     | + goto()                      |
+------------------------------+     | + search(query)               |
                                     | + filterByStatus(status)      |
                                     | + openNewTaskModal()          |
                                     | + deleteTaskByTitle(title)    |
                                     +-------------------------------+
                                                     | (compone)
                                                     v
                                     +-------------------------------+
                                     |      TaskModalComponent       |
                                     +-------------------------------+
                                     | - dialog: Locator             |
                                     | - titleInput: Locator         |
                                     | - descInput: Locator          |
                                     | - prioritySelect: Locator     |
                                     | - assigneeInput: Locator      |
                                     | - saveButton: Locator         |
                                     | - cancelButton: Locator       |
                                     | - validationAlert: Locator    |
                                     +-------------------------------+
                                     | + fillAndSave(taskData)       |
                                     | + cancel()                    |
                                     +-------------------------------+
```

---

## 3. Especificación de Contratos

### 3.1. `BasePage.ts` (`e2e/pages/BasePage.ts`)
Encapsula elementos comunes de navegación y feedback presentes en toda la aplicación:
- `toastNotification`: `page.getByRole('status')`.
- `logoutButton`: `page.getByRole('button', { name: 'Cerrar Sesión' })`.
- `v1Button` / `v2Button`: botones del switch de interfaz en el navbar.
- Métodos:
  - `toggleUIVersion(version: 'v1' | 'v2'): Promise<void>`
  - `logout(): Promise<void>`
  - `getToastMessage(): Promise<string>`

### 3.2. `LoginPage.ts` (`e2e/pages/LoginPage.ts`)
Encapsula la vista de autenticación:
- `emailInput`: `page.getByLabel('Correo Electrónico')`.
- `passwordInput`: `page.getByLabel('Contraseña')`.
- `submitButton`: `page.getByRole('button', { name: /Iniciar Sesión/i })`.
- `autofillButton`: `page.getByRole('button', { name: /Autocompletar credenciales/i })`.
- `errorAlert`: `page.getByRole('alert')`.
- Métodos:
  - `goto(): Promise<void>`
  - `login(email: string, pass: string): Promise<void>`
  - `autofillAndSubmit(): Promise<void>`

### 3.3. `DashboardPage.ts` (`e2e/pages/DashboardPage.ts`)
Encapsula el tablero de control de sprint:
- `greetingHeading`: `page.getByRole('heading', { name: /Bienvenido,/i })`.
- `searchInput`: `page.getByRole('searchbox', { name: 'Buscar tareas' })`.
- `statusSelect`: `page.getByRole('combobox', { name: 'Filtrar por estado' })`.
- `taskCounter`: `page.getByRole('status').filter({ hasText: /Mostrando:/i })`.
- `newTaskButton`: `page.getByRole('button', { name: 'Nueva Tarea' })`.
- `taskCards`: `page.getByRole('article')`.
- `taskModal`: Instancia de `TaskModalComponent`.
- Métodos:
  - `searchTasks(term: string): Promise<void>`
  - `filterByStatus(status: string): Promise<void>`
  - `openNewTaskModal(): Promise<TaskModalComponent>`
  - `getTaskCardByTitle(title: string): Locator`
  - `deleteTaskByTitle(title: string): Promise<void>`

### 3.4. `TaskModalComponent.ts` (`e2e/pages/TaskModalComponent.ts`)
Encapsula el modal accesible de alta de tarea:
- `dialog`: `page.getByRole('dialog')`.
- `titleInput`: `page.getByLabel('Título')`.
- `descInput`: `page.getByLabel('Descripción')`.
- `prioritySelect`: `page.getByLabel('Prioridad')`.
- `assigneeInput`: `page.getByLabel('Asignado')`.
- `saveButton`: `page.getByRole('button', { name: 'Guardar Tarea' })`.
- `cancelButton`: `page.getByRole('button', { name: 'Cancelar' })`.
- Métodos:
  - `createTask(data: { title: string; desc?: string; priority?: string; assignee: string }): Promise<void>`

---

## 4. Criterios de Aceptación y Verificación

- [ ] **CA-1:** Todos los Page Objects son clases tipadas en TypeScript sin selectores CSS/XPath frágiles.
- [ ] **CA-2:** La composición de componentes (Dashboard compuesto con TaskModal) se respeta limpiamente.
- [ ] **CA-3:** Las aserciones de negocio se delegan a los tests; los Page Objects solo exponen locators y acciones.
- [ ] **CA-4:** Un test de integración del POM verifica que los 3 flujos pueden ejecutarse a través de las clases Page Object sin errores.
