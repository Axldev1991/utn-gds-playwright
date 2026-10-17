# Contenido y Diseño de Diapositivas para la Exposición

> **Materia:** Gestión de Desarrollo de Software (GDS) — Universidad Tecnológica Nacional (UTN)  
> **Tema:** Automatización de Pruebas E2E con Microsoft Playwright & QA Adaptativo con Inteligencia Artificial  
> **Objetivo:** Material de diapositivas listo para usar o copiar a PowerPoint / Google Slides / Canva, y disponible de forma interactiva en [diapositivas.html](file:///c:/Users/Usuario/Desktop/GDS/utn-gds-playwright/diapositivas.html).  

---

## 🗺️ Mapa de Diapositivas en la Presentación

| N° Diapositiva | Bloque y Expositor | Título | Propósito en el Video |
| :---: | :--- | :--- | :--- |
| **Diapositiva 1** | **Bloque 1** (Axel Castellano) | **Portada Oficial del Trabajo Práctico** | Apertura, presentación formal del equipo, materia, AUT y repositorio. |
| **Diapositiva 2** | **Bloque 1** (Axel Castellano) | **Las 6 Dimensiones Ontológicas de Playwright** | Fundamentación teórica rigurosa (Qué, Para qué, Por qué, Objetivo, Cómo y Cuándo). |
| **Diapositiva 3** | **Bloque 1** (Axel Castellano) | **Comparativa Arquitectónica: Playwright vs Selenium vs Cypress** | Diagrama de protocolos (WebSocket vs HTTP REST vs Iframe) y jerarquía de procesos. |
| **Diapositiva 4** | **Bloque 4** (Nicolás Rumie) | **Fragilidad de Selectores y QA Adaptativo: DOM vs A11y Tree** | Justificación teórica del flakiness tradicional y la resiliencia del Árbol de Accesibilidad. |
| **Diapositiva 5** | **Bloque 4** (Nicolás Rumie) | **Conclusiones del Proyecto y Cierre Formal** | Resumen de los 4 pilares demostrados, enlace al repositorio y despedida. |

---

# 📄 DIAPOSITIVA 1: Portada Oficial del Proyecto

* **Momento de exposición:** `00:00 - 01:15` (Bloque 1 - Axel Castellano)
* **Diseño visual sugerido:** Fondo azul marino oscuro institucional, tipografía sans-serif moderna, isotipos o logos de UTN y Playwright, tarjetas destacadas con los nombres de los integrantes.

### 📌 Contenido Visual:

```
+-----------------------------------------------------------------------------------------+
|  UNIVERSIDAD TECNOLÓGICA NACIONAL (UTN)                                                 |
|  Cátedra: Gestión de Desarrollo de Software (GDS)                                       |
|                                                                                         |
|      AUTOMATIZACIÓN DE PRUEBAS E2E CON MICROSOFT PLAYWRIGHT                             |
|              & QA ADAPTATIVO CON INTELIGENCIA ARTIFICIAL                                |
|                                                                                         |
|  Testing de Alta Confiabilidad y Resiliencia Semántica en SPAs Modernas                 |
|  Aplicación Bajo Prueba (AUT): TaskFlow — Sprint Management SPA                         |
+-----------------------------------------------------------------------------------------+
|  INTEGRANTES DEL EQUIPO:                                                                |
|  • Castellano Gutiérrez Axel   (@Axldev1991) — Arquitectura y Fundamentos               |
|  • Fernandez Ibarguren Saulo   (@serenomoon) — Asincronismo y SPA TaskFlow              |
|  • Franco Martin Esposito      (@francoesposito) — Page Object Model & Flujos E2E       |
|  • Nicolas Rumie Vitar         (@nicolasrumie) — QA Adaptativo, IA & Trace Viewer       |
|                                                                                         |
|  Repositorio Oficial: https://github.com/Axldev1991/utn-gds-playwright                  |
+-----------------------------------------------------------------------------------------+
```

### 🎙️ Notas para el Orador (Axel):
> Saludar formalmente a los docentes de GDS. Presentar al equipo y resaltar que para este trabajo no se usó un sitio estático trivial, sino que se desarrolló desde cero una SPA completa llamada **TaskFlow** para someterla a pruebas rigurosas.

---

# 📄 DIAPOSITIVA 2: Las 6 Dimensiones Ontológicas de Playwright

* **Momento de exposición:** `01:15 - 03:45` (Bloque 1 - Axel Castellano)
* **Diseño visual sugerido:** Cuadrícula de 6 tarjetas (2 filas x 3 columnas) con iconos y títulos destacados para cada pregunta ontológica.

### 📌 Contenido Visual:

#### Tarjeta 1: ¿Qué es?
* **Framework moderno E2E** de código abierto desarrollado y mantenido por Microsoft.
* Soporte nativo multiplataforma: **Chromium, Firefox y WebKit (Safari)**.
* API unificada en TypeScript, JavaScript, Python, .NET y Java.

#### Tarjeta 2: ¿Para qué sirve?
* Verificar **flujos de negocio reales** simulando acciones humanas fidelignas.
* Prevenir regresiones funcionales en pipelines de Integración Continua (CI/CD).
* Validar compatibilidad cross-browser, emulación móvil y auditorías de accesibilidad.

#### Tarjeta 3: ¿Por qué surge? (El Problema Histórico)
* La web evolucionó hacia SPAs hiper-reactivas basadas en Virtual DOM y asincronismo continuo.
* Las herramientas clásicas (Selenium WebDriver) provocaron una epidemia industrial: **Flakiness** (pruebas inestables que fallan por desincronización temporal).
* Playwright surge para erradicar el flakiness desde la raíz del motor del navegador.

#### Tarjeta 4: ¿Cuál es su Objetivo?
* Lograr pruebas **100% deterministas, rápidas y confiables (Zero-Flakiness)**.
* Eliminar por completo los hacks temporales como `sleep()` artificiales.
* Integración nativa con pipelines de CI/CD modernos.

#### Tarjeta 5: ¿Cómo funciona por debajo?
* Conexión persistente y bidireccional por **WebSockets**.
* Comunicación directa con las APIs internas de depuración del navegador (**Chrome DevTools Protocol - CDP** en Chromium y equivalentes en Gecko y WebKit).
* Escucha eventos nativos del ciclo de vida en vez de hacer sondeo ciego (polling HTTP).

#### Tarjeta 6: ¿Cuándo conviene usarlo (y cuándo no)?
* **SÍ:** Pruebas E2E de SPAs complejas, flujos multi-usuario, intercepción de red, shadow DOM.
* **NO:** Pruebas unitarias de funciones puras o lógica algorítmica aislada (para esto se deben usar Vitest o Jest, que corren en Node sin el costo de abrir navegadores).

### 🎙️ Notas para el Orador (Axel):
> Recorrer con naturalidad las 6 tarjetas. Hacer especial énfasis en la tarjeta 3 (el problema del Flakiness) y la tarjeta 5 (el socket continuo por WebSockets con CDP).

---

# 📄 DIAPOSITIVA 3: Comparativa Arquitectónica de Protocolos

* **Momento de exposición:** `03:45 - 06:30` (Bloque 1 - Axel Castellano)
* **Diseño visual sugerido:** 3 columnas comparando la arquitectura física de cada herramienta, seguidas de una tabla resumen y una tarjeta sobre la jerarquía de procesos.

### 📌 Contenido Visual:

#### 1. Diagrama Arquitectónico Comparativo:
```
[ SELENIUM WEBDRIVER ]  (HTTP REST / 3 Capas)
Test Script ---> HTTP Request ---> chromedriver.exe ---> Browser Process
* Cada comando es una petición HTTP independiente (alta latencia acumulada).
* Desconoce el ciclo de vida del DOM (requiere esperas explícitas manuales).

[ CYPRESS ]  (In-Browser Runner / Sandbox de Iframe)
Browser Window ---> [ Iframe: Test Script + Application JS ]
* Corre dentro del mismo hilo de JavaScript de la aplicación.
* Restringido por el sandbox: no soporta múltiples pestañas ni dominios cruzados.

[ MICROSOFT PLAYWRIGHT ]  (Out-of-Process / WebSocket Nativo)
Test Script <====== (Canal Único Bidireccional WebSocket: CDP) ======> Browser Engine
* Corre fuera del proceso con control total del navegador.
* Eventos nativos en tiempo real, baja latencia, multi-tab y multi-contexto nativo.
```

#### 2. Tabla Comparativa Rápida:
| Criterio | Selenium WebDriver | Cypress | Microsoft Playwright |
| :--- | :--- | :--- | :--- |
| **Protocolo de Comunicación** | HTTP REST (W3C WebDriver) | Inyección en hilo JS (Iframe) | **WebSocket bidireccional (CDP)** |
| **Velocidad y Latencia** | Lenta (sobrecarga HTTP por acción) | Media (limitada por sandbox) | **Ultra rápida (tiempo real)** |
| **Soporte Multi-Pestaña** | Complejo (cambio manual de punteros) | **No soportado nativamente** | **Nativo de primer nivel** |
| **Sincronización en SPAs** | Manual (`Thread.sleep`, `wait`) | Cola de reintentos interna | **Auto-waiting determinista** |
| **Aislamiento de Pruebas** | Reinicio completo del navegador (~2s) | Limpieza de estado en mismo browser | **BrowserContext efímero (<10ms)** |

#### 3. Jerarquía de Procesos en Playwright:
* **`Browser`:** Proceso pesado del sistema operativo (se inicia una sola vez por worker).
* **`BrowserContext`:** Perfil aislado tipo incógnito (cookies, localStorage y caché propios). **Se crea en menos de 10 milisegundos**.
* **`Page`:** Pestaña o ventana individual dentro de un contexto.

### 🎙️ Notas para el Orador (Axel):
> Explicar que la velocidad de Playwright no es magia, sino arquitectura: WebSocket directo vs peticiones HTTP repetitivas de Selenium. Explicar por qué los `BrowserContext` permiten correr 100 pruebas en paralelo sin saturar la RAM. Dar el pase a Saulo.

---

# 📄 DIAPOSITIVA 4: Fragilidad de Selectores y QA Adaptativo

* **Momento de exposición:** `20:30 - 22:00` (Bloque 4 - Nicolás Rumie)
* **Diseño visual sugerido:** Comparativa de 2 columnas enfrentadas: "Enfoque Tradicional Frágil" (rojo/alerta) vs "Enfoque Adaptativo Semántico" (verde/resiliente).

### 📌 Contenido Visual:

```
+-----------------------------------------+-----------------------------------------+
|     ENFOQUE TRADICIONAL FRÁGIL          |       ENFOQUE DE QA ADAPTATIVO          |
|    (Acoplado al Árbol DOM Interno)      |    (Acoplado al Árbol de Accesibilidad) |
+-----------------------------------------+-----------------------------------------+
| • Selectores basados en detalles de     | • Selectores basados en la intención    |
|   implementación:                       |   del usuario y roles ARIA:             |
|   - IDs sintéticos: #btn-create-task    |   - Roles semánticos: role="button"     |
|   - Clases CSS utilitarias: .btn-blue   |   - Nombres accesibles: 'Crear Tarea'   |
|   - Rutas XPath: //div[2]/div/button    |   - Textos visibles y etiquetas (label) |
|                                         |                                         |
| • Vulnerable a refactorizaciones:       | • Resiliente a cambios visuales:        |
|   - Cambios de clases por Tailwind      |   - El botón puede mutar de ID o clase, |
|   - Hashes dinámicos de bundlers        |     pero sigue siendo un "button" con   |
|   - Reestructuración de divs anidados   |     el nombre "Crear Tarea".            |
|                                         |                                         |
| ❌ Consecuencia:                        | ✅ Consecuencia:                        |
|    60% del tiempo de QA perdido en      |    Tests resilientes, sin flakiness,    |
|    mantenimiento de tests falsos rotos. |    con cero costo de mantenimiento.     |
+-----------------------------------------+-----------------------------------------+
```

#### El Experimento en la SPA TaskFlow:
* **UI v1 (Estándar):** IDs fijos `#btn-create-task` $\rightarrow$ El test tradicional pasa.
* **UI v2 (Rediseño Alterado):** IDs mutan a `#act_btn_new_item_99f` $\rightarrow$ El test tradicional **colapsa por TimeoutError**.
* **Test Semántico Playwright:** `page.getByRole('button', { name: /Crear Tarea/i })` $\rightarrow$ **Pasa al 100% en ambas versiones**.

### 🎙️ Notas para el Orador (Nicolás):
> Explicar que el QA moderno no mira el código HTML interno del programador frontend, sino lo que ve el usuario y lo que expone el Árbol de Accesibilidad. Esto da pie a la demo práctica en vivo.

---

# 📄 DIAPOSITIVA 5: Conclusiones del Proyecto y Cierre

* **Momento de exposición:** `27:15 - 28:00` (Bloque 4 - Nicolás Rumie)
* **Diseño visual sugerido:** 4 tarjetas con los 4 pilares demostrados, enlace grande al repositorio de GitHub y agradecimiento institucional a la cátedra.

### 📌 Contenido Visual:

```
+-----------------------------------------------------------------------------------------+
|                              CONCLUSIONES DEL PROYECTO                                  |
|                                                                                         |
|  [ 1. ARQUITECTURA DE SOFTWARE ]        |  [ 2. SINCRONIZACIÓN DETERMINISTA ]           |
|  • Page Object Model (POM) desacoplado  |  • Eliminación total de sleeps artificiales   |
|  • Inversión de Control con Fixtures    |  • Motor nativo de Auto-Waiting (5 checks)    |
|  • Pruebas BDD limpias y mantenibles    |  • Web-First Assertions con retry automático  |
|-----------------------------------------+-----------------------------------------------|
|  [ 3. QA ADAPTATIVO & IA ]              |  [ 4. OBSERVABILIDAD TOTAL ]                  |
|  • Resiliencia vía Accessibility Tree   |  • Time-Travel Debugging con Trace Viewer     |
|  • Inmunidad ante rediseños de UI v2    |  • DOM interactivo serializado (Before/After) |
|  • Agente de Auto-Healing con LLMs      |  • Auditoría completa de red y logs           |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       TODO EL CÓDIGO FUENTE, SUITES DE PRUEBA Y TRAZAS ESTÁN DISPONIBLES EN:            |
|                👉 https://github.com/Axldev1991/utn-gds-playwright                      |
|                                                                                         |
|       ¡Muchas gracias por su atención! — Quedamos abiertos a preguntas técnicas         |
+-----------------------------------------------------------------------------------------+
```

### 🎙️ Notas para el Orador (Nicolás):
> Resumir los 4 pilares con seguridad y orgullo técnico. Agradecer a los profesores de Gestión de Desarrollo de Software de la UTN e invitar a la ronda de preguntas de defensa.
