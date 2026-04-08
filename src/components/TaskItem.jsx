import { memo, useState, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

const DragHandleIcon = () => (
  <div className="drag-handle" aria-hidden="true">
    <span/><span/><span/>
  </div>
);

const TaskItem = ({ task, index }) => {
  const { toggleTask, deleteTask } = useTaskContext();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleDelete = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => deleteTask(task.id), 270);
  }, [deleteTask, task.id]);

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={[
            'task-item',
            task.completed ? 'completed' : '',
            snapshot.isDragging ? 'is-dragging' : '',
            isLeaving ? 'leaving' : 'entering',
          ].filter(Boolean).join(' ')}
          id={`task-item-${task.id}`}
          aria-label={`Task: ${task.title}${task.completed ? ', completed' : ''}`}
        >
          <div {...provided.dragHandleProps} title="Drag to reorder">
            <DragHandleIcon />
          </div>

          <input
            type="checkbox"
            id={`task-checkbox-${task.id}`}
            className="task-checkbox"
            checked={task.completed}
            onChange={handleToggle}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
          />

          <label
            htmlFor={`task-checkbox-${task.id}`}
            className="task-text"
          >
            {task.title}
          </label>

          <button
            id={`task-delete-${task.id}`}
            className="delete-btn"
            onClick={handleDelete}
            disabled={isLeaving}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default memo(TaskItem);
