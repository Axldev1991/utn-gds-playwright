# SDD Spec — Fase 4: Suites de Pruebas E2E para los 3 Flujos Críticos

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 4 de 6  
> **Estado:** Aprobada para Implementación  
> **Área:** Automatización de Flujos Funcionales E2E con Page Object Model  

---

## 1. Objetivo y Alcance
Implementar la suite completa de pruebas funcionales automatizadas en Playwright cubriendo los **tres flujos de negocio exigidos en las consignas de la cátedra**, utilizando exclusivamente la arquitectura **Page Object Model (POM)** y **Fixtures** desarrollada en las fases previas:
1. **Flujo 1 — Autenticación y Control de Sesión (`02-auth-flow.spec.ts`)**
2. **Flujo 2 — Búsqueda y Filtrado Asincrónico de Tareas (`03-search-filter-flow.spec.ts`)**
3. **Flujo 3 — Alta y Gestión de Tareas con Modal y Feedback (`04-task-creation-flow.spec.ts`)**

---

## 2. Especificación de Escenarios (BDD)

---

### Flujo 1: Autenticación y Sesión (`02-auth-flow.spec.ts`)

#### Escenario 1.1 — Login Exitoso con Auto-waiting
- **Dado** que un usuario no autenticado navega a la SPA.
- **Cuando** ingresa el email `admin@taskflow.dev` y contraseña `password123` y hace clic en `Iniciar Sesión`.
- **Entonces** Playwright verifica que durante la petición asincrónica se muestre el estado de carga (`role="status"`).
- **Y** mediante *auto-waiting* determinista, espera la transición a la vista de `/dashboard`.
- **Y** valida que el encabezado principal contenga `"Bienvenido, Administrador GDS"`.

#### Escenario 1.2 — Login Fallido con Credenciales Inválidas
- **Dado** que el usuario se encuentra en la pantalla de login.
- **Cuando** ingresa credenciales no autorizadas (`usuario@invalido.com` / `claveErronea`).
- **Entonces** el sistema no cambia de vista.
- **Y** se renderiza una alerta accesible con `role="alert"` indicando `"Credenciales inválidas"`.

#### Escenario 1.3 — Logout y Destrucción de Sesión
- **Dado** que el usuario se encuentra autenticado en el Dashboard.
- **Cuando** hace clic en el botón `Cerrar Sesión`.
- **Entonces** el sistema destruye la sesión y redirige a la pantalla de login.
- **Y** el formulario de inicio de sesión vuelve a estar visible y listo para interactuar.

---

### Flujo 2: Búsqueda y Filtrado Asincrónico (`03-search-filter-flow.spec.ts`)

#### Escenario 2.1 — Filtrado reactivo con Debounce
- **Dado** que el usuario está en el Dashboard con la lista de tareas iniciales cargada.
- **Cuando** escribe un término en la barra de búsqueda (ej. `"Playwright"`).
- **Entonces** tras el retardo de 300ms de debounce, el DOM actualiza reactivamente la lista.
- **Y** el contador de tareas visibles refleja exactamente 1 tarea.
- **Y** la tarjeta `"Configurar suite de Playwright"` es la única visible.

#### Escenario 2.2 — Filtrado por Estado de Sprint
- **Dado** que el usuario tiene el tablero con múltiples tareas en diferentes estados.
- **Cuando** selecciona en el selector de estado la opción `"Completadas"`.
- **Entonces** la lista se filtra mostrando únicamente ítems en estado `completed`.
- **Y** todas las tarjetas visibles exhiben el pill de estado `"Completada"`.

#### Escenario 2.3 — Estado Vacío (*Empty State*) ante búsqueda sin coincidencias
- **Dado** que el usuario realiza una búsqueda de un término inexistente (ej. `"XYZ-NO-EXISTE"`).
- **Cuando** transcurre el debounce.
- **Entonces** la lista no muestra ninguna tarjeta.
- **Y** se renderiza el contenedor accesible de estado vacío con el mensaje `"No se encontraron tareas coincidentes"`.

---

### Flujo 3: Alta y Gestión de Tareas (`04-task-creation-flow.spec.ts`)

#### Escenario 3.1 — Creación Exitosa y Feedback Efímero (*Toast*)
- **Dado** que el usuario pulsa el botón `+ Nueva Tarea` y se abre el modal.
- **Cuando** completa:
  - Título: `"Flujo E2E de Alta Automatizada"`
  - Descripción: `"Verificación integral de creación reactiva en Playwright"`
  - Prioridad: `"Alta"`
  - Asignado: `"Axel Castellano"`
- **Y** presiona `Guardar Tarea`.
- **Entonces** el diálogo modal se cierra automáticamente.
- **Y** se despliega una alerta flotante (*Toast*) con `role="status"` confirmando la creación.
- **Y** la nueva tarea se ubica en el primer lugar del tablero con sus badges de prioridad y asignado correspondientes.

#### Escenario 3.2 — Validación de Campos Requeridos en el Modal
- **Dado** que el modal de creación está abierto.
- **Cuando** el usuario intenta enviar el formulario dejando el campo `Título` vacío.
- **Entonces** el modal no se cierra y muestra un mensaje de error accesible (`role="alert"`).
- **Y** no se crea ninguna nueva tarjeta en el tablero.

#### Escenario 3.3 — Cancelación y Descarte de Cambios
- **Dado** que el usuario abre el modal y escribe texto en los campos.
- **Cuando** presiona el botón `Cancelar`.
- **Entonces** el modal se cierra y el estado del tablero permanece inalterado.

---

## 3. Criterios de Aceptación y Verificación

- [ ] **CA-1:** Los 3 archivos de prueba (`02-auth-flow.spec.ts`, `03-search-filter-flow.spec.ts`, `04-task-creation-flow.spec.ts`) están implementados usando los Page Objects y Fixtures.
- [ ] **CA-2:** No se utilizan pausas arbitrarias (`page.waitForTimeout()`) en ninguna prueba; toda sincronización se basa en *auto-waiting* determinista.
- [ ] **CA-3:** Las suites se ejecutan con éxito al 100% en la matriz completa de proyectos (Desktop Chromium, Desktop Firefox y Mobile Chrome).
- [ ] **CA-4:** Se genera el reporte HTML de Playwright documentando la cobertura completa.
