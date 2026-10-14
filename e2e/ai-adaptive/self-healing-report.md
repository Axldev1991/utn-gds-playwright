# Reporte de Auto-Healing con Inteligencia Artificial (QA Adaptativo)

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fecha de Análisis:** 2026-10-14T15:59:06.319Z  
> **Estado:** Reparación Exitosa (Self-Healed)  

---

## 1. Contexto del Fallo Detectado en CI/CD

| Parámetro | Detalle |
| :--- | :--- |
| **Archivo de Prueba:** | `e2e/ai-adaptive/fragile-selectors.spec.ts` |
| **Paso Quebrado:** | `Abrir modal de nueva tarea` |
| **Selector Fallido:** | `#btn-create-task` |
| **Excepción:** | `TimeoutError: locator.click: Timeout 5000ms exceeded waiting for locator("#btn-create-task")` |
| **Intención de Negocio:** | *El usuario desea interactuar con la acción principal para abrir el modal de creación de tareas.* |

---

## 2. Inspección del DOM Mutado (UI v2)

```html
<!-- Fragmento extraído durante la ejecución -->
<button id="act_btn_new_item_99f" type="button" class="btn-create-task" aria-label="Crear Tarea">
  <span>➕ Crear Tarea</span>
</button>
```

---

## 3. Diagnóstico del Agente de IA

> El selector "#btn-create-task" falló debido a una mutación de identificadores en el DOM durante la actualización a UI v2. No es un bug funcional de la aplicación.

---

## 4. Selector Reparado Recomendado (Confianza: 98%)

```typescript
// ANTES (Frágil / Roto):
await page.locator('#btn-create-task').click();

// DESPUÉS (Reparado con Locator Semántico de Playwright):
await page.getByRole('button', { name: /Crear Tarea/i }).click();
```

**Justificación Técnica:**
El elemento mutó su ID a "act_btn_new_item_99f", pero preserva intacto el rol accesible "button" y el texto descriptivo "➕ Crear Tarea". Este selector es inmune a futuros cambios de clases o IDs.

---

## 5. Estrategias Alternativas Evaluadas

### Alternativa 1 (text-content - Confianza 88%)
```typescript
await page.getByText('Crear Tarea').click();
```
*Coincide con el contenido visible del botón, aunque es preferible acotarlo al rol semántico para evitar ambigüedades con títulos o descripciones.*

### Alternativa 2 (css-id - Confianza 65%)
```typescript
await page.locator('#act_btn_new_item_99f').click();
```
*Identificador estático nuevo en UI v2. Repara la prueba inmediatamente pero conserva el antipatrón de fragilidad frente a próximos refactorings.*


---

## 6. Recomendación Arquitectónica para el Equipo de Desarrollo

> 💡 **Migrar de selectores de implementación (CSS/XPath) a selectores del Árbol de Accesibilidad (Accessibility Tree / getByRole) para erradicar el flakiness en la suite de regresión.**
