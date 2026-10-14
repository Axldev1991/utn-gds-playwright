# SDD Spec — Fase 7: Guion de Exposición Grupal y Guía de Defensa Técnica

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 7 de 7  
> **Estado:** Aprobada para Implementación  
> **Área:** Comunicación Técnica, Defensa Oral y Coordinación de Exposición Audiovisual  

---

## 1. Objetivo y Criterios de Calidad

Diseñar el guion maestro y técnico para la grabación del video de exposición grupal del Trabajo Práctico de Playwright, con una duración total de **25 a 30 minutos**, dividido de forma equitativa entre los cuatro integrantes del equipo:
1. **Castellano Gutiérrez Axel**
2. **Fernandez Ibarguren Saulo**
3. **Franco Martin Esposito**
4. **Nicolas Rumie Vitar**

### Criterios de Rigor Técnico y Pedagógico
- **Equidad de Carga:** Cada integrante expone entre 6:15 y 7:30 minutos, con roles temáticos claros y transiciones fluidas.
- **Rigor Ontológico y de Ingeniería:** No es una lectura de diapositivas; cada sección fundamenta el *por qué* técnico, las ventajas arquitectónicas y los compromisos de diseño (*trade-offs*).
- **Demostración Práctica en Vivo:** Cada integrante combina teoría con código en pantalla, ejecución de comandos en terminal, inspección del navegador o uso de herramientas gráficas (Trace Viewer).
- **Lenguaje Claro y Profesional:** Terminología precisa de la industria (CDP, WebSockets, A11y Tree, Auto-waiting, POM, Inversión de Dependencias, Flakiness, Self-Healing, Time-Travel Debugging).

---

## 2. Estructura y Asignación de Bloques

| Bloque | Duración Estimada | Integrante Responsable | Ejes Temáticos Principales | Artefactos / Demos en Pantalla |
| :--- | :--- | :--- | :--- | :--- |
| **Bloque 1** | ~6:30 min (00:00 - 06:30) | **Castellano Gutiérrez Axel** | Introducción, Ontología de Playwright, Comparativa Arquitectónica (CDP vs Selenium/Cypress) | Diapositivas conceptuales, diagrama de arquitectura de protocolos |
| **Bloque 2** | ~7:00 min (06:30 - 13:30) | **Fernandez Ibarguren Saulo** | Arquitectura de la SPA *TaskFlow*, Retos de Testing en SPAs, Mecanismos de Auto-waiting | SPA corriendo en localhost:5173, código React/Hooks, DevTools de red |
| **Bloque 3** | ~7:00 min (13:30 - 20:30) | **Franco Martin Esposito** | Patrón Page Object Model (POM), SRP, Fixtures con Inversión de Control, Ejecución Cross-Browser | Clases POM en `e2e/pages`, ejecución de tests funcionales en terminal |
| **Bloque 4** | ~7:30 min (20:30 - 28:00) | **Nicolas Rumie Vitar** | QA Adaptativo, Resiliencia Semántica v1 vs v2, Demostración de Self-Healing con IA, Trace Viewer, Cierre | Test de mutación v1/v2, script `demo:healing`, GUI Trace Viewer |

---

## 3. Entregable
Documento maestro `Guion-Video-Playwright.md` conteniendo el guion conversacional palabra por palabra, marcas de tiempo (*cues*), acciones del mouse/teclado y puntos de control didáctico para los 4 estudiantes.
