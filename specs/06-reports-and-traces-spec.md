# SDD Spec — Fase 6: Observabilidad, Evidencias & Trace Viewer en Playwright

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 6 de 7  
> **Estado:** Aprobada para Implementación  
> **Área:** Observabilidad de Pruebas E2E, Inspección de Trazas (Trace Viewer) y Reportería HTML  

---

## 1. Fundamentación Técnica para el Video de Defensa

### ¿Qué es el Trace Viewer de Playwright?
Trace Viewer es una herramienta GUI post-mortem de observabilidad de ejecución que permite a los desarrolladores y QA inspectores viajar en el tiempo (*time-travel debugging*) a lo largo de una prueba E2E:
- **Instantáneas del DOM (DOM Snapshots):** Captura el estado exacto del DOM antes (`before`) y después (`after`) de cada acción (`click`, `fill`, `selectOption`).
- **Línea de Tiempo (Timeline):** Gráfico interactivo milisegundo a milisegundo mostrando capturas de pantalla de la renderización del navegador.
- **Registro de Red (Network Interceptor):** Registro completo de peticiones HTTP/WebSocket, cabeceras, payloads y tiempos de respuesta.
- **Consola del Navegador y Logs de Playwright:** Registro de `console.log`, advertencias de accesibilidad y logs internos de auto-waiting.
- **Explorador de Código Fuente (Source Code):** Línea exacta del archivo `.spec.ts` vinculada con la acción en pantalla.

### Diferencia Crítica con Capturas de Pantalla y Videos Tradicionales
En Selenium o Cypress clásico, una captura de pantalla es un archivo `.png` estático en el momento del fallo.
En Playwright, una traza (`trace.zip`) es un **DOM interactivo completo serializado**: el evaluador puede inspeccionar el DOM, resaltar selectores, verificar accesibilidad y ver la red exactamente como ocurrió durante el test.

---

## 2. Objetivos y Entregables de la Fase 6

1. **Configuración de Trazas en Playwright:**
   - Script específico en `package.json` para generar trazas bajo demanda (`npm run test:e2e:trace-record`).
2. **Generación de Evidencias:**
   - Ejecutar una suite con captura explícita de trazas (`--trace on`) y reportes HTML completos (`playwright-report/`).
3. **Guía de Observabilidad y Debugging:**
   - Documento técnico `docs/Trace-Viewer-Guia.md` explicando cómo navegar cada pestaña de Trace Viewer para la demostración en vivo del video.
