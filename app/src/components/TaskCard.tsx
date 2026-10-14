import React from 'react';
import type { Task, UIVersion } from '../types';

interface TaskCardProps {
  task: Task;
  uiVersion: UIVersion;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, uiVersion, onDelete }) => {
  const isV2 = uiVersion === 'v2';

  // En v2 las clases e IDs internos mutan para demostrar la rotura de selectores tradicionales
  const cardClassName = isV2
    ? 'task-item-mutated-layout shadow-elevated border-dynamic'
    : 'task-card';

  const titleClassName = isV2 ? 'heading-variant-alt' : 'task-title';
  const deleteBtnId = isV2 ? `del_x9_${task.id.replace('tsk_', '')}` : `btn-delete-${task.id}`;

  const priorityLabels: Record<Task['priority'], string> = {
    alta: 'Alta Prioridad',
    media: 'Prioridad Media',
    baja: 'Baja Prioridad',
  };

  const statusLabels: Record<Task['status'], string> = {
    backlog: 'Backlog',
    in_progress: 'En Progreso',
    completed: 'Completada',
  };

  return (
    <article
      className={cardClassName}
      role="article"
      aria-labelledby={`task-title-${task.id}`}
      data-task-id={task.id}
    >
      <div className="task-header">
        <h3 id={`task-title-${task.id}`} className={titleClassName}>
          {task.title}
        </h3>
        <span
          className={`priority-badge priority-${task.priority}`}
          role="status"
          aria-label={`Prioridad: ${task.priority}`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-footer">
        <div className="task-meta">
          <span className="task-assignee" aria-label={`Asignado a: ${task.assignee}`}>
            👤 {task.assignee}
          </span>
          <span className={`status-pill status-${task.status}`}>
            {statusLabels[task.status]}
          </span>
        </div>

        <button
          type="button"
          id={deleteBtnId}
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Eliminar tarea: ${task.title}`}
          title="Eliminar tarea"
        >
          ✕
        </button>
      </div>
    </article>
  );
};
