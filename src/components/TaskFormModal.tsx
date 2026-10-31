import { useState, useEffect } from 'react';
import type { Task } from '../types';
import styles from './TaskFormModal.module.scss'

interface TaskFormModalProps {
  initialTask?: Task;   // если передан, режим редактирования
  columnId?: string;    // колонка по умолчанию (для добавления)
  columns: { id: string; title: string }[]; // список колонок для выбора
  onSave: (taskData: Omit<Task, 'id'> & { id?: string }) => void;
  onClose: () => void;
}

const TaskFormModal = ({ initialTask, columnId, columns, onSave, onClose }: TaskFormModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColumnId, setSelectedColumnId] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setSelectedColumnId(initialTask.columnId);
    } else {
      setTitle('');
      setDescription('');
      setSelectedColumnId(columnId || columns[0]?.id || '');
    }
  }, [initialTask, columnId, columns]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      columnId: selectedColumnId,
      ...(initialTask ? { id: initialTask.id } : {}),
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{initialTask ? 'Редактировать задачу' : 'Новая задача'}</h2>
        <div className={styles.field}>
          <label>Название</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div className={styles.field}>
          <label>Описание</label><br />
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ width: '100%' }} />
        </div>
        <div className={styles.field}>
          <label>Колонка</label><br />
          <select value={selectedColumnId} onChange={e => setSelectedColumnId(e.target.value)} style={{ width: '100%' }}>
            {columns.map(col => (
              <option key={col.id} value={col.id}>{col.title}</option>
            ))}
          </select>
        </div>
        <button type="submit">{initialTask ? 'Сохранить' : 'Добавить'}</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '8px' }}>Отмена</button>
      </form>
    </div>
  );
};

export default TaskFormModal;