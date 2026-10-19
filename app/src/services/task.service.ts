import type { Task } from '../types';

const STORAGE_KEY = 'taskflow_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk_001',
    title: 'Configurar suite de Playwright',
    description: 'Instalar dependencias, navegadores Chromium/Firefox/WebKit y configurar trace viewer.',
    status: 'completed',
    priority: 'alta',
    assignee: 'Axel Castellano',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'tsk_002',
    title: 'Investigación de QA Adaptativo',
    description: 'Redactar comparativa de arquitectura frente a Selenium y Cypress y resiliencia en SPAs.',
    status: 'completed',
    priority: 'media',
    assignee: 'Saulo Fernandez',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'tsk_003',
    title: 'Implementar Page Object Model',
    description: 'Crear clases desacopladas para LoginPage, DashboardPage y modal de tareas.',
    status: 'in_progress',
    priority: 'alta',
    assignee: 'Franco Esposito',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tsk_004',
    title: 'Demostración de Trace Viewer y Video',
    description: 'Grabar ejecución desatendida y preparar guion de exposición de 25 a 30 minutos.',
    status: 'backlog',
    priority: 'media',
    assignee: 'Nicolas Rumie',
    createdAt: new Date().toISOString(),
  },
];

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    try {
      return JSON.parse(raw) as Task[];
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
  },

  async createTask(data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const currentTasks = await this.getTasks();

    const newTask: Task = {
      ...data,
      id: `tsk_${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [newTask, ...currentTasks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return newTask;
  },

  async deleteTask(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const currentTasks = await this.getTasks();
    const filtered = currentTasks.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
