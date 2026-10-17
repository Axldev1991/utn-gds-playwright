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
> **[En Pantalla: Diapositiva 2 (Temario Bloque 1) y Diapositiva 3 — Las 6 Dimensiones Ontológicas de Playwright: Qué, Para qué, Por qué, Objetivo, Cómo y Cuándo]**
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
> **[En Pantalla: Diapositiva 4 (Arquitectura Interna: CDP & WebSockets) y Diapositiva 5 (Tabla Comparativa Exhaustiva: Playwright vs Selenium vs Cypress)]**
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
**Pantalla a Compartir:** Diapositiva 6 (Temario) y Diapositiva 7 con Modal Workbench de TaskFlow en vivo.

---

### 2.1 Presentación en Vivo de TaskFlow SPA (`06:30 - 08:30`)
> **[En Pantalla: Diapositiva 7. Saulo hace clic en el botón '▶ Abrir TaskFlow SPA en Vivo (Modal)'. Se abre el modal workbench en dos columnas: a la izquierda la SPA en vivo (http://localhost:5173) y a la derecha el 'Inspector de Selectores & DOM']**
>
> *"Muchas gracias, Axel. Saludos a todos. Mi nombre es Saulo Fernández. Como anticipó Axel, para poner a prueba a Playwright en un escenario riguroso del mundo real, diseñamos y construimos la aplicación **TaskFlow: Sprint Management & Playwright Testing Suite**.*
>
> *TaskFlow es una Single Page Application desarrollada con React 18, Vite y TypeScript, estructurada bajo una arquitectura modular limpia:*
> * *En la capa de dominio definimos tipos estrictos para usuarios, tareas, estados de sprint (`backlog`, `in_progress`, `completed`) y niveles de prioridad.*
> * *En la capa de infraestructura implementamos servicios desacoplados (`auth.service.ts` y `task.service.ts`) que emulan un backend real persistido en LocalStorage.*
>
> *Para que las pruebas automatizadas tengan un valor formativo real, incorporamos intencionalmente **latencias asincrónicas de red simuladas**: cada login demora 600 milisegundos en responder y cada carga de tareas demora 400 milisegundos.*
>
> *(Demostración interactiva en el modal)*  
> *Observemos la pantalla: en la columna izquierda tenemos la aplicación en vivo. Ingresamos con `admin@taskflow.dev` y contraseña `password123`. Al pulsar 'Iniciar Sesión', vemos cómo el botón entra en estado de carga con un spinner animado accesible (`role="status"`), y luego de 600ms transiciona al Dashboard sin recarga completa de página.*
>
> *Y miren a la derecha: integramos un **Inspector de Selectores y Árbol de Accesibilidad en tiempo real**. Si conmutamos entre el modo UI v1 estándar y UI v2 alterado, podemos ver inmediatamente cómo mutan los IDs del DOM (`btn-create-task` pasa a `act_btn_new_item_99f`), provocando que un selector CSS tradicional colapse con un `TimeoutError`, mientras que el Locator semántico de accesibilidad de Playwright sigue pasando de forma impecable sin tocar una sola línea de test."*

---

### 2.2 Desafíos de Automatización en SPAs Modernas (`08:30 - 10:30`)
> **[En Pantalla: Diapositiva 8 — Desafíos de Testing en SPAs Modernas: Virtual DOM, Debounce 300ms y Toasts Efímeros]**
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
> **[En Pantalla: Diapositiva 9 — El Motor de Auto-Waiting Determinista y los 5 Actionability Checks]**
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
**Pantalla a Compartir:** Diapositiva 10 (Temario), Diapositiva 11 con Consola Runner E2E y Diapositivas 12-13.

---

### 3.1 Principio de Responsabilidad Única (SRP) y Mantenibilidad (`13:30 - 15:15`)
> **[En Pantalla: Diapositiva 10 (Temario Bloque 3) y Diapositiva 11 — Page Object Model (POM) & Custom Fixtures en TaskFlow]**
>
> *"Muchas gracias, Saulo. Buenas tardes a todos. Mi nombre es Franco Esposito.*
>
> *En la materia Gestión de Desarrollo de Software aprendemos que el software de pruebas es código de producción y debe tratarse con el mismo rigor ingenieril. Escribir tests donde los selectores, las aserciones, las URLs y los datos de prueba están mezclados en un solo archivo plano genera código espagueti inmantenible.*
>
> *Para cumplir estrictamente con el **Principio de Responsabilidad Única (Single Responsibility Principle - SRP)**, separamos las incumbencias en tres capas claramente diferenciadas:*
> 1. ***Capa de Localización e Interacción (Page Objects):*** *Encapsula la estructura del DOM, los locators semánticos y las acciones atómicas del usuario. Ningún archivo de test sabe qué selector CSS o qué rol ARIA se usa debajo.*
> 2. ***Capa de Infraestructura y Contexto (Fixtures):*** *Gestiona el ciclo de vida de los navegadores, la limpieza de almacenamiento y la sesión autenticada mediante Inversión de Control.*
> 3. ***Capa de Aserción y Negocio (Specs):*** *Expresa los escenarios en lenguaje BDD (Dado, Cuando, Entonces) validando las reglas de negocio sin ensuciarse con detalles de implementación.*
>
> *Siguiendo el punto de la consigna que solicita una **Spec de Testing formal**, redactamos en el repositorio (`specs/04-functional-flows-spec.md`) el documento de especificación técnica donde establecemos:*
> * El contexto operativo de TaskFlow SPA.
> * Las restricciones técnicas: ejecución sobre Desktop Chromium (1280x720), Desktop Firefox y emulación móvil en Mobile Chrome (Pixel 5).
> * Y los criterios de aceptación formales en BDD para cada uno de los tres flujos críticos."*

---

### 3.2 Arquitectura Page Object Model (POM) y Custom Fixtures (`15:15 - 17:00`)
> **[En Pantalla: Diapositiva 11 — Estructura de Clases POM (BasePage, LoginPage, DashboardPage, TaskModalComponent)]**
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
> **[En Pantalla: Diapositiva 11. Franco hace clic en '▶ Abrir Runner E2E Playwright (Modal)'. Se abre la consola de automatización con su menú lateral en la derecha. Franco selecciona en el menú '1. Auth Flow (02)', el comando 'npx playwright test e2e/tests/02-auth-flow.spec.ts --headed' se carga en el prompt 'franco@taskflow-e2e:~$', y presiona [Enter] en su teclado. En pantalla se abren los navegadores Chromium y Firefox ejecutando las pruebas visualmente. Luego muestra las Diapositivas 12 y 13 con el desglose de flujos y matriz cross-browser]**
>
> *"A continuación, ejecutaremos en vivo la suite completa que cubre los tres flujos de negocio exigidos por la cátedra.*
>
> *Directamente desde el panel de ejecución que integramos en nuestra presentación, abrimos la consola con menú lateral. Seleccionamos el comando en el menú lateral, vemos cómo se escribe en la línea de comando `franco@taskflow-e2e:~$` y presionamos **[Enter]**:*
>
> *Observemos la ejecución concurrente en tiempo real con navegadores visibles sobre nuestros tres targets de prueba: **Desktop Chromium**, **Desktop Firefox** y emulación móvil de **Mobile Chrome (Pixel 5)**:*
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
**Pantalla a Compartir:** Diapositiva 14 (Temario), Diapositiva 15 (Consola AI Auto-Healing), Diapositiva 16 (Trace Viewer en Iframe) y Diapositiva 17 (Cierre).

---

### 4.1 La Fragilidad de Selectores en la Industria (Flakiness) (`20:30 - 22:00`)
> **[En Pantalla: Diapositiva 14 — Temario Bloque 4: QA Adaptativo, Resiliencia Semántica y Auto-Healing con LLMs]**
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
> **[En Pantalla: Diapositiva 14 (subtema) o modal de TaskFlow alternando entre modo v1 y modo v2]**
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
> **[En Pantalla: Diapositiva 15 — Auto-Healing Autónomo Asistido por LLMs. Nicolás hace clic en '▶ Abrir Consola AI Auto-Healing (Modal)'. Se abre la consola dedicada de Inteligencia Artificial con menú lateral a la derecha. Nicolás interactúa con los 3 comandos secuenciales: selecciona '1. Cargar Quiebre (v2)', se carga en el prompt 'nicolas@ai-healing:~$', pulsa [Enter] y observa el fallo en rojo; luego selecciona '2. Cargar Agente IA', pulsa [Enter] y observa la síntesis del selector semántico resiliente con 98% de confianza; y finalmente selecciona '3. Cargar Test Resiliente', pulsa [Enter] y observa la suite 100% en verde]**
>
> *"Pero, ¿qué sucede cuando la mutación es tan profunda que un test tradicional colapsa? Aquí entra en juego el **QA Adaptativo con Agentes de Inteligencia Artificial (Self-Healing Tests)**.*
>
> *Directamente desde nuestra presentación abrimos la consola de Auto-Healing con menú lateral:*
>
> *En el **Paso 1**, cargamos y ejecutamos la prueba frágil sobre la interfaz alterada UI v2: observen la consola, el test falla inmediatamente con un `TimeoutError` de 30 segundos porque `#btn-create-task` ya no existe. El pipeline de CI/CD se detendría aquí.*
>
> *En el **Paso 2**, activamos nuestro agente de Inteligencia Artificial (`llm-healing-demo.ts`): el agente captura el DOM mutado, recupera la intención de negocio original y, con un nivel de confianza del **98%**, sintetiza automáticamente el selector resiliente basado en el Árbol de Accesibilidad: `page.getByRole('button', { name: /Crear Tarea/i })`.*
>
> *Y finalmente en el **Paso 3**, verificamos la suite con el locator reparado: la prueba pasa 100% en verde, demostrando cómo la IA transforma un fallo costoso en una auto-reparación desatendida sin intervención manual."*

---

### 4.4 Observabilidad en Acción: Demostración de Trace Viewer (`25:45 - 27:15`)
> **[En Pantalla: Diapositiva 16 — Observabilidad Forense: Trace Viewer & HTML Reports. Nicolás hace clic en '▶ Abrir Playwright Trace Viewer (Modal)'. Se abre el modal con el reporte oficial y el Trace Viewer nativo de Playwright embebido en vivo en un iframe. Nicolás navega por los tests ejecutados, abre la traza interactiva e inspecciona la línea de tiempo, los DOM snapshots Before/After, el árbol accesible y las peticiones de red]**
>
> *"Para finalizar nuestra defensa técnica, queremos mostrar la herramienta de observabilidad más avanzada de Playwright: el **Trace Viewer**.*
>
> *Directamente desde la Diapositiva 16 abrimos el modal interactivo con el reporte y visor oficial de Playwright embebido en vivo:*
>
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
> **[En Pantalla: Diapositiva 17 — Conclusiones y los 4 Pilares de la Ingeniería de Pruebas: Arquitectura, Mantenibilidad, Resiliencia y Adaptabilidad. Enlace al repositorio GitHub y cierre del equipo]**
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
