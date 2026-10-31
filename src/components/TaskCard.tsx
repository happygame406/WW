import type { Task } from '../types';
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight,
}: TaskCardProps) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <FiMoreVertical className={styles.dragIcon} title="Перетащить" />
        <div>
          <h4 className={styles.taskTitle}>{task.title}</h4>
          <p className={styles.taskDescription}>{task.description}</p>
        </div>
      </div>

      <div className={styles.taskActions}>
        <button onClick={onEdit} title="Редактировать" aria-label="Редактировать"><FiEdit2 /></button>
        <button onClick={onDelete} title="Удалить" aria-label="Удалить"><FiTrash2 /></button>
        <button
          onClick={onMoveLeft}
          disabled={!canMoveLeft}
          title="Переместить влево"
          aria-label="Переместить влево"
          className={styles.actionButton}><FiChevronLeft /></button>
        <button
          onClick={onMoveRight}
          disabled={!canMoveRight}
          title="Переместить вправо"
          aria-label="Переместить вправо"
          className={styles.actionButton}><FiChevronRight /></button>
      </div>
    </div>
  );
};

export default TaskCard;