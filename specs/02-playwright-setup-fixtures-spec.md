# SDD Spec — Fase 2: Configuración de Playwright, Navegadores y Fixtures

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 2 de 6  
> **Estado:** Aprobada para Implementación  
> **Área:** Infraestructura de Testing E2E, Observabilidad y Patrón de Fixtures  

---

## 1. Objetivo y Alcance
Configurar el entorno integral de pruebas automatizadas con **Playwright** en la raíz del proyecto, garantizando:
- Soporte para ejecución *cross-browser* (Chromium, Firefox, WebKit) y emulación móvil.
- Orquestación automática del servidor de desarrollo de la SPA (`webServer`).
- Políticas de observabilidad forense (**Trace Viewer**, capturas de pantalla y videos en fallos).
- Implementación del patrón de **Fixtures** (Inyección de Dependencias) para desacoplar y reutilizar el estado de sesión autenticada.

---

## 2. Especificación de Configuración (`playwright.config.ts`)

### 2.1. Parámetros Globales
- **`testDir`**: `./e2e/tests` (directorio exclusivo para pruebas de comportamiento).
- **`timeout`**: `30_000` ms por test (límite determinista de auto-waiting).
- **`expect.timeout`**: `5_000` ms para aserciones reactivas de estado del DOM.
- **`fullyParallel`**: `true` (aprovecha la arquitectura multi-core y aislamiento de contextos).
- **`retries`**: `1` en entornos locales, `2` en CI.
- **`reporter`**:
  - `list`: salida concisa en terminal.
  - `html`: reporte gráfico interactivo con visor de trazas integrado (`outputFolder: 'playwright-report'`).

### 2.2. Políticas del Contexto (`use`)
- **`baseURL`**: `http://localhost:5173` (la SPA TaskFlow).
- **`trace`**: `'retain-on-failure'` (graba la ejecución y emite el archivo `trace.zip` únicamente ante fallos para inspección de viaje en el tiempo).
- **`screenshot`**: `'only-on-failure'`.
- **`video`**: `'retain-on-failure'`.

### 2.3. Matriz de Proyectos (`projects`)
1. **Desktop Chromium:** Motor Blink (Google Chrome / Edge), viewport 1280x720.
2. **Desktop Firefox:** Motor Gecko, viewport 1280x720.
3. **Desktop WebKit:** Motor WebKit (Safari), viewport 1280x720.
4. **Mobile Chrome:** Emulación de viewport móvil (Pixel 5 / 375x667).

### 2.4. Orquestación del Servidor (`webServer`)
- **`command`**: `npm run dev --prefix app`
- **`url`**: `http://localhost:5173`
- **`reuseExistingServer`**: `!process.env.CI` (si el servidor ya está corriendo localmente, se reutiliza para no demorar la ejecución).

---

## 3. Especificación de Fixtures (`e2e/fixtures/test.fixture.ts`)

En lugar de repetir el código de login y limpieza en cada archivo de prueba, aplicamos el patrón **Inyección de Dependencias** mediante la extensión de `test`:

```typescript
export interface CustomFixtures {
  // Fixture que entrega una página con sesión iniciada y en /dashboard
  authenticatedPage: Page;
  // Fixture que garantiza un localStorage limpio y semillas frescas
  cleanStoragePage: Page;
}
```

### Contrato de Comportamiento del Fixture `authenticatedPage`:
1. Instancia un `BrowserContext` nuevo y aislado.
2. Navega a `/`.
3. Completa credenciales (`admin@taskflow.dev` / `password123`) y pulsa `Iniciar Sesión`.
4. Espera deterministamente a que la URL sea `/` o se renderice el encabezado `"Bienvenido, Administrador GDS"`.
5. Cede el control al test mediante `use(page)`.
6. Al finalizar el test, realiza la limpieza del contexto automáticamente (*Teardown*).

---

## 4. Criterios de Aceptación y Verificación

- [ ] **CA-1:** `@playwright/test` instalado en el proyecto con navegadores base disponibles.
- [ ] **CA-2:** `playwright.config.ts` compila sin errores de tipos y valida la matriz de navegadores.
- [ ] **CA-3:** El fixture `authenticatedPage` resuelve la autenticación automáticamente y entrega la página lista para pruebas.
- [ ] **CA-4:** Una prueba de humo (`00-smoke.spec.ts`) valida exitosamente la carga de la SPA contra el `webServer` en Chromium, Firefox y WebKit.
- [ ] **CA-5:** Se genera el reporte HTML de Playwright verificando la observabilidad.
