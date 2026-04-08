import { useState, useCallback, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskInput = () => {
  const { addTask } = useTaskContext();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Task cannot be empty. Please enter a task description.');
      inputRef.current?.focus();
      return;
    }
    if (value.trim().length < 3) {
      setError('Task must be at least 3 characters long.');
      inputRef.current?.focus();
      return;
    }
    addTask(value.trim());
    setValue('');
    setError('');
    inputRef.current?.focus();
  }, [value, addTask]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setValue('');
      setError('');
    }
  }, []);

  return (
    <div className="glass-card task-input-wrapper">
      <form
        id="task-input-form"
        className="task-input-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          ref={inputRef}
          id="task-input-field"
          type="text"
          className={`task-input-field${error ? ' error' : ''}`}
          placeholder="What needs to be done? (press Enter or click Add)"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={200}
          aria-label="New task input"
          aria-describedby={error ? 'task-input-error' : undefined}
          autoFocus
        />
        <button
          id="add-task-btn"
          type="submit"
          className="add-btn"
          aria-label="Add task"
        >
          + Add Task
        </button>
      </form>
      {error && (
        <p id="task-input-error" className="error-msg" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default TaskInput;
