import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Column } from '../types';

interface TaskState {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, targetColumnId: string) => void;
  addColumn: (column: Column) => void;
  deleteColumn: (columnId: string) => void;
}

const initialTasks: Record<string, Task> = {
  'task-0': { id: 'task-0', title: 'Сформулировать требования', description: 'Описать функциональность TaskFlow', columnId: 'col-0', },
  'task-1': { id: 'task-1', title: 'Изучить Zustand', description: 'Прочитать документацию и примеры', columnId: 'col-1', },
  'task-2': { id: 'task-2', title: 'Создать проект', description: 'Инициализировать Vite + React', columnId: 'col-2', },
  'task-3': { id: 'task-3', title: 'Настроить стили', description: 'Подключить CSS-модули', columnId: 'col-3', },
};

const initialColumns: Record<string, Column> = {
  'col-0': { id: 'col-0', title: 'Backlog', taskIds: ['task-0'] },
  'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1'] },
  'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-2'] },
  'col-3': { id: 'col-3', title: 'Done', taskIds: ['task-3'] },
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: initialColumns,
      columnOrder: ['col-0', 'col-1', 'col-2', 'col-3'],
      
      addTask: (task) => set((state) => {
        const newTasks = { ...state.tasks, [task.id]: task };
        const newColumns = { ...state.columns };
        if (newColumns[task.columnId]) {
          newColumns[task.columnId] = { ...newColumns[task.columnId] };
          newColumns[task.columnId].taskIds.push(task.id);
        }
        return { tasks: newTasks, columns: newColumns };
      }),
      
      updateTask: (taskId, updates) => set((state) => {
        const existingTask = state.tasks[taskId];
        if (!existingTask) return state;
        const updatedTask = { ...existingTask, ...updates };
        const newTasks = { ...state.tasks, [taskId]: updatedTask };
        return { tasks: newTasks };
      }),
      
      deleteTask: (taskId) => set((state) => {
        const task = state.tasks[taskId];
        if (!task) return state;
        const newTasks = { ...state.tasks };
        delete newTasks[taskId];
        const newColumns = { ...state.columns };
        if (newColumns[task.columnId]) {
          newColumns[task.columnId] = { ...newColumns[task.columnId] };
          newColumns[task.columnId].taskIds = newColumns[task.columnId].taskIds.filter(id => id !== taskId);
        }
        return { tasks: newTasks, columns: newColumns };
      }),
      
      moveTask: (taskId, targetColumnId) => set((state) => {
        const task = state.tasks[taskId];
        if (!task) return state;
        const sourceColumnId = task.columnId;
        if (sourceColumnId === targetColumnId) return state;
        const newTasks = { ...state.tasks, [taskId]: { ...task, columnId: targetColumnId } };
        const newColumns = { ...state.columns };
        if (newColumns[sourceColumnId]) {
          newColumns[sourceColumnId] = { ...newColumns[sourceColumnId] };
          newColumns[sourceColumnId].taskIds = newColumns[sourceColumnId].taskIds.filter(id => id !== taskId);
        }
        if (newColumns[targetColumnId]) {
          newColumns[targetColumnId] = { ...newColumns[targetColumnId] };
          newColumns[targetColumnId].taskIds.push(taskId);
        }
        return { tasks: newTasks, columns: newColumns };
      }),

      addColumn: (column) => set((state) => {
        const newColumns = { ...state.columns, [column.id]: column };
        const newOrder = [...state.columnOrder, column.id];
        return { columns: newColumns, columnOrder: newOrder };
      }),

      deleteColumn: (columnId) => set((state) => {
        const newColumns = { ...state.columns };
        delete newColumns[columnId];
        const newOrder = state.columnOrder.filter(id => id !== columnId);
        return { columns: newColumns, columnOrder: newOrder };
      }),
    }),
    {
      name: 'taskflow-storage',
    }
  )
);
