import { createContext, useContext, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tm-tasks', []);
  const [filter, setFilter] = useLocalStorage('tm-filter', 'all');

  const addTask = useCallback((title) => {
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  const reorderTasks = useCallback((sourceIndex, destIndex) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed': return tasks.filter((t) => t.completed);
      case 'pending':   return tasks.filter((t) => !t.completed);
      default:          return tasks;
    }
  }, [tasks, filter]);

  const counts = useMemo(() => ({
    all:       tasks.length,
    pending:   tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }), [tasks]);

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((counts.completed / tasks.length) * 100);
  }, [tasks.length, counts.completed]);

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    filter,
    setFilter,
    counts,
    completionRate,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
  }), [tasks, filteredTasks, filter, setFilter, counts, completionRate, addTask, toggleTask, deleteTask, reorderTasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used inside <TaskProvider>');
  return ctx;
}
