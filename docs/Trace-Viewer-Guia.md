# Guía de Observabilidad y Debugging con Playwright Trace Viewer

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Proyecto:** TaskFlow — Suite de Automatización E2E & QA Adaptativo  
> **Propósito:** Documento de referencia técnica para el Bloque 4 del video de exposición  

---

## 1. ¿Qué es Trace Viewer y por qué supera a los logs tradicionales?

En la automatización de pruebas de software, cuando un test falla en un entorno desatendido (como un pipeline de CI/CD), los desarrolladores tradicionalmente contaban con dos artefactos deficientes:
1. **Un stacktrace de texto:** Indica la línea donde se produjo el error, pero no el estado visual ni de red de la aplicación.
2. **Una captura de pantalla estática (`screenshot.png`):** Muestra una imagen congelada al momento del timeout, pero no permite inspeccionar el DOM, ni saber qué peticiones de red estaban pendientes, ni interactuar con los elementos.

**Playwright Trace Viewer** resuelve este problema mediante la captura de una **traza interactiva completa serializada (`trace.zip`)**. Al abrirla, el desarrollador cuenta con una réplica exacta del navegador que permite hacer **time-travel debugging** (viajar en el tiempo) a lo largo de cada milisegundo de la prueba.

---

## 2. Comandos para Generar y Visualizar Trazas

### A. Generar Trazas Bajo Demanda
Para registrar la traza completa de una suite específica o de todas las pruebas:
```bash
# Ejecutar suite con grabación de trazas activada
npm run test:e2e:trace-record

# O ejecutar un archivo específico en un navegador determinado:
npx playwright test e2e/tests/01-pom-verification.spec.ts --project="Desktop Chromium" --trace on
```

### B. Abrir Trace Viewer en Interfaz Gráfica
```bash
# Abrir un archivo de traza específico:
npx playwright show-trace test-results/tests-01-pom-verification--61fea-eliminar-tarea-mediante-POM-Desktop-Chromium/trace.zip

# O abrir el reporte HTML interactivo (que incluye los enlaces a las trazas):
npm run test:e2e:report
```

---

## 3. Anatomía y Paneles de Trace Viewer (Para Exponer en el Video)

Al abrir una traza en Trace Viewer, la interfaz se divide en 5 áreas fundamentales:

### 1. Tira de Película y Línea de Tiempo (Filmstrip & Timeline)
- Ubicada en la parte superior.
- Muestra miniaturas visuales de la pantalla en cada milisegundo.
- Al pasar el cursor sobre la línea temporal, la vista principal se actualiza mostrando el estado visual exacto en ese instante.
- Permite detectar retrasos de renderizado (*layout shifts*) y tiempos de respuesta de animaciones.

### 2. Panel de Acciones (Actions Panel - Columna Izquierda)
- Lista cronológica de todas las llamadas realizadas por el test:
  - `page.goto('/')`
  - `locator.fill('admin@taskflow.dev')`
  - `locator.click()`
  - `expect(locator).toBeVisible()`
- Cada acción detalla su duración exacta en milisegundos y el estado de resolución (*passed* o *failed*).

### 3. Vista de Instantáneas del DOM (DOM Snapshots - Centro)
- **No es una imagen estática:** Es un DOM real interactivo dentro de un iframe seguro.
- Dispone de 3 pestañas esenciales:
  - **Before:** Estado del DOM un instante antes de ejecutar la acción (por ejemplo, el botón antes de ser presionado).
  - **Action:** El instante exacto del impacto del evento del puntero o teclado.
  - **After:** Estado del DOM inmediatamente posterior a la acción (por ejemplo, el modal abriéndose o el spinner apareciendo).
- Permite hacer clic derecho e **inspeccionar elementos**, verificar atributos ARIA y probar nuevos selectores directamente en la consola de Playwright.

### 4. Pestaña de Red (Network Interceptor - Panel Inferior)
- Registro completo de tráfico HTTP/HTTPS y WebSockets generado durante la prueba.
- Cada petición incluye:
  - Método (`GET`, `POST`, `DELETE`).
  - URL y recurso solicitado.
  - Código de estado (`200 OK`, `401 Unauthorized`, etc.).
  - Duración y *waterfall* de latencia.
  - Cabeceras de solicitud y respuesta, y el cuerpo JSON del payload.
- **Utilidad clave en QA:** Permite distinguir de inmediato si un test falló por un error de renderizado en el frontend o por una respuesta errónea (`500 Server Error` o timeout) de la API backend.

### 5. Consola y Registro de Metadatos (Console, Log & Source)
- **Console:** Muestra todos los mensajes de `console.log`, advertencias y errores de JavaScript que ocurrieron en la ventana del navegador.
- **Log:** Registro detallado del algoritmo de **Auto-waiting** de Playwright:
  - Verificación de visibilidad del elemento.
  - Verificación de estabilidad del DOM (sin animaciones pendientes).
  - Verificación de recepción de eventos (el elemento no está tapado por otro).
  - Verificación de habilitación (`enabled`, no `disabled`).
- **Source:** Muestra el código TypeScript de la prueba y resalta la línea exacta asociada a la acción seleccionada.

---

## 4. Guía Rápida para el Guion del Video (Bloque 4)

1. **Apertura del bloque:**
   > *"A continuación demostramos la herramienta de observabilidad más potente de Playwright: el Trace Viewer."*
2. **Ejecución del comando:**
   > Mostrar la terminal corriendo `npx playwright show-trace <ruta-al-trace.zip>`.
3. **Navegación en vivo:**
   - Hacer clic en la acción de login y mostrar las pestañas **Before** y **After**.
   - Resaltar cómo Playwright espera que el spinner desaparezca antes de continuar.
   - Abrir la pestaña **Network** y mostrar la petición simulada de login resolviendo en 200 OK.
   - Mostrar la pestaña **Log** para evidenciar los chequeos de accionabilidad (*actionability checks*) automáticos.
4. **Cierre pedagógico:**
   > *"Esta capacidad elimina por completo el 'it works on my machine' en equipos ágiles, reduciendo el tiempo medio de resolución de bugs (MTTR) de horas a minutos."*
