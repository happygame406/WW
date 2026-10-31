import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import Column from './Column';
import TaskFormModal from './TaskFormModal';
import type { Task } from '../types';
import { FiPlus } from 'react-icons/fi';
import styles from './Board.module.scss'

const Board = () => {
  const columns = useTaskStore(state => state.columns);
  const tasks = useTaskStore(state => state.tasks);
  const columnOrder = useTaskStore(state => state.columnOrder);
  const moveTask = useTaskStore(state => state.moveTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const addColumn = useTaskStore(state => state.addColumn);
  const deleteColumn = useTaskStore(state => state.deleteColumn);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [defaultColumnId, setDefaultColumnId] = useState<string | undefined>(undefined);

  const columnList = columnOrder.map(id => ({ id, title: columns[id].title }));

  const handleOpenAdd = (columnId?: string) => {
    setEditingTask(undefined);
    setDefaultColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setDefaultColumnId(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (taskData: Omit<Task, 'id'> & { id?: string }) => {
    if (taskData.id) {
      const existingTask = tasks[taskData.id];
      if (existingTask) {
        if (existingTask.columnId !== taskData.columnId) {
          moveTask(taskData.id, taskData.columnId);
        }
        updateTask(taskData.id, {
          title: taskData.title,
          description: taskData.description,
        });
      }
    } else {
      const newId = `task-${Date.now()}`;
      addTask({
        id: newId,
        title: taskData.title,
        description: taskData.description,
        columnId: taskData.columnId,
      });
    }
  };

  const handleMoveLeft = (taskId: string) => {
    const task = tasks[taskId];
    if (!task) return;
    const currentIndex = columnOrder.indexOf(task.columnId);
    if (currentIndex > 0) {
      const targetColumnId = columnOrder[currentIndex - 1];
      moveTask(taskId, targetColumnId);
    };
  };

  const handleMoveRight = (taskId: string) => {
    const task = tasks[taskId];
    if (!task) return;
    const currentIndex = columnOrder.indexOf(task.columnId)
    if (currentIndex !== -1 && currentIndex < columnOrder.length - 1) {
      const targetColumnId = columnOrder[currentIndex + 1];
      moveTask(taskId, targetColumnId);
    };
  };

  const handleAddColumn = () => {
    const newColumnId = `col-${Date.now()}`;
    addColumn({
      id: newColumnId,
      title: `Колонка ${columnOrder.length + 1}`,
      taskIds: [],
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId);
  };

 
  return (
    <div className={styles.board}>
      {columnOrder.map((columnId, index) => {
        const column = columns[columnId];
        const columnTasks = column.taskIds
          .map(taskId => tasks[taskId])
          .filter(Boolean);
        return (
          <Column
            key={columnId}
            column={column}
            tasks={columnTasks}
            columnIndex={index}
            totalColumns={columnOrder.length}
            onAddTask={() => handleOpenAdd(columnId)}
            onEditTask={handleOpenEdit}
            onDeleteTask={deleteTask}
            onMoveTaskLeft={handleMoveLeft}
            onMoveTaskRight={handleMoveRight}
            onDeleteColumn={handleDeleteColumn}
          />
        );
      })}
      <button onClick={handleAddColumn} className={styles.addColumnButton} title="Добавить колонку" aria-label="Добавить колонку">
        <FiPlus /> Добавить колонку
      </button>

      {isModalOpen && (
        <TaskFormModal
          initialTask={editingTask}
          columnId={defaultColumnId}
          columns={columnList}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Board;