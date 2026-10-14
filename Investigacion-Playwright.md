# Investigación y Fundamentos de Playwright

> **Documento de Investigación Conceptual y Técnica**  
> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Tema:** Automatización de pruebas E2E en SPAs y QA Adaptativo con Inteligencia Artificial  

---

## 1. Marco Fundamental de Indagación

Antes de escribir una sola línea de código o automatizar un clic, es indispensable responder las preguntas ontológicas y arquitectónicas sobre la herramienta.

### ¿Qué es?
**Playwright** es un framework moderno y de código abierto desarrollado por Microsoft diseñado para la automatización de navegadores web y la ejecución de pruebas de extremo a extremo (*End-to-End* o *E2E*), pruebas de integración y automatización de interfaces de usuario. Ofrece soporte para todos los motores de renderizado modernos (**Chromium**, **Firefox** y **WebKit** —Safari—) mediante APIs consistentes en TypeScript/JavaScript, Python, Java y C# (.NET).

### ¿Para qué sirve?
Sirve para:
1. **Verificar flujos completos de usuario:** Simular de forma idéntica cómo una persona real interactúa con la aplicación (compras, registros, transacciones financieras, formularios complejos).
2. **Prevenir regresiones funcionales:** Asegurar que los nuevos despliegues de código no rompan funcionalidades preexistentes.
3. **Validar compatibilidad entre plataformas y navegadores (*Cross-browser testing*):** Probar el mismo código de prueba sobre diferentes motores de renderizado sin cambiar la sintaxis del test.
4. **Probar escenarios avanzados de red y contexto:** Interceptar tráfico HTTP/HTTPS, mockear respuestas de API, simular desconexión de red (*offline*), geolocalizaciones y permisos de dispositivos.

### ¿Por qué existe? (El origen del problema)
La web cambió radicalmente en la última década. Pasamos de aplicaciones monolíticas con renderizado en el servidor (*Server-Side Rendering* clásico, donde cada clic provocaba una recarga completa de página) a **Single Page Applications (SPAs)** con frameworks reactivos (React, Vue, Angular, Svelte) y arquitecturas asincrónicas.

Las herramientas clásicas de testing automatizado (como Selenium WebDriver) fueron diseñadas para la web de recarga completa. Al enfrentarse a SPAs con hidratación asincrónica, micro-animaciones, renderizado condicional y mutaciones dinámicas del DOM, las suites de pruebas se volvieron lentas, frágiles e impredecibles (*flaky tests*). Playwright fue creado por el equipo original de Puppeteer en Microsoft para resolver estos problemas desde el nivel de protocolo del navegador.

### ¿Cuál es su objetivo?
Su objetivo central es proporcionar una plataforma de automatización de pruebas:
- **Confiable al 100% (*Zero-Flakiness*):** Eliminando pausas artificiales mediante sincronización determinista basada en eventos del navegador.
- **Rápida y paralelizable:** Aprovechando contextos aislados ligeros en lugar de procesos de navegador pesados.
- **Alineada a la web moderna:** Con soporte nativo para shadow DOM, iframes anidados, múltiples pestañas, autenticaciones complejas y depuración visual exhaustiva.

### ¿Cómo funciona a alto nivel?
Playwright opera **fuera del proceso del navegador** (*out-of-process*). Establece un canal de comunicación bidireccional permanente (vía **WebSockets**) directamente con las interfaces internas de depuración del motor del navegador (como el *Chrome DevTools Protocol* en Chromium o protocolos equivalentes desarrollados por Microsoft para Firefox y WebKit). 

A través de esta conexión, Playwright no "adivina" el estado de la página mediante sondeo periódico (*polling* HTTP), sino que **escucha directamente los eventos del ciclo de vida del motor de renderizado** (red inactiva, mutaciones del DOM, carga de fuentes, disponibilidad de interactividad).

### ¿Cuándo conviene usarlo (y cuándo no)?

| Escenario | ¿Conviene Playwright? | Justificación Arquitectónica |
| :--- | :---: | :--- |
| **Pruebas E2E de SPAs modernas** | **SÍ** | Gestión nativa de asincronismo, micro-frontends y mutaciones dinámicas del DOM. |
| **Flujos multi-usuario o multi-pestaña** | **SÍ** | Soporta múltiples `BrowserContext` y ventanas independientes en un solo test de forma simultánea. |
| **Pruebas de APIs e integración mixta** | **SÍ** | Permite invocar endpoints REST/GraphQL directamente y validar el estado visual en el mismo script. |
| **Pruebas unitarias de funciones o lógica de negocio** | **NO** | Levantar un navegador para probar una función pura es ineficiente; para esto se deben usar herramientas de ejecución directa en Node/V8 como Vitest o Jest. |
| **Soporte de navegadores obsoletos (ej. Internet Explorer)** | **NO** | Playwright solo soporta navegadores modernos con protocolos de depuración contemporáneos. |

---

## 2. Desarrollo Conceptual y Técnico de las Preguntas Clave

---

### Pregunta 1: ¿Qué problema histórico vino a resolver y cómo se diferencia de Selenium y Cypress?

Para entender el valor de Playwright es indispensable contrastar su diseño con las dos generaciones previas de herramientas de testing:

```
[Selenium WebDriver]  Test Script ---> (HTTP REST) ---> Browser Driver.exe ---> (HTTP/Internal) ---> Browser Process
                       (Lento, sin eventos nativos, sondeo constante, latencia acumulada)

[Cypress]             Test Script runs INSIDE the page iframe ---> Sandbox constraints
                       (Una sola pestaña, no soporta múltiples dominios nativos, corre dentro de la misma memoria JS)

[Playwright]          Test Script <==== (Single WebSocket / Bi-directional Protocol) ====> Browser Engine
                       (Rápido, eventos en tiempo real, control total de pestañas, red y procesos)
```

#### Tabla Comparativa Exhaustiva

| Característica | Selenium WebDriver | Cypress | Playwright |
| :--- | :--- | :--- | :--- |
| **Modelo de Comunicación** | HTTP Request/Response (WebDriver JSON Wire / W3C). Un comando = una petición HTTP. | Inyección dentro del hilo de ejecución de JavaScript del navegador (dentro de un iframe). | Socket bidireccional único (*WebSocket*) en tiempo real directamente con el protocolo del navegador. |
| **Velocidad de Ejecución** | Lenta, alta sobrecarga por latencia HTTP en cada acción. | Media/Rápida, pero limitada por el sandbox de JavaScript. | Extremadamente rápida (mínima sobrecarga por protocolo continuo). |
| **Soporte Multi-Pestaña / Multi-Ventana** | Sí, pero complejo y con cambio manual de punteros. | **No** (arquitectónicamente restringido a una única pestaña/ventana). | **Sí**, soporte de primer nivel para múltiples pestañas, ventanas y dominios en paralelo. |
| **Manejo de asincronismo en SPAs** | Requiere esperas explícitas manuales (`WebDriverWait`, `sleep`), generando pruebas inestables. | Mecanismo de reintentos interno sobre la cola de comandos de Cypress. | **Auto-waiting determinista** en cada acción sobre el ciclo de vida real del DOM y de la red. |
| **Soporte de Navegadores** | Todos (mediante drivers específicos de terceros). | Chromium, Firefox, WebKit (experimental/restringido). | **Chromium, Firefox y WebKit** con idéntico nivel de paridad y soporte. |
| **Aislamiento de pruebas** | Reinicio completo de proceso de navegador (muy pesado). | Limpia cookies y localStorage entre tests (mismo proceso de navegador). | **BrowserContexts:** Perfiles independientes efímeros, instanciados en milisegundos con aislamiento total. |

---

### Pregunta 2: ¿Cómo controla el navegador por debajo? (Arquitectura de Procesos)

Playwright define una jerarquía estricta de tres niveles para maximizar el rendimiento y el aislamiento:

```
+-------------------------------------------------------------+
|                          BROWSER                            |
| (Proceso principal del navegador: Chromium / WebKit / etc.) |
+-------------------------------------------------------------+
          |                                       |
          v                                       v
+-----------------------+               +-----------------------+
|    BrowserContext 1   |               |    BrowserContext 2   |
| (Sesión A: Usuario 1) |               | (Sesión B: Usuario 2) |
| - Cookies propias     |               | - Cookies propias     |
| - LocalStorage propio |               | - LocalStorage propio |
| - Cache aislada       |               | - Cache aislada       |
+-----------------------+               +-----------------------+
       |         |                                  |
       v         v                                  v
   [Page 1]  [Page 2]                            [Page 3]
  (Pestaña) (Pop-up)                            (Pestaña)
```

1. **`Browser`:** Es una instancia del proceso del navegador (ej. una instancia de Chromium lanzada). Arrancar un navegador toma tiempo (de 500ms a 2s) y consume memoria del sistema operativo. Playwright suele iniciar una única instancia de `Browser` por hilo de trabajo (*worker*).
2. **`BrowserContext`:** Es una sesión completamente aislada dentro del mismo navegador, equivalente a una ventana de navegación en modo incógnito. Cada contexto tiene sus propias cookies, almacenamiento local, caché y permisos. **Crear un nuevo `BrowserContext` toma menos de 10 milisegundos.** Esto permite ejecutar cada prueba en un entorno completamente limpio sin la sobrecarga de cerrar y volver a abrir el navegador.
3. **`Page`:** Representa una pestaña o ventana única dentro de un `BrowserContext`. Un contexto puede tener múltiples páginas abiertas que comparten la misma sesión (cookies), permitiendo probar flujos complejos como un pop-up de pago o una pestaña de confirmación.

---

### Pregunta 3: ¿Por qué elimina los tests intermitentes (*flaky tests*)?

El *flakiness* en las pruebas tradicionales ocurre casi siempre por una condición de carrera (*race condition*): el script de prueba intenta hacer clic en un botón antes de que el framework de frontend (React, Angular, etc.) haya terminado de enlazar el manejador de eventos (*event listener*) o mientras el botón todavía está animándose o cubierto por un *spinner* de carga.

Playwright elimina esto mediante dos conceptos:

#### 1. Locators Perezosos (*Lazy Locators*)
En Selenium, cuando se ejecuta `driver.findElement(By.id("btn"))`, la herramienta busca inmediatamente ese nodo en el DOM en ese microsegundo exacto. Si el nodo aún no existe, falla arrojando `NoSuchElementException`.

En Playwright, un `Locator` (`page.locator('button#submit')`) **no busca nada al momento de declararse**. Es una receta o descriptor que indica *cómo encontrar el elemento cuando sea necesario actuar sobre él*. La búsqueda real ocurre recién cuando se invoca una acción (ej. `.click()`, `.fill()`).

#### 2. Auto-waiting y Verificaciones de Accionabilidad (*Actionability Checks*)
Antes de realizar cualquier interacción sobre un elemento, Playwright ejecuta automáticamente y de forma síncrona las siguientes comprobaciones:

```
[Llamada a .click()]
       |
       +---> ¿El elemento está adjunto al DOM? (Attached)
       +---> ¿Es visible en la pantalla? (Visible)
       +---> ¿Su posición y tamaño son estables (no hay animaciones CSS corriendo)? (Stable)
       +---> ¿Está habilitado (no tiene atributo disabled)? (Enabled)
       +---> ¿Puede recibir eventos de puntero (no está tapado por un modal o loader)? (Receives Events)
       |
[Ejecutar Clic Real del Sistema Operativo]
```

Si alguna de estas condiciones no se cumple, Playwright espera y reintenta de forma continua dentro de un tiempo límite (*timeout* configurable, típicamente 30 segundos). **Por esta razón, en Playwright está terminantemente desaconsejado e innecesario utilizar pausas artificiales (`sleep()` o `waitForTimeout()`).**

---

### Pregunta 4: ¿Cómo se estructura el código para que sea mantenible? (Patrones de Arquitectura)

Automatizar sin arquitectura genera "código espagueti" donde cualquier cambio mínimo en el diseño rompe cientos de tests. Playwright promueve dos patrones fundamentales:

#### 1. Page Object Model (POM)
Es un patrón de diseño que abstrae la interfaz gráfica en clases de objetos. Una clase representa una página o componente visual y encapsula:
- La localización de los elementos de esa pantalla.
- Las operaciones o acciones que un usuario puede realizar en ella.

Las pruebas nunca interactúan directamente con los selectores del DOM; interactúan con los métodos de la clase POM:

```typescript
// Mala práctica (selectores dispersos en el test):
test('login exitoso', async ({ page }) => {
  await page.locator('#user-input-23').fill('admin');
  await page.locator('.btn-primary-login').click();
  await expect(page.locator('.welcome-banner')).toBeVisible();
});

// Buena práctica con Page Object Model:
test('login exitoso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin', 'password123');
  await expect(loginPage.welcomeBanner).toBeVisible();
});
```

#### 2. Fixtures (Inyección de Dependencias)
Los *fixtures* de Playwright permiten preparar el entorno de ejecución previo a las pruebas de forma modular, reutilizable y declarativa. Permiten inyectar páginas autenticadas, datos de prueba o instancias de Page Objects sin repetir código de configuración (*setup*) ni limpieza (*teardown*):

```typescript
// Extensión de test con fixtures personalizados
export const test = base.extend<{ adminPage: AdminDashboardPage }>({
  adminPage: async ({ page }, use) => {
    // Setup: autenticar como admin antes del test
    const admin = new AdminDashboardPage(page);
    await admin.loginAsAdmin();
    // Proveer el fixture al test
    await use(admin);
    // Teardown: limpieza post-test
    await admin.cleanupData();
  },
});
```

---

### Pregunta 5: ¿Cómo se diagnostican fallos en CI/CD? (Observabilidad con Trace Viewer)

Uno de los mayores dolores de cabeza en testing es cuando una prueba pasa localmente pero falla en el servidor de integración continua (*CI*), donde no hay pantalla ni interfaz gráfica que mirar.

Playwright resuelve esto mediante el **Trace Viewer**: una herramienta de instrumentación y diagnóstico que graba la ejecución completa de la prueba en un archivo comprimido (`trace.zip`).

El Trace Viewer permite realizar **depuración por viaje en el tiempo (*time-travel debugging*)**:
- **DOM Snapshots interactivos:** Permite explorar el árbol HTML real tal como estaba exactamente antes y después de cada acción individual (no es una simple captura estática, es el DOM renderizable).
- **Línea de tiempo visual (*Timeline*):** Muestra miniaturas de la pantalla a lo largo de cada milisegundo de ejecución.
- **Tráfico de Red completo:** Registra cada petición HTTP/WebSocket con sus encabezados, parámetros, tiempos de respuesta y cuerpos recibidos.
- **Consola del Navegador y Logs:** Muestra errores de JavaScript del navegador sincronizados cronológicamente con las acciones de la prueba.

---

### Pregunta 6: ¿Por qué entra la Inteligencia Artificial? (QA Adaptativo en SPAs)

#### El problema de las SPAs para los selectores tradicionales
En una SPA moderna:
- Los identificadores (`id`) y clases CSS suelen ser autogenerados o calculados dinámicamente durante el build (ej. `.Button_btn__a8f9d` en CSS Modules, o clases de utilidad de Tailwind que cambian con cualquier refactor visual).
- El contenido se renderiza condicionalmente en el cliente, mutando la estructura del árbol de componentes constantemente.
- Un cambio menor de maquetación por parte del equipo de frontend rompe los selectores tradicionales basados en rutas jerárquicas (XPath o selectores CSS rígidos).

#### ¿Qué es el QA Adaptativo?
El **QA Adaptativo** es un paradigma de testing donde los scripts de prueba no están rígidamente acoplados a la estructura estática del código HTML, sino que **comprenden la semántica y el propósito funcional de la interfaz**, adaptándose dinámicamente a cambios menores de diseño sin fallar ni requerir intervención manual constante.

#### ¿Cómo interactúa un Modelo de Lenguaje (LLM) con Playwright?
Existen tres áreas de convergencia técnica entre Playwright y los modelos de lenguaje:

1. **Inferencia de Selectores Semánticos y de Accesibilidad:**  
   Los LLMs son capaces de inspeccionar fragmentos de DOM y generar selectores orientados a la accesibilidad del usuario (como `getByRole('button', { name: 'Comprar' })`, `getByLabel('Correo electrónico')`) en lugar de selectores frágiles. Playwright promueve nativamente este tipo de selectores como su primera recomendación de diseño.

2. **Auto-sanación de Pruebas (*Self-Healing Tests*):**  
   Cuando un selector falla durante la ejecución, un agente o modelo de lenguaje puede recibir:
   - El selector original que falló.
   - La intención del paso (ej. *"Hacer clic en el botón de confirmación de pago"*).
   - El snapshot del DOM actual en el momento del fallo.  
   El modelo analiza las mutaciones, localiza el elemento funcional equivalente y sugiere o ajusta el nuevo locator en tiempo real, permitiendo que la suite continúe su ejecución y emita una advertencia de mantenimiento en lugar de detener la tubería de despliegue.

3. **Generación Adaptativa de Casos de Prueba:**  
   A partir de una especificación en lenguaje natural o historias de usuario (*user stories*), el modelo genera la suite de pruebas completa en Playwright, mapeando los criterios de aceptación directamente a flujos funcionales con aserciones rigurosas.

---

## 3. Resumen Ejecutivo para la Presentación

Para la exposición del video del trabajo práctico, la narrativa debe estructurarse en tres bloques lógicos:

1. **Bloque Conceptual (Fundamentos y Arquitectura):**  
   Explicar la evolución de la web (de estática a SPAs), por qué Selenium/Cypress sufren de latencia y flakiness, y cómo el socket bidireccional, los contextos aislados y el auto-waiting de Playwright resuelven el problema de raíz.
2. **Bloque Metodológico (Mantenibilidad y Observabilidad):**  
   Demostrar el uso de Page Object Model para no atar los tests a la UI, la potencia de los Fixtures y cómo el Trace Viewer permite diagnosticar fallos desatendidos con viajes en el tiempo sobre el DOM.
3. **Bloque Innovador (QA Adaptativo e Inteligencia Artificial):**  
   Demostrar el impacto de los cambios de DOM en SPAs y explicar cómo la IA generativa permite crear suites adaptativas con selectores semánticos y capacidades de auto-recuperación.
