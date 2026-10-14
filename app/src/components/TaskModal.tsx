import React, { useState } from 'react';
import type { Task, TaskPriority, TaskStatus, UIVersion } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  uiVersion: UIVersion;
  onClose: () => void;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  uiVersion,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [assignee, setAssignee] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isV2 = uiVersion === 'v2';

  // En v2 mutan los IDs tradicionales de formulario
  const titleFieldId = isV2 ? 'fld_title_dyn_01' : 'task-title';
  const descFieldId = isV2 ? 'fld_desc_dyn_02' : 'task-desc';
  const priorityFieldId = isV2 ? 'fld_prio_dyn_03' : 'task-priority';
  const assigneeFieldId = isV2 ? 'fld_asgn_dyn_04' : 'task-assignee';
  const submitBtnId = isV2 ? 'btn_submit_dyn_save' : 'btn-submit-task';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('El título de la tarea es obligatorio.');
      return;
    }
    if (!assignee.trim()) {
      setValidationError('Debe indicar un responsable asignado.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        assignee: assignee.trim(),
        status: 'backlog' as TaskStatus,
      });

      // Reset y cierre
      setTitle('');
      setDescription('');
      setPriority('media');
      setAssignee('');
      onClose();
    } catch {
      setValidationError('Ocurrió un error al guardar la tarea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            Nueva Tarea de Sprint
          </h2>
          <button
            type="button"
            className="btn-close-modal"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {validationError && (
          <div className="form-error" role="alert" aria-live="assertive">
            ⚠️ {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form" noValidate>
          <div className="form-group">
            <label htmlFor={titleFieldId} className="form-label">
              Título
            </label>
            <input
              id={titleFieldId}
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Diseñar arquitectura de fixtures"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={descFieldId} className="form-label">
              Descripción
            </label>
            <textarea
              id={descFieldId}
              className="form-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles técnicos y criterios de aceptación..."
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={priorityFieldId} className="form-label">
                Prioridad
              </label>
              <select
                id={priorityFieldId}
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                disabled={isSubmitting}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={assigneeFieldId} className="form-label">
                Asignado
              </label>
              <input
                id={assigneeFieldId}
                type="text"
                className="form-input"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Nombre del integrante"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              id={submitBtnId}
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
