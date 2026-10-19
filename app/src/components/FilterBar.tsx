import React from 'react';
import type { FilterCriteria, TaskStatus, UIVersion } from '../types';

interface FilterBarProps {
  filterCriteria: FilterCriteria;
  uiVersion: UIVersion;
  taskCount: number;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: TaskStatus | 'all') => void;
  onOpenCreateModal: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterCriteria,
  uiVersion,
  taskCount,
  onSearchChange,
  onStatusChange,
  onOpenCreateModal,
}) => {
  const isV2 = uiVersion === 'v2';

  // En v2 mutamos los identificadores tradicionales que rompen pruebas frágiles
  const searchInputId = isV2 ? 'fld_query_hash_41a' : 'input-search-tasks';
  const createBtnId = isV2 ? 'act_btn_new_item_99f' : 'btn-create-task';
  const filterSelectId = isV2 ? 'sel_filter_dyn_88b' : 'select-status-filter';

  return (
    <section className="filter-bar" aria-label="Filtros y acciones del tablero">
      <div className="filter-group-left">
        <div className="search-input-wrapper">
          <label htmlFor={searchInputId} className="visually-hidden">
            Buscar tareas
          </label>
          <input
            id={searchInputId}
            type="search"
            role="searchbox"
            className="search-input"
            placeholder="Buscar por título, descripción o asignado..."
            value={filterCriteria.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar tareas"
          />
        </div>

        <div className="status-filter-wrapper">
          <label htmlFor={filterSelectId} className="filter-label">
            Estado:
          </label>
          <select
            id={filterSelectId}
            className="status-select"
            value={filterCriteria.statusFilter}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
            aria-label="Filtrar por estado"
          >
            <option value="all">Todos los estados</option>
            <option value="backlog">Backlog</option>
            <option value="in_progress">En Progreso</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <span className="task-counter" role="status" aria-live="polite">
          Mostrando: <strong>{taskCount}</strong> {taskCount === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      <div className="filter-group-right">
        <button
          type="button"
          id={createBtnId}
          className="btn-primary"
          onClick={onOpenCreateModal}
          aria-label="Nueva Tarea"
        >
          + Nueva Tarea
        </button>
      </div>
    </section>
  );
};
