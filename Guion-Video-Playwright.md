# Guion Maestro de Exposición Técnica: Playwright E2E Testing & QA Adaptativo con IA

> **Institución:** Universidad Tecnológica Nacional (UTN)  
> **Cátedra:** Gestión de Desarrollo de Software (GDS)  
> **Tema Central:** Automatización de Pruebas de Extremo a Extremo (E2E) con Microsoft Playwright & QA Adaptativo con Inteligencia Artificial  
> **Duración Total:** 27 a 28 minutos  
> **Repositorio Oficial:** [https://github.com/Axldev1991/utn-gds-playwright](https://github.com/Axldev1991/utn-gds-playwright)  
> **Aplicación Bajo Prueba (AUT):** *TaskFlow* — Sprint Management SPA  

---

## Integrantes del Equipo y Distribución de Roles

| N° | Integrante | Rol en el Proyecto | Bloque Asignado | Minutaje |
| :-: | :--- | :--- | :--- | :---: |
| **1** | **Castellano Gutiérrez Axel** | Líder Técnico & Arquitecto | Bloque 1: Ontología y Comparativa Arquitectónica | `00:00 - 06:30` (~6:30 min) |
| **2** | **Fernandez Ibarguren Saulo** | Frontend & Asincronía Specialist | Bloque 2: La SPA TaskFlow y el Motor de Auto-waiting | `06:30 - 13:30` (~7:00 min) |
| **3** | **Franco Martin Esposito** | QA Engineer & Automation Architect | Bloque 3: POM, Fixtures y Flujos Funcionales E2E | `13:30 - 20:30` (~7:00 min) |
| **4** | **Nicolas Rumie Vitar** | Adaptive QA Specialist & Tooling | Bloque 4: QA Adaptativo, Self-Healing con IA y Trace Viewer | `20:30 - 28:00` (~7:30 min) |

---

# BLOQUE 1: Introducción, Preguntas Ontológicas y Arquitectura de Playwright
**Responsable:** Castellano Gutiérrez Axel  
**Duración:** `00:00` a `06:30` (6 minutos y 30 segundos)  
**Pantalla a Compartir:** Diapositivas conceptuales de portada y diagrama de arquitectura de protocolos.

---

### 1.1 Bienvenida y Presentación del Trabajo (`00:00 - 01:15`)
> **[En Pantalla: Diapositiva 1 — Portada con títulos oficiales, nombres de los 4 integrantes y enlace al repositorio de GitHub]**
>
> *"Buenas tardes a los profesores y compañeros de la cátedra Gestión de Desarrollo de Software de la UTN. Mi nombre es Axel Castellano, y junto a mis compañeros Saulo Fernández, Franco Esposito y Nicolás Rumie, venimos a presentar la defensa oral y técnica de nuestro Trabajo Práctico de Automatización de Pruebas con Microsoft Playwright y QA Adaptativo con Inteligencia Artificial.*
>
> *Para este trabajo no utilizamos un software comercial existente ni un ejemplo estático trivial. Desarrollamos desde cero una Single Page Application (SPA) moderna llamada **TaskFlow**, construida con React y TypeScript, la cual someteremos a pruebas integrales de extremo a extremo respetando los más altos estándares de la ingeniería de software: Principio de Responsabilidad Única (SRP), Inversión de Control, Page Object Model y metodologías de desarrollo guiadas por especificación.*
>
> *A lo largo de los próximos 27 minutos, recorreremos desde la ontología profunda de las herramientas de testing hasta la demostración en vivo de pruebas resilientes y motores autónomos de auto-healing con modelos de lenguaje."*

---

### 1.2 Las Preguntas Ontológicas de Playwright (`01:15 - 03:45`)
> **[En Pantalla: Diapositiva 2 — Las 6 Dimensiones Ontológicas de Playwright: Qué, Para qué, Por qué, Objetivo, Cómo y Cuándo]**
>
> *"Para entender Playwright como ingenieros de software, debemos responder con rigurosidad a sus seis interrogantes fundamentales:*
>
> 1. ***¿Qué es Playwright?***  
>    *Playwright es un framework moderno de automatización de pruebas de extremo a extremo, de código abierto, desarrollado y mantenido por Microsoft. Permite controlar navegadores web de forma programática y desatendida mediante una API unificada en TypeScript, JavaScript, Python, .NET y Java.*
>
> 2. ***¿Para qué sirve?***  
>    *Su propósito es garantizar la integridad funcional, regresión, rendimiento y accesibilidad de aplicaciones web complejas, simulando con absoluta fidelidad las acciones reales de un usuario humano en múltiples navegadores y resoluciones de pantalla.*
>
> 3. ***¿Por qué surge? ¿Cuál es el problema histórico que viene a resolver?***  
>    *La web moderna evolucionó hacia Single Page Applications hiper-reactivas basadas en Virtual DOM, peticiones asincrónicas, WebSockets y microservicios. Las herramientas tradicionales de primera generación —como Selenium WebDriver— se concibieron para la web estática de los años 2000. Esto provocó una epidemia en la industria conocida como **Flakiness** (pruebas inestables que fallan por problemas de sincronización temporal y no por bugs reales). Playwright surge precisamente para erradicar el flakiness mediante sincronización nativa a nivel de motor de navegador.*
>
> 4. ***¿Cuál es su Objetivo Central?***  
>    *Lograr pruebas E2E rápidas, deterministas y altamente confiables que puedan integrarse en pipelines de Integración Continua (CI/CD) sin requerir hacks de temporización como 'sleeps' artificiales.*
>
> 5. ***¿Cómo funciona por debajo?***  
>    *A diferencia de Selenium, que utiliza el protocolo HTTP REST con peticiones independientes por cada acción, Playwright establece una conexión persistente bidireccional basada en **WebSockets**, comunicándose directamente con las APIs nativas de depuración del navegador: Chrome DevTools Protocol (CDP) en Chromium y protocolos equivalentes optimizados para Firefox y WebKit.*
>
> 6. ***¿Cuándo debemos utilizarlo y cuándo no?***  
>    *Debemos utilizarlo en pruebas de integración y E2E de flujos críticos de negocio, testing cross-browser y auditorías de accesibilidad. Por el contrario, NO debe utilizarse para pruebas unitarias de funciones puras o lógica algorítmica aislada, donde herramientas como Vitest o Jest ofrecen una velocidad de ejecución órdenes de magnitud superior sin el costo de inicialización de un proceso de navegador."*

---

### 1.3 Análisis Comparativo Arquitectónico: Playwright vs Selenium vs Cypress (`03:45 - 06:00`)
> **[En Pantalla: Diapositiva 3 — Tabla y Diagrama Comparativo de Arquitecturas: Playwright vs Selenium WebDriver vs Cypress]**
>
> *"Para consolidar esta fundamentación técnica, analicemos las diferencias arquitectónicas entre los tres grandes exponentes del mercado:*
>
> * **Selenium WebDriver:** *Opera mediante una arquitectura de tres capas: el script de prueba se comunica por HTTP REST contra un binario intermedio (chromedriver o geckodriver), el cual recién traduce los comandos al navegador. Esta triple serialización HTTP genera una sobrecarga de latencia enorme, y carece de conocimiento nativo sobre el ciclo de vida de renderizado del navegador, obligando a los ingenieros de QA a programar esperas explícitas manuales frágiles.*
>
> * **Cypress:** *Surgió como una alternativa amigable, pero sufre de severas restricciones arquitectónicas: se ejecuta **dentro del mismo hilo de JavaScript de la aplicación** en un iframe del navegador. Esto le impide nativamente soportar múltiples pestañas, múltiples orígenes o dominios de seguridad, y hace que las pruebas en navegadores como WebKit o dispositivos móviles sean limitadas.*
>
> * **Microsoft Playwright:** *Combina lo mejor de ambos mundos sin sus limitaciones. Se ejecuta **fuera del proceso del navegador**, pero se comunica de forma ultra rápida a través de WebSockets y CDP. Esto le otorga control total sobre el contexto del navegador, permitiendo crear múltiples contextos aislados en milisegundos (BrowserContexts), interceptar peticiones de red a nivel de socket, emular geolocalización, simular throttling de red y ejecutar pruebas 100% paralelas de manera nativa.*
>
> *Habiendo sentado las bases teóricas y arquitectónicas, le doy la palabra a mi compañero Saulo Fernández, quien nos mostrará en vivo la SPA que construimos y cómo Playwright gestiona la asincronía reactiva."*

---

# BLOQUE 2: La Aplicación TaskFlow, Asincronía y Auto-Waiting
**Responsable:** Fernandez Ibarguren Saulo  
**Duración:** `06:30` a `13:30` (7 minutos)  
**Pantalla a Compartir:** Navegador con `http://localhost:5173` y VS Code mostrando `app/src/`.

---

### 2.1 Presentación en Vivo de TaskFlow SPA (`06:30 - 08:30`)
> **[En Pantalla: Navegador abierto en http://localhost:5173 mostrando la pantalla de login con diseño oscuro y tarjeta de cristal]**
>
> *"Muchas gracias, Axel. Saludos a todos. Mi nombre es Saulo Fernández. Como anticipó Axel, para poner a prueba a Playwright en un escenario riguroso del mundo real, diseñamos y construimos la aplicación **TaskFlow: Sprint Management & Playwright Testing Suite**.*
>
> *TaskFlow es una Single Page Application desarrollada con React 18, Vite y TypeScript, estructurada bajo una arquitectura modular limpia:*
> * *En la capa de dominio definimos tipos estrictos para usuarios, tareas, estados de sprint (`backlog`, `in_progress`, `completed`) y niveles de prioridad.*
> * *En la capa de infraestructura implementamos servicios desacoplados (`auth.service.ts` y `task.service.ts`) que emulan un backend real persistido en LocalStorage.*
>
> *Para que las pruebas automatizadas tengan un valor formativo real, incorporamos intencionalmente **latencias asincrónicas de red simuladas**: cada login demora 600 milisegundos en responder y cada carga de tareas demora 400 milisegundos.*
>
> *(Demostración en vivo en pantalla)*  
> *Observemos la pantalla: ingresamos con las credenciales maestras `admin@taskflow.dev` y contraseña `password123`. Al pulsar 'Iniciar Sesión', vemos cómo el botón entra en estado de carga con un spinner animado accesible (`role="status"`), y luego de 600ms la SPA transiciona de manera fluida al Dashboard de control sin recargar la página."*

---

### 2.2 Desafíos de Automatización en SPAs Modernas (`08:30 - 10:30`)
> **[En Pantalla: Dashboard de TaskFlow. Saulo interactúa con la barra de búsqueda y los filtros]**
>
> *"¿Por qué las SPAs modernas son la pesadilla de las herramientas de automatización tradicionales? Principalmente por tres factores:*
>
> 1. ***Renderizado Asincrónico y Montaje del Virtual DOM:***  
>    *En una SPA no existe el evento tradicional `window.onload`. Los componentes se montan y desmontan reactivamente en el cliente. Si un script de prueba intenta hacer clic en un elemento antes de que React termine de procesar el ciclo de reconciliación, se produce el temido error `StaleElementReferenceException`.*
>
> 2. ***Técnicas de Optimización como el Debounce:***  
>    *En la barra de búsqueda de TaskFlow implementamos un custom hook llamado `useDebounce` con una ventana de 300 milisegundos. Cuando el usuario teclea, la aplicación no filtra en cada pulsación para no saturar el rendimiento, sino que espera 300ms de inactividad.*  
>    *Si un framework de testing escribe y aserta inmediatamente sin esperar la ventana de debounce, la prueba fallará falsamente.*
>
> 3. ***Estados Transitorios y Notificaciones Temporales (Toasts):***  
>    *Al crear o eliminar una tarea, TaskFlow renderiza una notificación Toast accesible que desaparece automáticamente después de 3.5 segundos. La automatización debe sincronizarse con este ciclo de vida efímero sin provocar condiciones de carrera."*

---

### 2.3 El Motor de Auto-Waiting de Playwright (`10:30 - 13:00`)
> **[En Pantalla: Código en VS Code mostrando un test de Playwright y luego la consola]**
>
> *"Aquí es donde Playwright demuestra su superioridad con su mecanismo estrella: el **Auto-waiting determinista**.*
>
> *En Selenium o herramientas antiguas, los desarrolladores solían llenar el código de líneas como `Thread.sleep(3000)` o `time.sleep(2)`. Esto es un grave antipatrón: si la máquina es rápida, perdemos segundos valiosos en cada prueba multiplicados por miles de tests; y si la máquina en CI/CD es lenta, el sleep se queda corto y la prueba falla.*
>
> *Playwright elimina por completo los sleeps arbitrarios. Antes de ejecutar cualquier acción (como un `click`, `fill` o `check`), Playwright ejecuta internamente y de forma automática un conjunto riguroso de comprobaciones de accionabilidad (**Actionability Checks**):*
> 1. ***Attached:*** *Verifica que el elemento esté conectado al DOM.*
> 2. ***Visible:*** *Verifica que tenga dimensiones mayores a 0x0 y que no tenga estilos `display: none` o `visibility: hidden`.*
> 3. ***Stable:*** *Verifica que el elemento no esté en medio de una animación CSS o transición de layout.*
> 4. ***Receives Events:*** *Verifica que el elemento no esté tapado por otro elemento superior (como un backdrop o spinner de carga).*
> 5. ***Enabled:*** *Verifica que no tenga el atributo `disabled`.*
>
> *Si alguna de estas condiciones no se cumple, Playwright espera activamente hasta que se satisfaga o hasta alcanzar el timeout configurado. Esto hace que nuestros tests sean 100% deterministas y resilientes.*
>
> *A continuación, mi compañero Franco Esposito nos explicará cómo organizamos el código de nuestras pruebas aplicando Page Object Model y principios de diseño SOLID."*

---

# BLOQUE 3: Principios de Diseño, Page Object Model y Flujos Funcionales
**Responsable:** Franco Martin Esposito  
**Duración:** `13:30` a `20:30` (7 minutos)  
**Pantalla a Compartir:** VS Code con `e2e/pages/` y Terminal ejecutando los tests funcionales.

---

### 3.1 Principio de Responsabilidad Única (SRP) y Mantenibilidad (`13:30 - 15:15`)
> **[En Pantalla: VS Code mostrando el árbol de archivos en e2e/pages/ y e2e/fixtures/]**
>
> *"Muchas gracias, Saulo. Buenas tardes a todos. Mi nombre es Franco Esposito.*
>
> *En la materia Gestión de Desarrollo de Software aprendemos que el software de pruebas es código de producción y debe tratarse con el mismo rigor ingenieril. Escribir tests donde los selectores, las aserciones, las URLs y los datos de prueba están mezclados en un solo archivo plano genera código espagueti inmantenible.*
>
> *Para cumplir estrictamente con el **Principio de Responsabilidad Única (Single Responsibility Principle - SRP)**, separamos las incumbencias en tres capas claramente diferenciadas:*
> 1. ***Capa de Localización e Interacción (Page Objects):*** *Encapsula la estructura del DOM, los locators semánticos y las acciones atómicas del usuario. Ningún archivo de test sabe qué selector CSS o qué rol ARIA se usa debajo.*
> 2. ***Capa de Infraestructura y Contexto (Fixtures):*** *Gestiona el ciclo de vida de los navegadores, la limpieza de almacenamiento y la sesión autenticada mediante Inversión de Control.*
> 3. ***Capa de Aserción y Negocio (Specs):*** *Expresa los escenarios en lenguaje BDD (Dado, Cuando, Entonces) validando las reglas de negocio sin ensuciarse con detalles de implementación."*

---

### 3.2 Arquitectura Page Object Model (POM) en TaskFlow (`15:15 - 17:00`)
> **[En Pantalla: VS Code con el archivo BasePage.ts, LoginPage.ts, DashboardPage.ts y TaskModalComponent.ts en split view]**
>
> *"Implementamos el patrón **Page Object Model (POM)** mediante clases en TypeScript:*
>
> * **`BasePage.ts`:** *Clase abstracta base que recibe la instancia `Page` de Playwright y expone utilidades comunes como esperas de red y URLs relativas.*
> * **`LoginPage.ts`:** *Encapsula los campos de correo, contraseña, botón de envío y alerta de error. Expone el método de alto nivel `login(email, password)`.*
> * **`DashboardPage.ts`:** *Encapsula la barra de búsqueda, el selector de estados, el contador de tareas y la lista de tarjetas. Aplica el principio de **Composición sobre Herencia**: en lugar de inflar la clase con los controles del modal, compone una instancia de `TaskModalComponent`.*
> * **`TaskModalComponent.ts`:** *Es un Component Object que encapsula el diálogo modal accesible (`role="dialog"`), sus inputs de título, descripción, prioridad y asignado, y los métodos `createTask()` y `cancel()`.*
>
> *Adicionalmente, extendimos el motor de pruebas de Playwright creando **Custom Fixtures** (`e2e/fixtures/test.fixture.ts`). Aplicando **Inversión de Dependencias (DIP)**, nuestras pruebas inyectan directamente `{ loginPage }` o `{ dashboardPage }`. El fixture `dashboardPage` detecta si la sesión ya existe; si no, la inicia automáticamente antes de ejecutar el test, eliminando código duplicado en cada escenario."*

---

### 3.3 Demostración en Vivo de los 3 Flujos Críticos Cross-Browser (`17:00 - 20:00`)
> **[En Pantalla: Terminal ejecutando la suite funcional completa en vivo y mostrando los navegadores en paralelo]**
>
> *"A continuación, ejecutaremos en vivo la suite completa que cubre los tres flujos de negocio exigidos por la cátedra:*
>
> *(Ejecuta en terminal: `npx playwright test e2e/tests/02-auth-flow.spec.ts e2e/tests/03-search-filter-flow.spec.ts e2e/tests/04-task-creation-flow.spec.ts`)*
>
> *Observemos la ejecución concurrente en nuestros tres targets de prueba: **Desktop Chromium**, **Desktop Firefox** y emulación móvil de **Mobile Chrome (Pixel 5)**:*
>
> 1. ***Flujo 1 — Autenticación y Sesión (`02-auth-flow.spec.ts`):***  
>    *Prueba el login exitoso con transición fluida al Dashboard, el intento de login con credenciales erróneas verificando que se renderice la alerta accesible con `role="alert"`, y el logout determinista que destruye la sesión en LocalStorage y retorna al login.*
>
> 2. ***Flujo 2 — Búsqueda y Filtrado Asincrónico (`03-search-filter-flow.spec.ts`):***  
>    *Prueba la búsqueda reactiva validando que el filtrado se active tras los 300ms de debounce, el filtrado combinado por estado de sprint (`in_progress`, `completed`), y el escenario de búsqueda sin coincidencias donde se comprueba el renderizado del contenedor accesible de 'Empty State'.*
>
> 3. ***Flujo 3 — Alta y Gestión de Tareas con Modal y Feedback (`04-task-creation-flow.spec.ts`):***  
>    *Abre el diálogo modal, completa los campos con validaciones accesibles, envía el formulario, y valida que la nueva tarea se agregue al inicio de la grilla y que el Toast de notificación aparezca y sea legible por lectores de pantalla.*
>
> *(Muestra la salida en la terminal)*  
> *Como podemos apreciar, los **27 tests** se ejecutaron en menos de 45 segundos, alcanzando una tasa de éxito del **100% verde** en todos los motores de renderizado.*
>
> *Ahora le cedo la palabra a mi compañero Nicolás Rumie, quien nos presentará el módulo más innovador de este proyecto: el QA Adaptativo, la resiliencia de selectores y el auto-healing con IA."*

---

# BLOQUE 4: QA Adaptativo, Resiliencia, Self-Healing con IA y Trace Viewer
**Responsable:** Nicolas Rumie Vitar  
**Duración:** `20:30` a `28:00` (7 minutos y 30 segundos)  
**Pantalla a Compartir:** Navegador con modo v1/v2, VS Code, Terminal con script de auto-healing y ventana de Playwright Trace Viewer.

---

### 4.1 La Fragilidad de Selectores en la Industria (Flakiness) (`20:30 - 22:00`)
> **[En Pantalla: Diapositiva 4 — La Fragilidad de los Selectores de Implementación: DOM Tree vs Accessibility Tree]**
>
> *"Muchas gracias, Franco. Saludos a todos. Mi nombre es Nicolás Rumie.*
>
> *En los entornos industriales de desarrollo ágil, uno de los mayores dolores de cabeza para los equipos de QA es el mantenimiento de pruebas. Se estima que los ingenieros gastan hasta un **60% de su tiempo** corrigiendo tests que fallaron falsamente por cambios cosméticos en el frontend.*
>
> *¿Por qué ocurre esto? Porque tradicionalmente los tests se escribían acoplados a detalles internos de implementación: IDs arbitrarios, nombres de clases CSS de frameworks como Tailwind o Bootstrap, o rutas XPath estructurales como `//div/div[2]/button`.*
> *Si el desarrollador frontend refactoriza los estilos, renombra una clase o el bundler minifica los nombres, **la prueba se rompe aunque la aplicación funcione a la perfección para el usuario**.*
>
> *La propuesta de Playwright y del paradigma de **QA Adaptativo** es construir pruebas orientadas a la semántica del usuario: en lugar de acoplarnos al árbol DOM interno, nos acoplamos al **Árbol de Accesibilidad (Accessibility Tree)** expuesto por el navegador."*

---

### 4.2 Demostración Práctica: Mutación UI v1 vs UI v2 (`22:00 - 24:15`)
> **[En Pantalla: Navbar de TaskFlow alternando entre modo v1 y modo v2]**
>
> *"Para demostrar esto de manera empírica, incorporamos en TaskFlow un interruptor de **Modo UI** con dos versiones:*
> * **UI v1 (Estándar):** *Utiliza identificadores y clases tradicionales como `#btn-create-task`, `.task-card` e `#input-search-tasks`.*
> * **UI v2 (Rediseño Alterado):** *Muta completamente el DOM interno: `#btn-create-task` se convierte en `#act_btn_new_item_99f`, `.task-card` cambia a `.task-item-mutated-layout shadow-elevated`, y los títulos mutan de clase. Sin embargo, **la semántica accesible (el rol `button`, el texto 'Crear Tarea' y el rol `article`) permanece intacta**.*
>
> *(Ejecución en vivo en terminal)*  
> *Observemos qué sucede cuando ejecutamos nuestras dos suites de prueba especializadas:*
>
> 1. *Ejecutamos primero `e2e/ai-adaptive/fragile-selectors.spec.ts`:*  
>    *En UI v1 pasa perfectamente. Pero al alternar a UI v2, el test que busca `#btn-create-task` **colapsa por TimeoutError**. Acabamos de replicar científicamente el fenómeno del flakiness.*
>
> 2. *Ejecutamos ahora `e2e/ai-adaptive/adaptive-semantic.spec.ts`:*  
>    *Este test utiliza los locators semánticos de Playwright: `page.getByRole('button', { name: /Crear Tarea/i })` y `dashboardPage.taskCards`. Lo ejecutamos en UI v1 y pasa. Lo ejecutamos en UI v2 **¡y sigue pasando al 100%!** La prueba sobrevivió a una mutación drástica del DOM sin tocar una sola línea de código."*

---

### 4.3 Demostración de Self-Healing con Inteligencia Artificial (`24:15 - 25:45`)
> **[En Pantalla: VS Code ejecutando en terminal `npm run demo:healing` y abriendo el reporte generado `self-healing-report.md`]**
>
> *"Pero, ¿qué sucede cuando la mutación es tan profunda que ni siquiera los locators semánticos alcanzan? Aquí entra en juego el **QA Adaptativo con Agentes de Inteligencia Artificial (Self-Healing Tests)**.*
>
> *Desarrollamos un módulo ejecutable autónomo en TypeScript llamado `llm-healing-demo.ts`. Cuando una prueba falla en el pipeline de CI/CD, el agente captura:*
> 1. *El selector fallido (`#btn-create-task`).*
> 2. *El mensaje de error exacto con el stacktrace.*
> 3. *Una instantánea del Árbol de Accesibilidad y del DOM mutado en tiempo de ejecución.*
> 4. *La intención de negocio del usuario.*
>
> *(Ejecuta en terminal: `npm run demo:healing`)*  
> *Veamos la consola: el agente analiza los nodos candidatos, evalúa similitud semántica y emite un diagnóstico instantáneo con un score de confianza del **98%**, recomendando reemplazar el selector frágil por el locator semántico `page.getByRole('button', { name: /Crear Tarea/i })`.*
>
> *(Abre en pantalla `e2e/ai-adaptive/self-healing-report.md`)*  
> *El agente genera automáticamente este reporte estructurado en Markdown, permitiendo que el pipeline se auto-repare en tiempo de ejecución o proponga un Pull Request con el parche correspondiente."*

---

### 4.4 Observabilidad en Acción: Demostración de Trace Viewer (`25:45 - 27:15`)
> **[En Pantalla: Ventana interactiva de Playwright Trace Viewer abierta con una traza real]**
>
> *"Para finalizar nuestra defensa técnica, queremos mostrar la herramienta de observabilidad más avanzada de Playwright: el **Trace Viewer**.*
>
> *(Abre Trace Viewer con `npx playwright show-trace test-results/.../trace.zip`)*  
> *Una captura de pantalla tradicional es una imagen congelada que no dice nada. Una traza de Playwright es un **DOM interactivo serializado** que nos permite viajar en el tiempo:*
>
> * *En la parte superior tenemos la **Línea de Tiempo (Filmstrip)**: podemos desplazarnos milisegundo a milisegundo y ver exactamente cómo renderizaba la pantalla.*
> * *A la izquierda vemos la lista de **Acciones** (`goto`, `fill`, `click`).*
> * *En el centro tenemos las pestañas **Before, Action y After**: podemos inspeccionar el DOM exacto antes de hacer clic y después del clic, verificando elementos con clic derecho como si tuviéramos las DevTools abiertas en vivo.*
> * *En el panel inferior tenemos la pestaña **Network**: vemos cada petición HTTP simulada, los tiempos de latencia, los códigos 200 OK y las cabeceras JSON.*
> * *Y en la pestaña **Log**, vemos el registro detallado de los chequeos de accionabilidad de Playwright validando que los elementos fueran visibles y estables antes de interactuar.*
>
> *Esta herramienta reduce el tiempo de diagnóstico y depuración de errores de horas a cuestión de segundos."*

---

### 4.5 Conclusión Grupal y Cierre (`27:15 - 28:00`)
> **[En Pantalla: Diapositiva final con resumen de logros del proyecto, enlaces al repositorio de GitHub y agradecimientos]**
>
> *"A modo de conclusión, a lo largo de este Trabajo Práctico hemos demostrado que la automatización de pruebas moderna no consiste en grabar clics ni en acumular scripts frágiles. Consiste en diseñar una arquitectura sólida basada en estándares de ingeniería, desacoplar responsabilidades mediante Page Object Model, apalancarse en la sincronización nativa del motor de Playwright y adoptar el paradigma del QA Adaptativo y la Inteligencia Artificial para construir software robusto, resiliente y mantenible en el tiempo.*
>
> *Todo el código fuente, la aplicación SPA, las especificaciones SDD, los reportes de trazas y esta guía están disponibles públicamente en nuestro repositorio de GitHub.*
>
> *En nombre de Axel Castellano, Saulo Fernández, Franco Esposito y Nicolás Rumie, les agradecemos mucho por su atención y quedamos a disposición para cualquier consulta de la cátedra. Muchas gracias."*

---

## Checklist de Producción para la Grabación del Video

- [ ] **Resolución de Pantalla:** Grabar en 1080p (1920x1080) a 60 fps con OBS Studio o similar.
- [ ] **Audio:** Micrófono nítido, sin eco y con nivel de volumen uniforme entre los 4 integrantes.
- [ ] **Tamaño de Fuentes:** En VS Code y Terminal, aumentar la fuente a tamaño 16px o 18px para máxima legibilidad.
- [ ] **Servidor Local Listo:** Asegurar que `http://localhost:5173` esté corriendo antes de iniciar la grabación.
- [ ] **Ensayo de Tiempos:** Controlar que ningún integrante exceda los 7 minutos y medio para mantener el total en los 28 minutos reglamentarios.
