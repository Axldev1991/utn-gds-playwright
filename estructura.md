# Estructura Maestra, Guía de Estudio y Machete Técnico para Exposición

> **Materia:** Gestión de Desarrollo de Software (GDS) — Universidad Tecnológica Nacional (UTN)  
> **Tema:** Automatización de Pruebas E2E con Microsoft Playwright & QA Adaptativo con Inteligencia Artificial  
> **Aplicación Bajo Prueba (AUT):** *TaskFlow* — Sprint Management SPA  
> **Duración Total Reglamentaria:** 25:00 a 30:00 minutos (Objetivo del equipo: ~27:30 min)  
> **Repositorio Oficial:** [https://github.com/Axldev1991/utn-gds-playwright](https://github.com/Axldev1991/utn-gds-playwright)  

---

## 👥 Resumen de Asignación y Cronograma General

| N° | Integrante | Rol en el Proyecto | Bloque y Temática | Minutaje |
| :-: | :--- | :--- | :--- | :---: |
| **1** | **Castellano Gutiérrez Axel** | Líder Técnico & Arquitecto | Bloque 1: Fundamentos, Ontología y Arquitectura Playwright vs Selenium/Cypress | `00:00 - 06:30` (~6:30 min) |
| **2** | **Fernandez Ibarguren Saulo** | Frontend & Asincronía Specialist | Bloque 2: La SPA TaskFlow, Asincronismo, Debounce y Motor de Auto-waiting | `06:30 - 13:30` (~7:00 min) |
| **3** | **Franco Martin Esposito** | QA Engineer & Automation Architect | Bloque 3: Arquitectura POM, Fixtures con IoC y Demo en Vivo de los 3 Flujos | `13:30 - 20:30` (~7:00 min) |
| **4** | **Nicolas Rumie Vitar** | Adaptive QA Specialist & Tooling | Bloque 4: QA Adaptativo (v1 vs v2), Self-Healing con IA y Trace Viewer | `20:30 - 28:00` (~7:30 min) |

```
[00:00]=================[06:30]=================[13:30]=================[20:30]=================[28:00]
   |                       |                       |                       |                       |
   +-- BLOQUE 1 (Axel)     +-- BLOQUE 2 (Saulo)    +-- BLOQUE 3 (Franco)   +-- BLOQUE 4 (Nicolás)  +-- FIN
       - Portada y equipo      - Demo SPA TaskFlow     - SOLID / SRP en tests  - Flakiness & A11y Tree
       - 6 Preguntas Ontol.    - Retos SPA (Debounce)  - Page Object Model     - Mutación UI v1 vs v2
       - Protocolos & Arquit.  - Auto-Waiting y Checks - Fixtures & Inyección  - Agente LLM Healing
       - Playwright vs Sel/Cyp - Cero Sleeps           - Demo 3 Flujos en vivo - Trace Viewer en vivo
```

---

# 📚 Fichas Individuales de Exposición y Estudio

---

## 👤 BLOQUE 1: Introducción, Ontología y Comparativa Arquitectónica
* **Responsable:** **Castellano Gutiérrez Axel**
* **Tiempo asignado:** `00:00` a `06:30` (~6:30 min)
* **Objetivo de la sección:** Sentar las bases conceptuales, presentar formalmente al grupo y al proyecto, responder las preguntas ontológicas y fundamentar por qué la arquitectura de Playwright supera a Selenium y Cypress.

---

### 🖥️ Qué mostrar en pantalla y cómo mostrarlo
1. **Min 00:00 - 01:15:** Diapositiva 1 (Portada con títulos de UTN - GDS, nombres de los 4 integrantes y link al repositorio de GitHub).
   * *Acción:* Iniciar grabación, saludar formalmente a los docentes, presentar a los integrantes y mencionar que se desarrolló una aplicación SPA ad-hoc (*TaskFlow*).
2. **Min 01:15 - 03:45:** Diapositiva 2 (Las 6 Dimensiones Ontológicas: *Qué, Para qué, Por qué, Objetivo, Cómo y Cuándo*).
   * *Acción:* Recorrer las 6 preguntas ontológicas apoyándose en el machete conceptual, explicando con naturalidad el problema del *flakiness*.
3. **Min 03:45 - 06:30:** Diapositiva 3 (Diagrama y tabla de protocolos arquitectónicos: Selenium vs Cypress vs Playwright).
   * *Acción:* Mover el cursor sobre el diagrama para ilustrar la diferencia entre peticiones HTTP repetitivas (Selenium), inyección en iframe (Cypress) y WebSocket directo (Playwright). Dar el pase a Saulo.

---

### 🧠 Machete Conceptual y Explicación Técnica (Para Estudiar y Explicar con Palabras Propias)

#### 1. Las 6 Preguntas Ontológicas de Playwright
* **¿Qué es?:** Es un framework moderno de automatización de navegadores web y pruebas End-to-End (E2E), de código abierto, desarrollado y mantenido por Microsoft. Permite controlar navegadores mediante una API unificada en TypeScript, JavaScript, Python, .NET y Java.
* **¿Para qué sirve?:** Para simular de manera fiel las acciones reales de un usuario en navegadores modernos (Chromium, Firefox, WebKit), validando flujos completos de negocio, previniendo regresiones, auditando accesibilidad y probando compatibilidad cross-browser y mobile.
* **¿Por qué surge? (El problema histórico):** La web mutó de sitios estáticos con recarga de página (Web 1.0/2.0 tradicional) a Single Page Applications (SPAs) hiper-reactivas con Virtual DOM y asincronismo continuo. Las herramientas de primera generación (como Selenium) no estaban diseñadas para esto, generando una crisis de **Flakiness** (pruebas inestables que fallan por problemas de sincronización temporal y no por bugs reales). Playwright se creó específicamente para eliminar el flakiness desde el motor del navegador.
* **¿Cuál es su Objetivo Central?:** Lograr pruebas E2E rápidas, deterministas y altamente confiables que puedan correr en pipelines de CI/CD sin requerir pausas artificiales (`sleep()`).
* **¿Cómo funciona por debajo?:** Se comunica con el navegador mediante una conexión continua y bidireccional por **WebSockets**, hablando directamente con las APIs nativas de depuración del motor (*Chrome DevTools Protocol - CDP* en Chromium y equivalentes en Firefox y WebKit). No "adivina" el estado de la página haciendo sondeo periódico, sino que escucha eventos nativos del ciclo de vida del navegador.
* **¿Cuándo conviene usarlo y cuándo no?:**
  * *Conviene:* Pruebas E2E de SPAs complejas, flujos multi-usuario, intercepción de tráfico de red, emulación móvil y pruebas cross-browser.
  * *NO conviene:* Para pruebas unitarias de funciones puras o lógica algorítmica aislada (para eso se deben usar herramientas ligeras como Vitest o Jest que corren directo en Node sin levantar navegadores).

#### 2. Comparativa Arquitectónica de Protocolos (Punto Crítico de Evaluación)
* **Selenium WebDriver (HTTP REST / 3 Capas):**
  * *Mecanismo:* Script $\rightarrow$ Petición HTTP $\rightarrow$ Driver binario (`chromedriver.exe`) $\rightarrow$ Motor del Navegador.
  * *Problema:* Cada comando (`findElement`, `click`) es una petición HTTP independiente. Esto produce alta latencia acumulada y carece de conocimiento nativo sobre el ciclo de vida del DOM, obligando al programador a usar esperas manuales frágiles (`Thread.sleep`).
* **Cypress (In-Browser Runner / Iframe):**
  * *Mecanismo:* El script de prueba corre **dentro del mismo hilo de ejecución de JavaScript de la página**, inyectado dentro de un `iframe`.
  * *Problema:* Está atrapado en el sandbox de seguridad del navegador. No soporta nativamente múltiples pestañas ni ventanas simultáneas, tiene dificultades con múltiples orígenes/dominios y su soporte para WebKit (Safari) es experimental o restringido.
* **Playwright (Out-of-Process / WebSocket CDP):**
  * *Mecanismo:* El script corre **fuera del proceso del navegador**, pero se conecta por un único canal WebSocket bidireccional de baja latencia directo al protocolo interno del motor.
  * *Ventajas:* Soporta múltiples pestañas, dominios cruzados, intercepta red a nivel socket y ofrece paridad idéntica en Chromium, Firefox y WebKit.

#### 3. Jerarquía de Procesos: `Browser` vs `BrowserContext` vs `Page`
* **`Browser`:** Es la instancia del proceso del navegador en el sistema operativo (ej. Chromium abierto). Es pesado, consume RAM y tarda 1 a 2 segundos en iniciar. Playwright suele iniciar una única instancia por worker.
* **`BrowserContext`:** Es una sesión completamente aislada dentro del mismo navegador (equivalente a una ventana de incógnito). Posee sus propias cookies, `localStorage`, caché y permisos. **Crear un `BrowserContext` toma menos de 10 milisegundos**. Esto permite aislar cada test al 100% sin tener que reiniciar el navegador.
* **`Page`:** Es una pestaña o ventana dentro de un `BrowserContext`. Un contexto puede tener varias páginas abiertas que comparten la misma sesión (ideal para flujos multi-ventana o popups de pago).

---

## 👤 BLOQUE 2: La Aplicación TaskFlow, Asincronismo y Auto-Waiting
* **Responsable:** **Fernandez Ibarguren Saulo**
* **Tiempo asignado:** `06:30` a `13:30` (~7:00 min)
* **Objetivo de la sección:** Mostrar la aplicación desarrollada (*TaskFlow*), explicar por qué las SPAs representan un reto para el testing automatizado (Virtual DOM, debounce, estados efímeros) y fundamentar el motor de Auto-waiting determinista de Playwright.

---

### 🖥️ Qué mostrar en pantalla y cómo mostrarlo
1. **Min 06:30 - 08:30:** Navegador en `http://localhost:5173` mostrando TaskFlow (pantalla de Login y transición al Dashboard).
   * *Acción:* Mostrar el diseño de Login. Ingresar credenciales `admin@taskflow.dev` / `password123`. Presionar "Iniciar Sesión" y marcar con el mouse el **spinner de carga** que dura 600ms antes de mostrar el Dashboard.
2. **Min 08:30 - 10:30:** Dashboard interactivo de TaskFlow.
   * *Acción:* Escribir `"Playwright"` en la barra de búsqueda y pausar para mostrar cómo el filtro actúa recién después del **debounce de 300ms**. Mostrar también cómo aparece y desaparece una notificación Toast de 3.5 segundos.
3. **Min 10:30 - 13:30:** VS Code con el archivo [02-auth-flow.spec.ts](file:///c:/Users/Usuario/Desktop/GDS/utn-gds-playwright/e2e/tests/02-auth-flow.spec.ts).
   * *Acción:* Resaltar que en el código **no existe ningún `sleep()` ni `waitForTimeout()`**. Explicar los 5 chequeos de accionabilidad de Playwright. Dar el pase a Franco.

---

### 🧠 Machete Conceptual y Explicación Técnica (Para Estudiar y Explicar con Palabras Propias)

#### 1. Arquitectura de la SPA TaskFlow
* Desarrollada desde cero con **React 18, Vite y TypeScript**.
* Es una herramienta de gestión ágil de sprints con tres estados (`backlog`, `in_progress`, `completed`), asignación de usuarios y prioridades.
* Posee una capa de servicios (`auth.service.ts` y `task.service.ts`) con almacenamiento en `localStorage`.
* **Detalle técnico formativo:** Se incorporaron **latencias de red asincrónicas intencionales**: el login tarda 600ms y la carga de tareas tarda 400ms. Esto fuerza a que el framework de testing deba resolver asincronismo real y no trabaje sobre un DOM estático inmediato.

#### 2. Los Tres Grandes Retos de las SPAs para el Testing Automatizado
1. **Montaje y Reconciliación del Virtual DOM (Sin `window.onload`):**  
   En una SPA clásica no hay recarga de página. Los elementos se inyectan dinámicamente en el DOM tras la resolución de llamadas asincrónicas. Si un framework tradicional intenta clickear un botón antes de que React termine de asociar el manejador de eventos (*event listener*), la prueba falla con `StaleElementReferenceException` o el clic se pierde.
2. **Técnicas de Optimización Frontend (El caso del Debounce):**  
   En la búsqueda de TaskFlow se implementó el hook `useDebounce(searchTerm, 300)`. La aplicación no filtra en cada pulsación para cuidar el rendimiento, sino que espera 300ms de silencio de teclado. Si un test escribe e inmediatamente busca las tarjetas, la prueba arrojará un falso negativo porque la lista aún no mutó.
3. **Componentes y Estados Efímeros (Toasts):**  
   Al crear una tarea, la SPA muestra una notificación flotante accesible que se autodestruye en 3.5 segundos. El test debe ser capaz de verificar su presencia sin generar condiciones de carrera (*race conditions*).

#### 3. El Motor de Auto-Waiting de Playwright (¿Por qué elimina los sleeps?)
* **El problema de los `sleep()`:** Son un antipatrón. Si se pone `sleep(3000)`, en una máquina rápida se desperdicia tiempo valioso acumulado en miles de ejecuciones; y si se corre en un servidor de CI/CD sobrecargado, los 3 segundos no alcanzan y la prueba falla falsamente.
* **Actionability Checks (Los 5 Chequeos Automáticos):**  
  Antes de cualquier interacción (`click()`, `fill()`, `check()`), Playwright verifica de forma síncrona y automática que el elemento cumpla con:
  1. **Attached:** Está efectivamente conectado al árbol DOM.
  2. **Visible:** Tiene dimensiones no nulas ($> 0\times 0$) y no tiene estilos como `display: none` o `visibility: hidden`.
  3. **Stable:** No está ejecutando animaciones CSS ni transiciones de layout (su posición espacial es estable).
  4. **Receives Events:** El elemento puede recibir eventos de puntero (no está tapado por un overlay, un modal superior o un spinner de carga).
  5. **Enabled:** No tiene el atributo HTML `disabled`.
* **Aserciones Web-First (`expect(locator).toHaveCount(...)`):**  
  A diferencia de las aserciones genéricas de Node, las aserciones de Playwright esperan y reintentan automáticamente hasta que la condición se vuelva verdadera o se alcance el timeout (5 segundos por defecto). Por eso sincroniza de forma transparente con el debounce de 300ms.

---

## 👤 BLOQUE 3: Principios de Diseño, Page Object Model y Flujos Funcionales
* **Responsable:** **Franco Martin Esposito**
* **Tiempo asignado:** `13:30` a `20:30` (~7:00 min)
* **Objetivo de la sección:** Justificar la arquitectura de software de la suite de pruebas bajo principios SOLID/SRP, explicar el patrón Page Object Model (POM), la inyección de dependencias con Custom Fixtures y ejecutar en vivo la suite completa cross-browser de los 3 flujos de negocio.

---

### 🖥️ Qué mostrar en pantalla y cómo mostrarlo
1. **Min 13:30 - 15:15:** VS Code mostrando la estructura modular en `e2e/pages/` y `e2e/fixtures/`.
   * *Acción:* Mostrar cómo las responsabilidades están estrictamente separadas en tres capas (Localización, Infraestructura y Negocio/Specs).
2. **Min 15:15 - 17:00:** Split view en VS Code mostrando `BasePage.ts`, `LoginPage.ts`, `DashboardPage.ts` y `TaskModalComponent.ts`.
   * *Acción:* Explicar la herencia de `BasePage` y la **Composición sobre Herencia** con `TaskModalComponent`. Mostrar también `test.fixture.ts` explicando cómo se inyecta la sesión autenticada.
3. **Min 17:00 - 20:30:** Terminal integrada en VS Code ejecutando la suite de los 3 flujos en vivo.
   * *Acción:* Correr el comando en terminal:
     ```powershell
     npx playwright test e2e/tests/02-auth-flow.spec.ts e2e/tests/03-search-filter-flow.spec.ts e2e/tests/04-task-creation-flow.spec.ts
     ```
   * *Acción:* Relatar los 3 flujos mientras los tests se ejecutan en paralelo en Chromium, Firefox y Mobile Chrome. Resaltar al final los **27 tests en verde**. Dar el pase a Nicolás.

---

### 🧠 Machete Conceptual y Explicación Técnica (Para Estudiar y Explicar con Palabras Propias)

#### 1. Principio de Responsabilidad Única (SRP) en Testing
* El software de pruebas es código de producción y debe tratarse con el mismo rigor ingenieril.
* Mezclar en un archivo de test la URL, los selectores CSS, las aserciones de negocio y el manejo de sesión genera "código espagueti" imposible de mantener.
* **Separación en 3 capas:**
  1. *Capa de Localización e Interacción (Page Objects):* Conoce la estructura del DOM y cómo interactuar con los elementos. No contiene aserciones de negocio complejas.
  2. *Capa de Infraestructura (Custom Fixtures):* Gestiona el ciclo de vida del navegador, el estado del almacenamiento y la sesión.
  3. *Capa de Negocio (Specs):* Expresa los escenarios en lenguaje BDD (Dado, Cuando, Entonces) interactuando con los Page Objects.

#### 2. Implementación de Page Object Model (POM) en TaskFlow
* **`BasePage.ts`:** Clase abstracta de la cual heredan todas las páginas. Recibe la instancia `Page` de Playwright y centraliza métodos comunes como esperas de red y resolución de URLs relativas.
* **`LoginPage.ts`:** Encapsula inputs de email, contraseña, botón de envío y la alerta de error (`role="alert"`). Expone el método de alto nivel `login(email, password)`.
* **`DashboardPage.ts`:** Encapsula la barra de búsqueda, el selector de estados, el contador de tareas y la lista de tarjetas.
* **`TaskModalComponent.ts` (Component Object Model & Composición):**  
  En lugar de inflar la clase `DashboardPage` con todos los selectores del modal de creación, se diseñó una clase componente dedicada que encapsula el diálogo accesible (`role="dialog"`). `DashboardPage` compone una instancia de `TaskModalComponent`, respetando el principio de **Composición sobre Herencia**.

#### 3. Inversión de Control (IoC) y Fixtures Personalizados (`test.fixture.ts`)
* En tests tradicionales, cada prueba repite pasos de setup (abrir página, tipear login, esperar redirección).
* En Playwright se utilizan **Custom Fixtures**: extendemos el objeto `test` para declarar fixtures como `{ dashboardPage }`.
* Aplicando **Inversión de Dependencias (DIP)**, el test no sabe cómo se inició la sesión: simplemente declara que necesita la página autenticada y el fixture se encarga de inyectar el estado de autenticación en `localStorage` antes de ejecutar el escenario, realizando además el teardown al finalizar.

#### 4. Los 3 Flujos Funcionales Críticos Evaluados (La Consigna del TP)
* **Flujo 1: Autenticación y Control de Sesión (`02-auth-flow.spec.ts`):**  
  Prueba el login exitoso con transición fluida al Dashboard, el login con credenciales inválidas validando el mensaje accesible con `role="alert"`, y el logout determinista que limpia el token y redirige al login.
* **Flujo 2: Búsqueda y Filtrado Asincrónico (`03-search-filter-flow.spec.ts`):**  
  Prueba la búsqueda reactiva validando que el filtrado se resuelva tras el debounce de 300ms, el filtrado cruzado por estados de sprint (`completed`, `in_progress`), y el caso de búsqueda sin coincidencias donde valida el componente de *Empty State*.
* **Flujo 3: Alta y Gestión de Tareas con Modal y Feedback (`04-task-creation-flow.spec.ts`):**  
  Abre el modal accesible, prueba las validaciones de campos requeridos (título obligatorio), crea una tarea válida verificando que el Toast accesible aparezca y se prependa la tarjeta al tablero, y finalmente la elimina para mantener el estado limpio.
* **Ejecución Concurrente Cross-Browser:** Los 3 flujos corren en paralelo en 3 proyectos: Desktop Chromium, Desktop Firefox y Mobile Chrome (Pixel 5), totalizando **27 tests exitosos en menos de 45 segundos**.

---

## 👤 BLOQUE 4: QA Adaptativo, Self-Healing con IA, Trace Viewer y Cierre
* **Responsable:** **Nicolas Rumie Vitar**
* **Tiempo asignado:** `20:30` a `28:00` (~7:30 min)
* **Objetivo de la sección:** Demostrar la fragilidad de los selectores tradicionales frente a un rediseño de frontend, la resiliencia de los locators semánticos, ejecutar el agente de Auto-Healing con LLM, navegar interactivamente por el Trace Viewer y dar el cierre formal de la exposición.

---

### 🖥️ Qué mostrar en pantalla y cómo mostrarlo
1. **Min 20:30 - 22:00:** Explicación teórica de por qué se rompen los selectores en la industria (Árbol DOM vs Árbol de Accesibilidad).
2. **Min 22:00 - 24:15:** SPA TaskFlow mostrando el interruptor de **UI v1 (Estándar)** vs **UI v2 (Rediseño Alterado)**.
   * *Acción:* Ejecutar en terminal el test frágil para mostrar que falla en UI v2:
     ```powershell
     npx playwright test e2e/ai-adaptive/fragile-selectors.spec.ts
     ```
   * *Acción:* Ejecutar en terminal el test semántico para mostrar que pasa al 100% en UI v2:
     ```powershell
     npx playwright test e2e/ai-adaptive/adaptive-semantic.spec.ts
     ```
3. **Min 24:15 - 25:45:** Terminal ejecutando el script del agente de IA:
   * *Acción:* Correr el comando:
     ```powershell
     npm run demo:healing
     ```
   * *Acción:* Abrir en VS Code el archivo generado [self-healing-report.md](file:///c:/Users/Usuario/Desktop/GDS/utn-gds-playwright/e2e/ai-adaptive/self-healing-report.md) y señalar el diagnóstico y el selector reparado con 98% de confianza.
4. **Min 25:45 - 27:15:** Ventana interactiva de **Playwright Trace Viewer**.
   * *Acción:* Abrir una traza con `npx playwright show-trace <ruta>` (o abrir el reporte con `npm run test:e2e:report`). Recorrer el Filmstrip, las pestañas Before/After del DOM, la pestaña Network y los logs de accionabilidad.
5. **Min 27:15 - 28:00:** Diapositiva final con conclusiones del equipo y agradecimiento formal.

---

### 🧠 Machete Conceptual y Explicación Técnica (Para Estudiar y Explicar con Palabras Propias)

#### 1. El Problema Industrial de la Fragilidad de Selectores (Flakiness)
* En la industria, los equipos de QA dedican hasta un **60% de su tiempo** a mantener pruebas rotas por cambios cosméticos de diseño.
* Esto ocurre por el acoplamiento a detalles internos de implementación: IDs autogenerados por bundlers o clases utilitarias de CSS (Tailwind, CSS Modules) que cambian con cualquier refactor.
* **La solución de Playwright:** En lugar de acoplarse al árbol DOM interno, acoplarse al **Árbol de Accesibilidad (Accessibility Tree)** que el navegador expone para lectores de pantalla mediante roles ARIA y nombres accesibles (`getByRole`, `getByLabel`).

#### 2. Demostración Empírica: Mutación de UI v1 vs UI v2
* En TaskFlow se incorporó un switch en el Navbar que cambia el modo de la aplicación:
  * **UI v1 (Estándar):** Utiliza IDs y clases clásicas como `#btn-create-task` y `.task-card`.
  * **UI v2 (Rediseño Alterado):** Simula un rediseño agresivo de frontend: `#btn-create-task` muta a `#act_btn_new_item_99f`, y `.task-card` muta a `.task-item-mutated-layout`. Sin embargo, la semántica de accesibilidad no cambió: sigue siendo un botón accesible con el nombre *"Crear Tarea"*.
* **El resultado en vivo:**
  * `fragile-selectors.spec.ts` busca `#btn-create-task`: en v1 pasa, pero en v2 **colapsa por TimeoutError** (demostración científica del flakiness tradicional).
  * `adaptive-semantic.spec.ts` busca `page.getByRole('button', { name: /Crear Tarea/i })`: **pasa al 100% en ambas versiones** sin modificar una sola línea de código de prueba.

#### 3. Auto-Healing con Modelos de Lenguaje (LLM Agent Pattern)
* ¿Qué pasa si el cambio es tan drástico que ni los selectores semánticos alcanzan? Ahí entra el **QA Adaptativo con IA**.
* Implementamos `llm-healing-demo.ts`, un script ejecutable que simula un agente de IA en CI/CD.
* **¿Qué datos recibe el agente ante un fallo?:**
  1. El selector original que falló (`#btn-create-task`).
  2. El stacktrace y mensaje de error exacto.
  3. La intención funcional del paso (*"El usuario desea abrir el modal de creación de tareas"*).
  4. Un snapshot del DOM mutado en el instante del timeout.
* **¿Qué hace el agente?:** Analiza similitud semántica y roles ARIA, deduce que `#act_btn_new_item_99f` es el elemento equivalente, y sugiere con un **98% de confianza** reemplazar el selector roto por `page.getByRole('button', { name: /Crear Tarea/i })`, generando un reporte estructurado en Markdown (`self-healing-report.md`) para auto-reparar la suite o sugerir un Pull Request.

#### 4. Observabilidad Avanzada con Playwright Trace Viewer
* **Por qué supera a los logs y capturas de pantalla:** Un screenshot es una foto fija congelada que no permite inspeccionar el DOM ni ver qué peticiones de red estaban pendientes.
* Una traza de Playwright (`trace.zip`) es un **DOM interactivo serializado** que permite realizar **time-travel debugging** (viajar en el tiempo).
* **Las 4 áreas fundamentales a mostrar en vivo:**
  1. *Filmstrip (Línea de tiempo superior):* Miniaturas visuales milisegundo a milisegundo para ver qué renderizaba la pantalla en cada instante.
  2. *DOM Snapshots (Centro):* Pestañas **Before**, **Action** y **After**. Es un DOM real interactivo dentro de un iframe: se puede hacer clic derecho e inspeccionar elementos como en las DevTools.
  3. *Network (Panel inferior):* Registro completo de tráfico HTTP con método, URL, código de respuesta (200 OK), latencias de red y cuerpos de petición/respuesta. Permite descartar de inmediato si un test falló por un bug de UI o por una caída del backend.
  4. *Log (Accionabilidad):* Muestra los chequeos de accionabilidad de Playwright paso a paso confirmando visibilidad y estabilidad.

#### 5. Conclusiones Finales del Equipo
* El testing moderno no consiste en grabar clics ni escribir scripts frágiles con XPath rígidos.
* Consiste en diseñar software de pruebas con arquitectura (POM, Fixtures, SRP), sincronización nativa (Auto-waiting) y selectores semánticos orientados a accesibilidad.
* La incorporación de IA y observabilidad con Trace Viewer reduce el costo de mantenimiento de pruebas y erradica el "en mi máquina funciona" en equipos ágiles.

---

# 🛡️ Banco de Preguntas y Respuestas para la Defensa con el Profesor

### ❓ Preguntas para Axel Castellano (Arquitectura y Fundamentos)
* **P: ¿Por qué Playwright es superior en velocidad frente a Selenium si ambos abren un navegador?**  
  * **R:** *Por el protocolo de comunicación. En Selenium cada comando es una petición HTTP REST independiente serializada hacia un binario intermedio (`chromedriver`), acumulando latencia de red y sobrecarga de socket en cada interacción. Playwright establece un único canal persistente bidireccional por **WebSockets** directo al motor del navegador (CDP), transmitiendo eventos en tiempo real con latencia casi nula.*
* **P: ¿Cuál es la diferencia entre `Browser` y `BrowserContext` y por qué es fundamental en CI/CD?**  
  * **R:** *El `Browser` es el proceso pesado del sistema operativo (demora ~1-2 segundos en iniciar y consume memoria RAM). El `BrowserContext` es un perfil de navegación aislado dentro de ese proceso (similar a una ventana de incógnito). Crear un `BrowserContext` toma menos de 10 milisegundos y garantiza aislamiento total de cookies, `localStorage` y caché entre pruebas. Esto permite ejecutar cientos de tests limpios en paralelo sin reiniciar el navegador.*

### ❓ Preguntas para Saulo Fernández (SPAs y Sincronismo)
* **P: ¿Por qué las SPAs producen tanto "flakiness" en herramientas viejas?**  
  * **R:** *Porque en las SPAs no hay recarga tradicional de página ni evento `window.onload`. Los componentes se montan y desmontan asincrónicamente en el Virtual DOM mediante promesas y reconciliación de React. En herramientas tradicionales, si el script interactúa antes de que el manejador de eventos esté vinculado en el DOM, se producen excepciones como `StaleElementReferenceException` o clics perdidos.*
* **P: ¿Cómo sincronizaron la prueba de búsqueda con el debounce sin usar sleeps?**  
  * **R:** *Mediante las aserciones web reactivas de Playwright (`web-first assertions`). Al escribir `await expect(dashboardPage.taskCards).toHaveCount(1)`, Playwright sondea el DOM continuamente esperando que se cumpla la condición. Cuando vence el debounce de 300ms y React actualiza la lista, la aserción se resuelve de inmediato sin pausas artificiales.*

### ❓ Preguntas para Franco Esposito (Diseño, POM y Fixtures)
* **P: ¿Qué ventaja técnica aporta Page Object Model en la mantenibilidad de la suite?**  
  * **R:** *Aplica el Principio de Responsabilidad Única (SRP) y desacoplamiento. Las especificaciones de prueba solo expresan la intención del negocio (`await loginPage.login(...)`), mientras que los detalles de localización y estructura del DOM quedan confinados en la clase POM. Si el diseño visual cambia, solo se modifica un archivo sin alterar las decenas de tests que lo consumen.*
* **P: ¿Cómo funcionan los Custom Fixtures que crearon y qué principio de diseño aplican?**  
  * **R:** *Aplican Inversión de Control (IoC) e Inversión de Dependencias (DIP). En lugar de que cada test instancie manualmente páginas o inicie sesión por código imperativo, el test declara `{ dashboardPage }` como argumento. El motor de fixtures de Playwright prepara el contexto, autentica al usuario y provee la instancia lista, ejecutando además la limpieza (teardown) al finalizar.*

### ❓ Preguntas para Nicolás Rumie (QA Adaptativo, IA y Observabilidad)
* **P: ¿Qué es el QA Adaptativo y por qué se apoya en el Árbol de Accesibilidad (A11y Tree)?**  
  * **R:** *El QA Adaptativo busca que los tests validen la intención funcional del usuario en lugar de detalles internos de maquetación. Al usar locators semánticos como `getByRole` o `getByLabel`, la prueba se enlaza al Árbol de Accesibilidad que el navegador expone para lectores de pantalla. Aunque el desarrollador cambie clases CSS o anidamiento de divs, mientras el botón siga siendo un `button` con el texto funcional, la prueba sobrevive al cambio.*
* **P: ¿Cómo opera el script de Self-Healing con LLM ante un fallo en CI/CD?**  
  * **R:** *Cuando un selector rígido falla por timeout, el agente captura el selector roto, el stacktrace, la intención de negocio declarada y un extracto del DOM mutado en tiempo de ejecución. El modelo de lenguaje analiza las propiedades semánticas del elemento y deduce el locator óptimo de Playwright (como `getByRole`), generando un informe para auto-recuperar la suite.*
* **P: ¿Por qué el Trace Viewer es superior a una captura de pantalla tradicional?**  
  * **R:** *Una captura de pantalla estática es una imagen congelada que no permite inspección. La traza de Playwright (`trace.zip`) es un registro serializado del DOM en cada milisegundo (viaje en el tiempo), con capturas interactivas de las fases Before, Action y After, registro completo de peticiones de red con sus códigos de estado y headers, y el log detallado de cada verificación de accionabilidad.*

---

## 🚀 Comandos Rápidos de Terminal para la Demostración

```powershell
# 1. Iniciar servidor de desarrollo de la SPA (debe estar corriendo antes de grabar)
npm run app:dev

# 2. Ejecutar la suite funcional completa de los 3 flujos (Bloque 3 - Franco)
npx playwright test e2e/tests/02-auth-flow.spec.ts e2e/tests/03-search-filter-flow.spec.ts e2e/tests/04-task-creation-flow.spec.ts

# 3. Demostración de rotura de selectores rígidos en UI v2 (Bloque 4 - Nicolás)
npx playwright test e2e/ai-adaptive/fragile-selectors.spec.ts

# 4. Demostración de resiliencia de locators semánticos en UI v2 (Bloque 4 - Nicolás)
npx playwright test e2e/ai-adaptive/adaptive-semantic.spec.ts

# 5. Ejecutar demostración de Auto-Healing con Agente de IA (Bloque 4 - Nicolás)
npm run demo:healing

# 6. Abrir Trace Viewer interactivo (Bloque 4 - Nicolás)
npm run test:e2e:trace-record
npx playwright show-trace test-results/.../trace.zip
```

---

## ✅ Checklist Técnico Operativo para el Lunes

- [ ] **Duración:** Video renderizado con duración estricta entre **25:00 y 30:00 minutos**.
- [ ] **Participación:** Los 4 integrantes hablan y muestran pantalla en sus bloques correspondientes.
- [ ] **Resolución:** Video grabado a **1080p (1920x1080)** con fuentes grandes (16-18px) en VS Code y terminal.
- [ ] **Google Drive:** Subir el video `.mp4` y la carpeta comprimida del proyecto con permisos públicos ("Cualquier persona con el enlace").
- [ ] **Foro UTN:** Publicar post con asunto: `PlayWright – Equipo #X` conteniendo el enlace de Drive.
