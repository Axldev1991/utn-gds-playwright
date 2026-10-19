# Actividad 5 — Playwright
## Testing Automatizado, QA Adaptativo e Inteligencia Artificial aplicada a la SPA TaskFlow

### Introducción

El testing automatizado moderno enfrenta su mayor desafío en las interfaces web dinámicas contemporáneas. Las Single Page Applications (SPAs) introducen renderizado del lado del cliente, actualizaciones asincrónicas continuas del DOM y mutaciones frecuentes de maquetación que quiebran con facilidad las suites de pruebas tradicionales.

Este trabajo práctico desarrolla una solución integral de testing End-to-End (E2E) con **Playwright** sobre **TaskFlow**, una SPA reactiva desarrollada en React, Vite y TypeScript que simula un tablero ágil de gestión de sprints y tareas. A través de este entorno, se aborda el paradigma de **QA adaptativo** y la incorporación de **Inteligencia Artificial (LLMs)** para la generación de pruebas y el auto-healing dinámico de selectores ante cambios de la interfaz.

La presentación y documentación se estructura en cinco módulos principales:
1. **Introducción a Playwright** y comparativa frente a Selenium y Cypress.
2. **QA adaptativo y desafíos de las SPAs** (selectores frágiles, asincronismo y rutas client-side).
3. **Playwright e Inteligencia Artificial** (ciclo agente-testing, auto-healing de selectores y Playwright MCP).
4. **Implementación y ejecución de tests E2E con POM y Fixtures** sobre la matriz cross-browser.
5. **Especificación técnica de testing de la SPA TaskFlow** (3 flujos críticos BDD, criterios de aceptación y toggle v1/v2).

---

## 1. Introducción a Playwright

Playwright es un framework moderno de código abierto desarrollado por Microsoft para la automatización y testing E2E en navegadores reales. A diferencia de soluciones basadas en protocolos HTTP intermedios, Playwright se comunica directamente con los motores de renderizado mediante sockets bidireccionales nativos (como el Chrome DevTools Protocol - CDP), lo que garantiza máxima velocidad, control granular y ejecución sin intermediarios.

### Características fundamentales de Playwright
- **Cross-browser y multiplataforma**: Ejecución nativa sobre motores Chromium, Firefox y WebKit (Safari), con soporte para emulación móvil (viewport, user agent, geolocalización y capacidades táctiles) en Linux, macOS y Windows.
- **Auto-waiting determinista**: Elimina el flakiness (intermitencia) al esperar automáticamente que los elementos cumplan condiciones de *actionability* (visibles, interactuables, estables y habilitados) antes de ejecutar clics o tipeo.
- **Locators perezosos (lazy evaluation)**: Los selectores se resuelven dinámicamente en el instante exacto de la interacción y soportan reintentos automáticos.
- **Aislamiento de contexto (BrowserContext)**: Cada prueba se ejecuta en una instancia de contexto de navegador limpia e independiente (equivalente a una ventana de incógnito ultrarrápida), reutilizando la instancia del browser y minimizando el consumo de recursos.
- **Observabilidad nativa**: Generación automática de reportes HTML enriquecidos, capturas de pantalla, videos y el **Trace Viewer** para auditorías forenses paso a paso.

### Comparativa Arquitectónica: Playwright vs. Selenium vs. Cypress

| Dimensión | Playwright | Selenium WebDriver | Cypress |
| :--- | :--- | :--- | :--- |
| **Arquitectura de Comunicación** | Conexión WebSocket bidireccional directa con el navegador (CDP/Protocolos nativos) | Protocolo HTTP W3C WebDriver cliente-servidor con drivers intermediarios | Ejecución en el mismo hilo de ejecución del navegador (in-browser) mediante iframe |
| **Soporte de Navegadores** | Chromium, Firefox, WebKit nativos con una sola API | Chrome, Firefox, Edge, Safari mediante drivers externos específicos | Chrome, Edge, Firefox; soporte para WebKit experimental |
| **Sincronización y Esperas** | *Auto-waiting* nativo y web-first assertions integradas | Requiere esperas explícitas manuales (`WebDriverWait`, `expected_conditions`) | Sistema de *retry-ability* integrado en comandos encadenados |
| **Soporte Multi-Pestaña e Iframe** | Nativo y fluido entre múltiples páginas, pestañas y contextos | Soportado pero complejo (`switch_to.window`) | Limitado y con fuertes restricciones por ejecutarse dentro del iframe |
| **Lenguajes Soportados** | TypeScript, JavaScript, Python, Java, C# (.NET) | Java, Python, C#, JavaScript, Ruby, Kotlin | Exclusivamente JavaScript y TypeScript |
| **Depuración y Diagnóstico** | **Trace Viewer** interactivo (DOM snapshot, timeline de red, consola) y HTML Report | Dependiente de capturas de pantalla estáticas y logs del driver | *Time-travel* en Test Runner interactivo |

---

## 2. QA Adaptativo y Desafíos de las SPAs

El **QA adaptativo** es el enfoque metodológico orientado a diseñar y ejecutar pruebas automatizadas capaces de tolerar y responder inteligentemente a modificaciones evolutivas de la interfaz sin requerir reescrituras manuales constantes.

En una SPA tradicional, el ciclo de vida de la página es continuo: los componentes se montan y desmontan reactivamente, las solicitudes a APIs son asincrónicas y las mutaciones del DOM son constantes. Esto expone tres grandes vulnerabilidades para las herramientas clásicas de automatización:

### 1. Fragilidad de Selectores Estructurales
Las pruebas convencionales suelen apoyarse en selectores CSS o rutas XPath anidadas (ej. `div.dashboard-container > div:nth-child(2) > button.btn-primary`). Cualquier refactorización estética, actualización del framework de estilos o cambio de IDs dinámicos quiebra el test, aun cuando el comportamiento del negocio permanezca 100% operativo.
* **Solución de Playwright**: Adopción de **Locators Semánticos de Accesibilidad** (`getByRole`, `getByLabel`, `getByText`). En lugar de acoplarse al DOM, las pruebas se acoplan al árbol de accesibilidad:
  ```typescript
  // Robusto e inmune a refactorings cosméticos:
  await page.getByRole('button', { name: 'Crear Tarea' }).click();
  ```

### 2. Contenido Asincrónico y Latencia Variable
El renderizado reactivo depende de llamadas de red asincrónicas. Cuando una prueba asume un tiempo fijo de espera mediante pausas ciegas:
```typescript
// ANTIPATRÓN: Pausa arbitraria que genera pruebas lentas y frágiles
await page.waitForTimeout(2000);
```
la prueba fallará en entornos de CI/CD lentos o desperdiciará tiempo innecesario si la respuesta llega en 200 ms.
* **Solución de Playwright**: Sincronización basada en estado y *Web-First Assertions*:
  ```typescript
  // PATRÓN ÓPTIMO: Espera determinista sobre el estado real de la UI
  await expect(page.getByRole('status')).toHaveText('Tarea creada exitosamente');
  ```

### 3. Rutas Client-Side
Las transiciones de vistas ocurren en el cliente modificando la URL con la API de History (`pushState`), sin recargar el documento HTML (`window.location`). Las pruebas deben sincronizarse con la reactividad del enrutador y verificar la presencia de los componentes de destino sin asumir eventos de carga del documento (`DOMContentLoaded` o `load`).

---

## 3. Playwright e Inteligencia Artificial (QA Adaptativo)

La convergencia entre Playwright y modelos de lenguaje de gran escala (LLMs) permite materializar un sistema de pruebas auto-regenerativas y asistidas.

### División de Responsabilidades
- **El Modelo de Lenguaje (LLM)**: Actúa como el agente de razonamiento; comprende la intención de negocio, inspecciona snapshots del DOM y analiza excepciones para inferir alternativas semánticas.
- **Playwright**: Actúa como el actuador determinista; interactúa con el navegador real, provee retroalimentación fidedigna de accesibilidad y garantiza reproducibilidad estricta.

```
       ┌────────────────────────────────────────────────────────┐
       │                 Intención de Negocio                   │
       └──────────────────────────┬─────────────────────────────┘
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             Agente LLM (Razonamiento)                  │
       │   - Analiza snapshot del DOM / Árbol Accesible         │
       │   - Infiere locator resiliente ante mutaciones         │
       └──────────────────────────┬─────────────────────────────┘
                         Acción   │   ▲  Feedback / Trace
                                  ▼   │
       ┌────────────────────────────────────────────────────────┐
       │             Playwright (Actuador / Browser)            │
       │   - Auto-waiting determinista                          │
       │   - Ejecución nativa E2E sobre Chromium/Firefox/WebKit │
       └────────────────────────────────────────────────────────┘
```

### Demostración Experimental de Auto-Healing en TaskFlow
Para evidenciar el QA adaptativo, la aplicación **TaskFlow** implementa un selector de modo dual **UI v1 vs. UI v2**:
1. **Fallo Provocado en UI v2**: En modo v2, la aplicación muta intencionalmente sus selectores CSS e IDs (por ejemplo, el botón `#btn-create-task` pasa a tener el ID dinámico `#act_btn_new_item_99f`). La prueba basada en selectores CSS tradicionales (`e2e/ai-adaptive/fragile-selectors.spec.ts`) falla por *TimeoutError* al no encontrar el ID obsoleto.
2. **Diagnóstico y Reparación con IA (`llm-healing-demo.ts`)**: 
   - El script captura la excepción y toma un snapshot del DOM mutado.
   - El agente de IA analiza que el ID cambió pero el botón conserva el rol accesible `button` y el texto descriptivo `➕ Crear Tarea`.
   - Propone automáticamente con **98% de confianza** la migración a:
     ```typescript
     await page.getByRole('button', { name: /Crear Tarea/i }).click();
     ```
   - El test reparado se reejecuta mediante `e2e/ai-adaptive/adaptive-semantic.spec.ts`, superando la prueba al 100% tanto en UI v1 como en UI v2 sin alterar la lógica de negocio.

### Integración con Playwright MCP
Playwright MCP (Model Context Protocol) permite a agentes autónomos de IA interactuar con el navegador mediante herramientas tipadas de navegación, clics, inspección de consola y captura de evidencias, permitiendo la exploración no asistida y la validación de interfaces complejas.

---

## 4. Implementación y Ejecución de Tests E2E

### Arquitectura de Pruebas: Page Object Model (POM) y Fixtures
Para evitar la duplicación de código y garantizar mantenibilidad a nivel enterprise, la suite desacopla la lógica de negocio de la estructura de la página:
- **`BasePage`**: Clase base con métodos de navegación segura y utilidades comunes.
- **`LoginPage`**: Encapsula campos de usuario, contraseña, botón de submit y lectura de alertas de error.
- **`DashboardPage`**: Centraliza el header, el buscador con debounce, el filtro de estado de tareas, el listado del tablero y el botón de creación.
- **`TaskModalComponent`**: Modela el modal de alta (título, descripción, prioridad, asignado, confirmación y cancelación).
- **`test.fixture.ts`**: Inyección de dependencias nativa de Playwright. Provee fixtures preconfigurados como `authenticatedPage` (que ejecuta el login una única vez de forma programática) y `cleanPage` (sesión limpia para flujos de login).

### Resultados de la Suite Automatizada
La suite completa cubre la matriz de pruebas ejecutándose en paralelo contra la SPA TaskFlow orquestada localmente mediante el `webServer` de Playwright:
- **Matriz Cross-Browser**:
  - Desktop Chromium
  - Desktop Firefox
  - Mobile Chrome (Pixel 5 emulado)
- **Tasa de Éxito**: **100% de tests aprobados** (12/12 en verificación POM y flujos principales, 0 tests fallidos, 0 intermitencias).
- **Herramientas de Evidencia**:
  - **HTML Report**: Muestra tiempos desglosados por step, fixtures y estados de ejecución.
  - **Trace Viewer**: Permite auditar en detalle el árbol de accesibilidad, la tira secuencial de capturas (*timeline*), las peticiones de red asincrónicas y los metadatos de assertions en cada microsegundo.

---

## 5. Especificación de Testing y Selección de la SPA

### Aplicación Seleccionada: SPA *TaskFlow*
*TaskFlow* es una aplicación de gestión ágil de tareas diseñada específicamente para evaluar la robustez de suites de testing automatizado ante el dinamismo del DOM y el asincronismo.

#### Características Funcionales de la SPA
- **Control de Acceso**: Autenticación simulada con estado de carga asincrónico y control de sesión en memoria/storage.
- **Tablero Reactivo**: Listado de tareas con badges de prioridad (Baja, Media, Alta, Urgente), asignado y estado (Pendiente, En Progreso, Completada).
- **Buscador con Debounce**: Entrada de texto con retardo reactivo de 300 ms antes de disparar el filtrado en el DOM.
- **Modal de Creación y Feedback Toast**: Diálogo emergente con validaciones de campos obligatorios y notificaciones efímeras accesibles (`role="status"`).
- **Módulo de QA Adaptativo (Toggle v1/v2)**: Switch en el encabezado que altera clases CSS y atributos identificadores en tiempo real para verificar la resiliencia de los selectores.

### Especificación Formal de los 3 Flujos Críticos (BDD)

#### Flujo 1: Autenticación y Control de Sesión (`02-auth-flow.spec.ts`)
- **Escenario 1.1 — Login Exitoso con Auto-waiting**: Usuario ingresa `admin@taskflow.dev` / `password123`. Se verifica el indicador de carga (`role="status"`), la transición automática a `/dashboard` y el encabezado `"Bienvenido, Administrador GDS"`.
- **Escenario 1.2 — Login Fallido con Credenciales Inválidas**: Usuario ingresa datos erróneos; el sistema retiene la vista y renderiza una alerta accesible (`role="alert"`) indicando `"Credenciales inválidas"`.
- **Escenario 1.3 — Logout y Destrucción de Sesión**: Clic en `Cerrar Sesión`; se destruye el contexto y se redirige limpiamente al formulario de login inicial.

#### Flujo 2: Búsqueda y Filtrado Asincrónico de Tareas (`03-search-filter-flow.spec.ts`)
- **Escenario 2.1 — Filtrado Reactivo con Debounce**: Búsqueda del término `"Playwright"`. Tras el debounce de 300 ms, el DOM filtra la lista mostrando exactamente 1 tarjeta y actualizando el contador del tablero.
- **Escenario 2.2 — Filtrado por Estado de Sprint**: Selección del estado `"Completadas"`. Se valida que todas las tarjetas exhiban el pill de estado correspondiente.
- **Escenario 2.3 — Estado Vacío (Empty State)**: Búsqueda de un término inexistente (`"XYZ-NO-EXISTE"`). Se verifica la renderización del contenedor accesible con el mensaje `"No se encontraron tareas coincidentes"`.

#### Flujo 3: Alta y Gestión de Tareas con Modal y Feedback (`04-task-creation-flow.spec.ts`)
- **Escenario 3.1 — Creación Exitosa y Notificación Toast**: Apertura del modal, completado de campos (Título, Descripción, Prioridad, Asignado) y guardado. Se valida el cierre del modal, la notificación flotante (*Toast*) y la incorporación inmediata de la tarjeta al inicio del tablero.
- **Escenario 3.2 — Validación de Campos Requeridos**: Intento de envío dejando el título vacío. El modal permanece abierto y exhibe mensaje de validación accesible.
- **Escenario 3.3 — Cancelación y Descarte**: Apertura del modal, ingreso parcial de datos y clic en `Cancelar`. El modal se descarta sin impactar el estado del tablero.

### Restricciones Técnicas y Datos de Prueba
- **Entorno de Ejecución**: Localhost vía Vite en puerto asignado por `webServer`.
- **Navegadores**: Chromium, Firefox y emulación Mobile Chrome.
- **Datos Válidos de Autenticación**: `admin@taskflow.dev` / `password123`.
- **Cero Tiempos Muertos**: Prohibición explícita de `page.waitForTimeout()`; sincronización 100% determinista mediante `expect().toBeVisible()` y auto-waiting de Playwright.

---

## Conclusión

El desarrollo de la actividad sobre la SPA **TaskFlow** demuestra que el testing E2E moderno no debe concebirse como una serie de scripts frágiles de interacción superficial, sino como una disciplina de arquitectura de software. 

La combinación de **Playwright** (a través de sus protocolos de comunicación directa, aislamiento por contextos y selectores basados en el árbol de accesibilidad) junto con patrones enterprise (**Page Object Model** y **Fixtures**) permite construir suites altamente mantenibles y resistentes al cambio. A su vez, la incorporación de **Inteligencia Artificial** bajo el paradigma de **QA adaptativo** dota a los equipos de desarrollo de capacidades predictivas de diagnóstico y auto-reparación (*self-healing*), garantizando entregas de software ágiles, robustas y de máxima calidad.
