# Playwright Testing E2E & QA Adaptativo con IA

> **Trabajo Práctico:** Automatización de Pruebas y QA Adaptativo en SPAs  
> **Materia:** Gestión de Desarrollo de Software (GDS)  
> **Institución:** Universidad Tecnológica Nacional (UTN)  

---

## 👥 Integrantes del Equipo

| Nombre y Apellido | Usuario de GitHub | Rol en Exposición |
| :--- | :--- | :--- |
| **Castellano Gutiérrez Axel** | `@Axldev1991` | Bloque 1: Fundamentos y Arquitectura de Playwright |
| **Fernandez Ibarguren Saulo** | `@serenomoon` | Bloque 2: Desafíos en SPAs y QA Adaptativo con IA |
| **Franco Martin Esposito** | `@francoesposito` | Bloque 3: Suite Playwright, POM y Demo Práctica |
| **Nicolas Rumie Vitar** | `@nicolasrumie` | Bloque 4: QA Adaptativo en Vivo y Trace Viewer |

---

## 📌 Documentación del Proyecto

- [Consignas del TP (TP-Playwright.md)](./TP-Playwright.md)
- [Investigación Teórica y Ontológica (Investigacion-Playwright.md)](./Investigacion-Playwright.md)
- [Resumen Ejecutivo del Trabajo (docs/ResumenPlaywrightGrupo5.md)](./docs/ResumenPlaywrightGrupo5.md)
- [Guía de Uso de Trace Viewer (docs/Trace-Viewer-Guia.md)](./docs/Trace-Viewer-Guia.md)

---

## 🚀 Estructura del Repositorio

- `/app`: Single Page Application (*TaskFlow*) desarrollada con React + Vite + TypeScript (con selector de modo UI v1 / v2 para pruebas de resiliencia).
- `/e2e`: Suite de pruebas automatizadas con Playwright (POM, Fixtures, Suites Funcionales, QA Adaptativo y Demo de Auto-healing con LLM).
- `/docs`: Documentación técnica y resumen de entrega.

---

## ⚙️ Comandos de Ejecución

### 1. SPA TaskFlow
```bash
# Iniciar la SPA en modo desarrollo (http://localhost:5173)
npm run dev

# Compilar la aplicación para producción
npm run app:build
```

### 2. Suite de Pruebas Playwright
```bash
# Ejecutar todas las pruebas E2E en modo headless (matriz cross-browser)
npm run test:e2e

# Ejecutar pruebas con interfaz visual interactiva (UI Mode)
npm run test:e2e:ui

# Abrir el reporte HTML de la última ejecución
npm run test:e2e:report

# Demostración del ciclo de Auto-healing con IA / LLM
npm run demo:healing
```
