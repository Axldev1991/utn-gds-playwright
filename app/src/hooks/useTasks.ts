import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, FilterCriteria, TaskStatus } from '../types';
import { taskService } from '../services/task.service';
import { useDebounce } from './useDebounce';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    searchQuery: '',
    statusFilter: 'all',
  });

  const debouncedSearch = useDebounce(filterCriteria.searchQuery, 300);

  useEffect(() => {
    let isMounted = true;
    taskService
      .getTasks()
      .then((data) => {
        if (isMounted) {
          setTasks(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const createTask = useCallback(async (data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const newTask = await taskService.createTask(data);
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        debouncedSearch.trim() === '' ||
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        task.assignee.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        filterCriteria.statusFilter === 'all' || task.status === filterCriteria.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, debouncedSearch, filterCriteria.statusFilter]);

  const updateSearch = useCallback((query: string) => {
    setFilterCriteria((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const updateStatusFilter = useCallback((status: TaskStatus | 'all') => {
    setFilterCriteria((prev) => ({ ...prev, statusFilter: status }));
  }, []);

  const refreshTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tasks,
    filteredTasks,
    isLoading,
    error,
    filterCriteria,
    updateSearch,
    updateStatusFilter,
    createTask,
    deleteTask,
    refreshTasks,
  };
}
