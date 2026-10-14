# SDD Spec — Fase 5: QA Adaptativo, Resiliencia de Selectores & Self-Healing con IA

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 5 de 6  
> **Estado:** Aprobada para Implementación  
> **Área:** Resiliencia de Pruebas E2E, Accesibilidad Semántica y Auto-Healing con LLMs  

---

## 1. Fundamentación Teórica y Ontológica (Para el Video de Exposición)

### El Problema de la Automatización Tradicional: Fragilidad de Selectores (Flakiness)
En la industria del software, más del 60% del tiempo de mantenimiento en equipos de QA se consume reparando pruebas rotas debido a cambios menores en el DOM, refactorizaciones de CSS o renombrado de identificadores internos (`id`, `class`, `xpath`).
- Los frameworks de primera generación (Selenium, WebDriver convencional) fomentaron el uso de selectores acoplados a la implementación interna:
  ```xpath
  //div[@class='task-grid']/div[1]/button[@id='btn-create-task']
  ```
- Cuando el equipo de frontend migra de CSS puro a Tailwind, CSS Modules o altera las clases por optimizaciones de build (minificación/hashing), **las pruebas automatizadas fallan sin que exista un bug real de negocio**.

### La Solución de Playwright: Selectores Orientados al Árbol de Accesibilidad
Playwright revoluciona este paradigma introduciendo **Locators Semánticos y Accesibles** (`getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`):
- En lugar de inspeccionar el árbol DOM estático, Playwright consulta el **Árbol de Accesibilidad (Accessibility Tree)** expuesto por el motor del navegador.
- Si un botón sigue siendo semánticamente un `<button>` con el texto visible `"Crear Tarea"` o `aria-label="Crear Tarea"`, el locator de Playwright **no se rompe**, sin importar si sus clases cambiaron de `.btn-create` a `.act_btn_new_item_99f`.

### El Nuevo Paradigma: QA Adaptativo & Self-Healing con Inteligencia Artificial
Cuando una interfaz sufre una mutación radical donde incluso la semántica cambia, los agentes de IA (como LLMs integrados en pipelines CI/CD) permiten el **Auto-Healing**:
1. El test falla y emite el selector quebrado junto con el snapshot del Accessibility Tree y el error context.
2. Un modelo LLM analiza la intención del usuario (User Intent) y localiza el nuevo elemento candidato con máxima similitud semántica.
3. El agente genera el parche del locator en tiempo de real, evitando falsos positivos en el pipeline de despliegue.

---

## 2. Alcance y Arquitectura de la Fase 5

La implementación de esta fase se divide en 3 componentes especializados dentro del directorio `e2e/ai-adaptive/`:

```
e2e/ai-adaptive/
├── fragile-selectors.spec.ts     # Demuestra la rotura de selectores tradicionales al mutar a UI v2
├── adaptive-semantic.spec.ts     # Demuestra la resiliencia absoluta de los locators semánticos en v1 y v2
└── llm-healing-demo.ts           # Módulo autónomo de auto-healing y análisis de intención con IA
```

---

## 3. Especificación de Escenarios y Comportamientos

### Escenario 5.1 — Fragilidad de Selectores Tradicionales (`fragile-selectors.spec.ts`)
- **Objetivo:** Evidenciar que los selectores rígidos (IDs y clases CSS frágiles) funcionan en UI v1 pero colapsan en UI v2.
- **Caso A (v1 Estándar):**
  - Navega al Dashboard en modo v1.
  - Interactúa mediante `#input-search-tasks`, `#btn-create-task` y `.task-card`.
  - **Resultado esperado:** Pasa exitosamente.
- **Caso B (v2 Mutado - Demostración de Falla):**
  - Alterna la aplicación a modo UI `v2 (Rediseño Alterado)` haciendo clic en el switch de la Navbar.
  - Intenta localizar `#btn-create-task` o `.task-card`.
  - **Resultado esperado:** Falla por `TimeoutError` al no encontrar el ID obsoleto, probando la fragilidad del acoplamiento a detalles de implementación.

---

### Escenario 5.2 — Resiliencia de Selectores Semánticos de Playwright (`adaptive-semantic.spec.ts`)
- **Objetivo:** Demostrar que los locators semánticos y el Page Object Model de Playwright resisten la mutación de la interfaz sin cambiar una sola línea de código de prueba.
- **Flujo en v1:**
  - Login y navegación a Dashboard.
  - Filtrado de tareas con `getByRole('searchbox', { name: /Buscar tareas/i })`.
  - Apertura de modal con `getByRole('button', { name: /Crear Tarea/i })`.
  - Conteo de tarjetas con `getByRole('article')`.
  - **Resultado:** Pasa 100%.
- **Flujo idéntico en v2:**
  - Alterna a UI v2 (`v2 (Rediseño Alterado)`).
  - Ejecuta exactamente las mismas aserciones e interacciones semánticas.
  - **Resultado:** Pasa 100% sin romperse, demostrando la resiliencia de Playwright.

---

### Escenario 5.3 — Demostración de Self-Healing con IA (`llm-healing-demo.ts`)
- **Objetivo:** Proveer una herramienta de simulación pedagógica ejecutable para el video explicativo que muestre cómo un agente LLM diagnostica y repara un selector quebrado.
- **Entradas:**
  - Selector roto: `#btn-create-task`
  - Fragmento del DOM / Árbol de Accesibilidad de la versión mutada (UI v2).
  - Error recibido: `TimeoutError: locator.click: Timeout 5000ms exceeded waiting for locator('#btn-create-task')`.
- **Proceso del Agente de Auto-Healing:**
  1. Extrae los nodos interactivos candidatos (`<button>`, `<a>`, `[role="button"]`).
  2. Calcula similitud semántica y correspondencia de intención (e.g. texto `"Crear Tarea"`, accesibilidad `aria-label`).
  3. Diagnostica la mutación: `#btn-create-task` cambió a `id="act_btn_new_item_99f"`, pero mantiene el rol accesible `button` y nombre `Crear Tarea`.
  4. Formula la recomendación técnica y genera el código corregido usando las mejores prácticas de Playwright:
     ```typescript
     // Selector frágil reparado autónomamente por IA:
     page.getByRole('button', { name: /Crear Tarea/i })
     ```
- **Salida:**
  - Diagnóstico estructurado en consola y archivo de reporte JSON/Markdown apto para mostrar en el video grupal.

---

## 4. Criterios de Aceptación y Verificación

1. **Prueba de Fragilidad:**
   - En UI v1, la prueba tradicional pasa.
   - En UI v2, la prueba tradicional falla deterministamente con timeout documentado.
2. **Prueba Semántica Resiliente:**
   - Pasa tanto en v1 como en v2 sin excepciones ni parches ad-hoc.
3. **Módulo de Self-Healing:**
   - Puede ejecutarse vía CLI (`npx tsx e2e/ai-adaptive/llm-healing-demo.ts` o equivalente) produciendo un informe claro, pedagógico y estructurado con el antes y después de la reparación.
