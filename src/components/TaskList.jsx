import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

const TaskList = () => {
  const { filteredTasks, filter } = useTaskContext();
  // Strict boolean required by react-beautiful-dnd
  const isDropDisabled = filter !== 'all';

  return (
    <div>
      {isDropDisabled && filteredTasks.length > 0 && (
        <p className="dnd-hint" role="note">
          💡 Switch to <strong>All</strong> filter to drag and reorder tasks.
        </p>
      )}
      <Droppable
        droppableId="task-list"
        isDropDisabled={isDropDisabled}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided, snapshot) => (
          <div
            id="task-list"
            className="task-list-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver && !isDropDisabled
                ? 'var(--accent-soft)'
                : 'transparent',
              borderRadius: 'var(--radius-lg)',
              padding: snapshot.isDraggingOver && !isDropDisabled ? '4px' : '0',
              transition: 'background 200ms ease, padding 200ms ease',
            }}
            aria-label="Task list"
          >
            {filteredTasks.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              filteredTasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(TaskList);
