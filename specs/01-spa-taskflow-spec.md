# SDD Spec — Fase 1: SPA TaskFlow (Frontend Architecture & SRP)

> **Materia:** Gestión de Desarrollo de Software (GDS) — UTN  
> **Fase:** 1 de 6  
> **Estado:** Aprobada para Implementación  
> **Stack:** React 18+ / TypeScript / Vite / Vanilla CSS modular  

---

## 1. Objetivo y Alcance
Construir la Single Page Application (SPA) **TaskFlow** bajo principios de **Clean Frontend** y **Single Responsibility Principle (SRP)**. La aplicación servirá de sujeto de pruebas para la suite de Playwright, soportando:
- Simulación asincrónica de red (latencias y estados de carga).
- Navegación client-side entre `/login` y `/dashboard`.
- Persistencia en `localStorage`.
- Selector de modo de interfaz (**v1 Estándar Semántico** vs **v2 Rediseño DOM Alterado**) para la posterior validación de QA Adaptativo con IA.

---

## 2. Contratos de Dominio y Modelos (`app/src/types/`)

```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'developer' | 'qa';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// types/task.ts
export type TaskStatus = 'backlog' | 'in_progress' | 'completed';
export type TaskPriority = 'baja' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: string;
}

export interface FilterCriteria {
  searchQuery: string;
  statusFilter: TaskStatus | 'all';
}

// types/ui.ts
export type UIVersion = 'v1' | 'v2';
```

---

## 3. Contratos de Servicios e Infraestructura (`app/src/services/`)

Cada servicio tiene la responsabilidad exclusiva de comunicarse con el almacenamiento y simular latencias de red.

### `auth.service.ts`
- `login(email: string, password: string): Promise<User>`: Simula una llamada de red de 600ms. Valida credenciales (`admin@taskflow.dev` / `password123`) y guarda el usuario en `localStorage`. Lanza error si son inválidas.
- `logout(): Promise<void>`: Limpia la sesión y `localStorage`.
- `getCurrentUser(): User | null`: Lee de forma síncrona el estado inicial.

### `task.service.ts`
- `getTasks(): Promise<Task[]>`: Simula 400ms de latencia y retorna la lista inicial de tareas (con semillas por defecto).
- `createTask(data: Omit<Task, 'id' | 'createdAt'>): Promise<Task>`: Simula 500ms de latencia, persiste la tarea al inicio de la lista y la retorna.
- `deleteTask(id: string): Promise<void>`: Elimina una tarea por ID.

---

## 4. Contratos de Hooks de Estado (`app/src/hooks/`)

- `useAuth()`: Expone `{ user, isAuthenticated, isLoading, error, login, logout }`.
- `useTasks()`: Expone `{ tasks, isLoading, error, createTask, deleteTask, filterCriteria, setFilterCriteria, filteredTasks }`.
- `useDebounce<T>(value: T, delay: number): T`: Retarda la actualización de un valor (300ms para la búsqueda reactiva).

---

## 5. Contratos de Componentes Presentacionales (`app/src/components/`)

Componentes puros con accesibilidad WCAG y selectores semánticos estándar:

1. **`Navbar`**: Muestra logo, selector de versión de UI (`v1` / `v2`), datos del usuario autenticado y botón `Cerrar Sesión` (`button[aria-label="Cerrar Sesión"]`).
2. **`TaskCard`**: Renderiza el ítem con `article[role="article"]`, título `h3`, badge de prioridad y botón de borrado accesible.
3. **`FilterBar`**: Input de búsqueda con `role="searchbox"` / `aria-label="Buscar tareas"` y selector de estado con `role="combobox"` o radio buttons accesibles.
4. **`TaskModal`**: Diálogo con `role="dialog"` y `aria-modal="true"`. Formulario accesible con labels asociados por `for`/`id` a los inputs:
   - Título (`input#task-title`, `label[for="task-title"]`)
   - Descripción (`textarea#task-desc`, `label[for="task-desc"]`)
   - Prioridad (`select#task-priority`, `label[for="task-priority"]`)
   - Asignado (`input#task-assignee`, `label[for="task-assignee"]`)
   - Botón `button[type="submit"]` con texto `"Guardar Tarea"`.
5. **`Toast`**: Alerta flotante con `role="status"` o `role="alert"` y `aria-live="polite"`.

---

## 6. Mecanismo de Toggle "UI Redesign v2" (Demostración QA Adaptativo)

El componente raíz dispondrá de un toggle global para alternar `uiVersion`:

- **En Modo v1 (Estándar):**
  - Botón de crear: `id="btn-create-task"`, clase `.btn-primary`.
  - Input de login: `id="input-email"`, clase `.form-input`.
- **En Modo v2 (Rediseño Alterado):**
  - Se remueven los IDs tradicionales o se reemplazan por hashes generados (`id="x7f_9a"`).
  - Las clases CSS cambian por completo a utilidades inline diferentes.
  - **Invariante:** La semántica accesible (`getByRole`, `getByLabel`, `getByText`) se mantiene 100% idéntica.

---

## 7. Criterios de Aceptación y Verificación

- [ ] **CA-1:** La app compila sin errores de TypeScript (`tsc --noEmit`).
- [ ] **CA-2:** La app levanta localmente mediante `npm run dev` en un puerto accesible (ej. 5173).
- [ ] **CA-3:** Flujo de login funcional con validación correcta y errónea.
- [ ] **CA-4:** Búsqueda reactiva funcionando con debounce de 300ms.
- [ ] **CA-5:** Modal de creación agrega tareas de forma reactiva y muestra notificación Toast.
- [ ] **CA-6:** El toggle `v1/v2` cambia la estructura de clases del DOM sin romper la funcionalidad visual ni la accesibilidad.
