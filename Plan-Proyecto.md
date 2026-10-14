# Plan Maestro y Especificación del Proyecto: Playwright Testing Suite & SPA

> **Proyecto:** TaskFlow — Suite de Testing Automatizado E2E & QA Adaptativo con IA  
> **Cátedra:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Objetivo:** Plan de construcción integral de la aplicación SPA, la suite de pruebas automatizadas en Playwright y el material para el video de exposición.

---

## 1. Visión y Arquitectura del Proyecto

Para demostrar la superioridad arquitectónica de Playwright sobre SPAs con contenido asincrónico y validar el concepto de **QA Adaptativo**, el proyecto se compone de cuatro subsistemas integrados:

```
+-----------------------------------------------------------------------------------+
|                                 SISTEMA COMPLETO                                  |
+-----------------------------------------------------------------------------------+
|  [ 1. SPA: TaskFlow ]           |  [ 2. Suite de Playwright ]                     |
|  - React + Vite                 |  - Locators semánticos (Role / Label)           |
|  - Routing Client-Side          |  - Page Object Model (POM)                      |
|  - Asincronismo & Debounce      |  - Fixtures & Autenticación aislada             |
|  - Toggle "Rediseño de UI v2"   |  - Trace Viewer & Reportes HTML                 |
+---------------------------------+-------------------------------------------------+
|  [ 3. Módulo QA Adaptativo/IA ] |  [ 4. Guion del Video (25-30 min) ]             |
|  - Tests frágiles vs semánticos |  - Estructura y tiempos por integrante          |
|  - Script de auto-healing (LLM) |  - Demostración en vivo de ejecución y trazas   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Especificación Formal de Testing (Testing Spec)

### 2.1. Contexto de la Aplicación
**TaskFlow** es un sistema de gestión ágil de tareas orientado a equipos de software. Permite gestionar tableros de sprints, autenticar usuarios mediante roles simulados, filtrar tareas dinámicamente y registrar nuevos ítems con persistencia en el navegador (`localStorage`) y latencia de red simulada.

### 2.2. Restricciones Técnicas
- **Navegadores de prueba:** Chromium (Google Chrome/Edge), Firefox (Gecko), WebKit (Safari).
- **Viewports de ejecución:**
  - *Desktop:* 1280 x 720 px.
  - *Mobile Emulation:* 375 x 667 px (iPhone SE / Chromium mobile).
- **Gestión de estado:** Aislamiento total por prueba mediante `BrowserContext` efímeros sin contaminación de cookies ni `localStorage` cruzado.

---

### 2.3. Flujos Críticos y Criterios de Aceptación (BDD)

#### Flujo 1: Autenticación y Control de Sesión
- **Contexto:** Usuario intenta acceder a una ruta protegida (`/dashboard`).
- **Escenario 1.1 — Login Exitoso:**
  - **Dado** que el usuario ingresa a la página de login (`/login`).
  - **Cuando** completa el correo `admin@taskflow.dev` y contraseña `password123` y presiona "Iniciar Sesión".
  - **Entonces** el sistema muestra un indicador de carga asincrónico (*spinner*).
  - **Y** redirige a `/dashboard` mostrando el mensaje de bienvenida y el botón de "Cerrar Sesión".
- **Escenario 1.2 — Credenciales Inválidas:**
  - **Dado** que el usuario ingresa credenciales erróneas.
  - **Cuando** presiona "Iniciar Sesión".
  - **Entonces** la aplicación no redirige y muestra una alerta accesible con rol `alert`.

#### Flujo 2: Búsqueda y Filtrado Asincrónico de Tareas
- **Contexto:** Tablero con lista de tareas existentes cargadas reactivamente.
- **Escenario 2.1 — Filtrado reactivo por texto (Debounce):**
  - **Dado** que el usuario está en el tablero con múltiples tareas visibles.
  - **Cuando** escribe un término en el campo de búsqueda (ej. `"Playwright"`).
  - **Entonces** tras 300ms de debounce, la lista muta en el DOM mostrando únicamente los ítems coincidentes.
  - **Y** el contador de tareas visibles se actualiza de forma reactiva.
- **Escenario 2.2 — Filtrado por estado:**
  - **Cuando** el usuario selecciona el filtro "En Progreso".
  - **Entonces** se ocultan las tareas en estado "Backlog" y "Completado".

#### Flujo 3: Alta de Tarea con Modal y Feedback Efímero
- **Contexto:** Creación de un nuevo ítem de trabajo en el sprint.
- **Escenario 3.1 — Creación exitosa:**
  - **Dado** que el usuario pulsa el botón "Nueva Tarea".
  - **Cuando** se abre el modal, completa los campos:
    - Título: `"Implementar Trace Viewer"`
    - Descripción: `"Configurar trazas completas en CI"`
    - Prioridad: `"Alta"`
    - Asignado: `"Axel"`
  - **Y** presiona "Guardar Tarea".
  - **Entonces** el modal se cierra automáticamente.
  - **Y** aparece una notificación flotante (*Toast*) con mensaje de confirmación que desaparece a los 3 segundos.
  - **Y** la nueva tarea se renderiza en la primera posición del tablero.
- **Escenario 3.2 — Validación de campos requeridos:**
  - **Cuando** intenta guardar con el título vacío.
  - **Entonces** el formulario previene el envío y resalta el campo con error accesible.

---

## 3. Arquitectura de la Suite de Pruebas en Playwright

Para garantizar mantenibilidad, desacoplamiento y cero *flakiness*, la suite se diseñará bajo los siguientes patrones:

### 3.1. Estructura de Directorios Planificada
```
/home/axel/Escritorio/UTN/GDS/
├── TP-Playwright.md                 # Consigna original de la materia
├── Investigacion-Playwright.md       # Marco teórico y ontológico
├── Plan-Proyecto.md                 # Este documento de planificación
├── app/                             # SPA (React + Vite)
│   ├── src/
│   │   ├── components/              # Navbar, TaskList, TaskModal, Toast
│   │   ├── pages/                   # LoginPage, DashboardPage
│   │   └── state/                   # Mock storage y debounce hooks
│   └── package.json
└── e2e/                             # Suite de Pruebas Playwright
    ├── playwright.config.ts         # Configuración (browsers, reporters, traces)
    ├── fixtures/                    # Fixtures custom (sesión autenticada, mocks)
    ├── pages/                       # Page Object Models
    │   ├── BasePage.ts
    │   ├── LoginPage.ts
    │   └── DashboardPage.ts
    ├── tests/                       # Especificaciones de prueba
    │   ├── 01-auth.spec.ts
    │   ├── 02-search-filter.spec.ts
    │   └── 03-task-creation.spec.ts
    └── ai-adaptive/                 # Demostración de QA Adaptativo & IA
        ├── fragile-selectors.spec.ts # Test que rompe con rediseño v2
        ├── adaptive-semantic.spec.ts # Test resiliente basado en accesibilidad
        └── llm-healing-demo.ts       # Script de demostración de auto-recuperación
```

### 3.2. Page Object Model (POM)
Cada pantalla tendrá su clase representativa:
- `LoginPage`: Métodos `goto()`, `login(user, pass)`, y `getErrorMessage()`.
- `DashboardPage`: Métodos `search(term)`, `filterByStatus(status)`, `openTaskModal()`, `getTaskCount()`.
- `TaskModalComponent`: Métodos `fillForm(data)`, `submit()`, `cancel()`.

### 3.3. Configuración de Trazas y Reportes
- **Reporter:** `html` interactivo para inspección gráfica.
- **Trace Viewer:** Configurado en modo `retain-on-failure` y habilitado explícitamente en una corrida para capturar el *time-travel debugging* para el video.
- **Video recording:** Activo para registrar la ejecución automatizada de los navegadores.

---

## 4. Estrategia para la Demostración de QA Adaptativo e IA

Este es el punto diferencial del trabajo práctico. Implementaremos:

1. **El interruptor "UI Redesign v2" en la SPA:**
   - La versión 1 usa IDs como `#input-username`, `#btn-submit-task` y clases CSS tradicionales.
   - La versión 2 muta radicalmente el DOM: usa Tailwind con clases hash, cambia la jerarquía de `divs` anidados y altera los nombres de clases.
   - **Pero la semántica de accesibilidad no cambia:** El botón sigue siendo un `button` con nombre accesible `"Guardar Tarea"`, y el campo sigue teniendo `label` `"Título"`.

2. **La comparación en vivo:**
   - **Test Tradicional (Estilo Selenium/Cypress con XPath/CSS):** Falla inmediatamente en la versión 2 arrojando *Element Not Found*.
   - **Test Playwright Moderno (Basado en Roles y Accesibilidad):** Pasa al 100% sin modificar una línea de test.
   - **Simulación de Auto-Healing con LLM:** Un script que toma el snapshot del DOM de la v2, el selector fallido de la v1, y le pide a un modelo generativo deducir el nuevo selector óptimo en Playwright.

---

## 5. Plan de Grabación del Video (25 a 30 Minutos)

El video debe cumplir estrictamente la pauta temporal (**entre 25:00 y 30:00 minutos**) con la participación activa y equitativa de los **cuatro integrantes del equipo**:

| Bloque y Responsable | Minutos | Contenido y Puntos a Desarrollar |
| :--- | :---: | :--- |
| **Bloque 1: Introducción y Fundamentos**<br>👤 *Castellano Gutiérrez Axel* | 00:00 - 07:00 | - Presentación del equipo y objetivos del TP.<br>- Qué es Playwright y comparativa con Selenium y Cypress (arquitectura WebSocket vs HTTP/iframe).<br>- Jerarquía de procesos (`Browser` vs `BrowserContext`). |
| **Bloque 2: Desafíos en SPAs y QA Adaptativo**<br>👤 *Fernandez Ibarguren Saulo* | 07:00 - 14:00 | - Por qué las SPAs generan *flakiness* en tests tradicionales.<br>- Concepto de QA Adaptativo e integración con modelos de lenguaje (LLM).<br>- Auto-waiting y locators perezosos en Playwright. |
| **Bloque 3: Arquitectura de la Suite y Demo Práctica**<br>👤 *Franco Martin Esposito* | 14:00 - 21:30 | - Explicación de Page Object Model (POM) y Fixtures.<br>- Recorrido de la SPA (*TaskFlow*).<br>- Ejecución en vivo de los 3 flujos (Login, Búsqueda, Alta). |
| **Bloque 4: QA Adaptativo en Vivo, Trace Viewer y Conclusiones**<br>👤 *Nicolas Rumie Vitar* | 21:30 - 28:30 | - Demostración del rediseño v2: rotura del test frágil vs éxito del test semántico.<br>- Inspección profunda con **Trace Viewer** (viaje en el tiempo, snapshots del DOM y red).<br>- Conclusiones finales del equipo y cierre formal. |

---

## 6. Fases de Ejecución del Proyecto

- [ ] **Fase 1:** Construcción de la SPA *TaskFlow* (React + Vite + Modos de UI v1/v2).
- [ ] **Fase 2:** Inicialización de Playwright, configuración de navegadores y fixtures base.
- [ ] **Fase 3:** Implementación del Page Object Model (POM) para las páginas de la SPA.
- [ ] **Fase 4:** Desarrollo de los tests E2E para los 3 flujos funcionales.
- [ ] **Fase 5:** Desarrollo del módulo de demostración de QA Adaptativo (test frágil vs semántico vs script IA).
- [ ] **Fase 6:** Ejecución de pruebas, exportación de reportes HTML y trazas completas de Trace Viewer.
- [ ] **Fase 7:** Elaboración del guion definitivo con asignación de oradores para la grabación del video.
