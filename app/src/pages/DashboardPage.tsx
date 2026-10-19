import React, { useState } from 'react';
import type { User, UIVersion, Task } from '../types';
import { useTasks } from '../hooks/useTasks';
import { Navbar } from '../components/Navbar';
import { FilterBar } from '../components/FilterBar';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { Toast } from '../components/Toast';

interface DashboardPageProps {
  user: User;
  uiVersion: UIVersion;
  onToggleUIVersion: (version: UIVersion) => void;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  uiVersion,
  onToggleUIVersion,
  onLogout,
}) => {
  const {
    filteredTasks,
    isLoading,
    error,
    filterCriteria,
    updateSearch,
    updateStatusFilter,
    createTask,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreateTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    const created = await createTask(data);
    setToastMessage(`Tarea creada exitosamente: "${created.title}"`);
  };

  const handleDeleteTask = async (id: string) => {
    const taskToDelete = filteredTasks.find((t) => t.id === id);
    await deleteTask(id);
    if (taskToDelete) {
      setToastMessage(`Tarea eliminada: "${taskToDelete.title}"`);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar
        user={user}
        uiVersion={uiVersion}
        onToggleUIVersion={onToggleUIVersion}
        onLogout={onLogout}
      />

      <main className="dashboard-content">
        <div className="dashboard-header-banner">
          <div>
            <h2 className="dashboard-greeting">
              Bienvenido, <span className="highlight-text">{user.name}</span>
            </h2>
            <p className="dashboard-desc">
              Tablero de control de sprint y ejecución de pruebas E2E con Playwright.
            </p>
          </div>
          <div className="system-pill" role="note">
            <span>Motor de Prueba:</span> <strong>Playwright Modern E2E</strong>
          </div>
        </div>

        <FilterBar
          filterCriteria={filterCriteria}
          uiVersion={uiVersion}
          taskCount={filteredTasks.length}
          onSearchChange={updateSearch}
          onStatusChange={updateStatusFilter}
          onOpenCreateModal={() => setIsModalOpen(true)}
        />

        {error && (
          <div className="dashboard-error-banner" role="alert">
            ❌ {error}
          </div>
        )}

        {isLoading ? (
          <div className="loading-container" role="status" aria-label="Cargando tareas del sprint">
            <div className="spinner-large"></div>
            <p className="loading-text">Cargando tareas reactivas del sprint...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state" role="status">
            <span className="empty-icon">🔍</span>
            <h3 className="empty-title">No se encontraron tareas coincidentes</h3>
            <p className="empty-desc">
              Prueba modificando los términos de búsqueda o el filtro de estado.
            </p>
          </div>
        ) : (
          <section className="task-grid" aria-label="Lista de tareas del sprint">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                uiVersion={uiVersion}
                onDelete={handleDeleteTask}
              />
            ))}
          </section>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        uiVersion={uiVersion}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          durationMs={3500}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
