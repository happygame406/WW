import type { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './Column.module.scss'

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  columnIndex: number;          // индекс текущей колонки (0-based)
  totalColumns: number;         // общее количество колонок
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTaskLeft: (taskId: string) => void;
  onMoveTaskRight: (taskId: string) => void;
  onDeleteColumn: (columnId: string) => void;
}

const Column = ({
  column,
  tasks,
  columnIndex,
  totalColumns,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTaskLeft,
  onMoveTaskRight,
  onDeleteColumn
}: ColumnProps) => {
  const isEmpty = column.taskIds.length === 0;


  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>{column.title}</h3>
        <div className={styles.columnActions}>
        <button onClick={onAddTask} className={styles.actionButton} title="Добавить задачу" aria-label="Добавить задачу"><FiPlus /></button>
        <button 
          onClick={() => onDeleteColumn(column.id)}
          disabled={!isEmpty}
          title={isEmpty ? 'Удалить колонку' : 'Колонка не пуста'}
          aria-label={isEmpty ? 'Удалить колонку' : 'Колонка не пуста'}
          className={styles.actionButton} ><FiTrash2 /></button>
        </div>
      </div>
      <div>
        {isEmpty && <p className={styles.emptyMessage}>Колонка пуста</p>}
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onMoveLeft={() => onMoveTaskLeft(task.id)}
            onMoveRight={() => onMoveTaskRight(task.id)}
            canMoveLeft={columnIndex > 0}
            canMoveRight={columnIndex < totalColumns - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;