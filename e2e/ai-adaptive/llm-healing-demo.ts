/**
 * Demostración de Self-Healing con Inteligencia Artificial (LLM Agent Pattern)
 * Trabajo Práctico: Gestión de Desarrollo de Software (GDS) — UTN
 * 
 * Este script simula cómo un agente de IA en un pipeline de QA analiza un fallo
 * de selector rígido en tiempo de ejecución, inspecciona el árbol de accesibilidad (A11y)
 * y genera automáticamente el selector resiliente reparado.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface FailureContext {
  testFile: string;
  failedStep: string;
  brokenSelector: string;
  errorMessage: string;
  domSnapshotExcerpt: string;
  userIntent: string;
}

export interface HealedSelectorCandidate {
  locatorStrategy: 'semantic-role' | 'aria-label' | 'text-content' | 'css-id';
  healedCode: string;
  confidenceScore: number; // 0.0 a 1.0
  reasoning: string;
}

export interface HealingAnalysisResult {
  timestamp: string;
  diagnosis: string;
  primaryRecommendation: HealedSelectorCandidate;
  alternatives: HealedSelectorCandidate[];
  architecturalAdvice: string;
}

export class LLMSelfHealingEngine {
  /**
   * Analiza el fallo y simula el razonamiento del modelo de lenguaje
   */
  public analyzeAndHeal(context: FailureContext): HealingAnalysisResult {
    console.log('🤖 [AI Agent] Analizando fallo de prueba E2E...');
    console.log(`❌ Selector quebrado: ${context.brokenSelector}`);
    console.log(`🎯 Intención del usuario detectada: "${context.userIntent}"`);

    // El agente de IA inspecciona el fragmento del DOM mutado y extrae candidatos
    const candidates: HealedSelectorCandidate[] = [
      {
        locatorStrategy: 'semantic-role',
        healedCode: "page.getByRole('button', { name: /Crear Tarea/i })",
        confidenceScore: 0.98,
        reasoning:
          'El elemento mutó su ID a "act_btn_new_item_99f", pero preserva intacto el rol accesible "button" y el texto descriptivo "➕ Crear Tarea". Este selector es inmune a futuros cambios de clases o IDs.',
      },
      {
        locatorStrategy: 'text-content',
        healedCode: "page.getByText('Crear Tarea')",
        confidenceScore: 0.88,
        reasoning:
          'Coincide con el contenido visible del botón, aunque es preferible acotarlo al rol semántico para evitar ambigüedades con títulos o descripciones.',
      },
      {
        locatorStrategy: 'css-id',
        healedCode: "page.locator('#act_btn_new_item_99f')",
        confidenceScore: 0.65,
        reasoning:
          'Identificador estático nuevo en UI v2. Repara la prueba inmediatamente pero conserva el antipatrón de fragilidad frente a próximos refactorings.',
      },
    ];

    return {
      timestamp: new Date().toISOString(),
      diagnosis: `El selector "${context.brokenSelector}" falló debido a una mutación de identificadores en el DOM durante la actualización a UI v2. No es un bug funcional de la aplicación.`,
      primaryRecommendation: candidates[0],
      alternatives: candidates.slice(1),
      architecturalAdvice:
        'Migrar de selectores de implementación (CSS/XPath) a selectores del Árbol de Accesibilidad (Accessibility Tree / getByRole) para erradicar el flakiness en la suite de regresión.',
    };
  }

  /**
   * Genera el informe visual en Markdown para la defensa y estudio del equipo
   */
  public generateReport(context: FailureContext, result: HealingAnalysisResult): string {
    return `# Reporte de Auto-Healing con Inteligencia Artificial (QA Adaptativo)

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fecha de Análisis:** ${result.timestamp}  
> **Estado:** Reparación Exitosa (Self-Healed)  

---

## 1. Contexto del Fallo Detectado en CI/CD

| Parámetro | Detalle |
| :--- | :--- |
| **Archivo de Prueba:** | \`${context.testFile}\` |
| **Paso Quebrado:** | \`${context.failedStep}\` |
| **Selector Fallido:** | \`${context.brokenSelector}\` |
| **Excepción:** | \`${context.errorMessage}\` |
| **Intención de Negocio:** | *${context.userIntent}* |

---

## 2. Inspección del DOM Mutado (UI v2)

\`\`\`html
<!-- Fragmento extraído durante la ejecución -->
${context.domSnapshotExcerpt}
\`\`\`

---

## 3. Diagnóstico del Agente de IA

> ${result.diagnosis}

---

## 4. Selector Reparado Recomendado (Confianza: ${(result.primaryRecommendation.confidenceScore * 100).toFixed(0)}%)

\`\`\`typescript
// ANTES (Frágil / Roto):
await page.locator('${context.brokenSelector}').click();

// DESPUÉS (Reparado con Locator Semántico de Playwright):
await ${result.primaryRecommendation.healedCode}.click();
\`\`\`

**Justificación Técnica:**
${result.primaryRecommendation.reasoning}

---

## 5. Estrategias Alternativas Evaluadas

${result.alternatives
  .map(
    (alt, i) => `### Alternativa ${i + 1} (${alt.locatorStrategy} - Confianza ${(alt.confidenceScore * 100).toFixed(0)}%)
\`\`\`typescript
await ${alt.healedCode}.click();
\`\`\`
*${alt.reasoning}*
`
  )
  .join('\n')}

---

## 6. Recomendación Arquitectónica para el Equipo de Desarrollo

> 💡 **${result.architecturalAdvice}**
`;
  }
}

// Ejecución de demostración si se invoca directamente desde CLI
if (process.argv[1]?.includes('llm-healing-demo')) {
  const engine = new LLMSelfHealingEngine();

  const failureContext: FailureContext = {
    testFile: 'e2e/ai-adaptive/fragile-selectors.spec.ts',
    failedStep: 'Abrir modal de nueva tarea',
    brokenSelector: '#btn-create-task',
    errorMessage: 'TimeoutError: locator.click: Timeout 5000ms exceeded waiting for locator("#btn-create-task")',
    domSnapshotExcerpt: `<button id="act_btn_new_item_99f" type="button" class="btn-create-task" aria-label="Crear Tarea">
  <span>➕ Crear Tarea</span>
</button>`,
    userIntent: 'El usuario desea interactuar con la acción principal para abrir el modal de creación de tareas.',
  };

  const result = engine.analyzeAndHeal(failureContext);
  const markdownReport = engine.generateReport(failureContext, result);

  const reportPath = path.resolve(process.cwd(), 'e2e/ai-adaptive/self-healing-report.md');
  fs.writeFileSync(reportPath, markdownReport, 'utf-8');

  console.log('\n======================================================');
  console.log('✅ Auto-Healing completado con éxito!');
  console.log(`📄 Reporte generado en: ${reportPath}`);
  console.log('======================================================\n');
  console.log('Código Reparado Sugerido:');
  console.log(`👉 ${result.primaryRecommendation.healedCode}\n`);
}
