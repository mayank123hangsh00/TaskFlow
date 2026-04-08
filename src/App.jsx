import { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

const ProgressSection = () => {
  const { counts, completionRate } = useTaskContext();
  return (
    <>
      <div className="stats-row" aria-label="Task statistics">
        <div className="stat-chip">
          <span className="stat-chip-value">{counts.all}</span>
          <span className="stat-chip-label">Total</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-value">{counts.pending}</span>
          <span className="stat-chip-label">Pending</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-value">{counts.completed}</span>
          <span className="stat-chip-label">Done</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-value">{completionRate}%</span>
          <span className="stat-chip-label">Progress</span>
        </div>
      </div>

      {counts.all > 0 && (
        <div
          className="progress-section"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${completionRate}% of tasks completed`}
        >
          <div className="progress-label">
            <span>Overall Progress</span>
            <span>{completionRate}% complete</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const AppContent = () => {
  const { reorderTasks, filter, filteredTasks, tasks } = useTaskContext();

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    if (filter !== 'all') return;

    reorderTasks(result.source.index, result.destination.index);
  }, [reorderTasks, filter]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app-wrapper">
        <header className="app-header">
          <div>
            <h1 className="app-title">TaskFlow ✦</h1>
            <p className="app-subtitle">
              {tasks.length === 0
                ? 'Start by adding your first task'
                : `Managing ${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <ThemeToggle />
        </header>

        <main>
          <TaskInput />
          <ProgressSection />
          <FilterBar />
          <TaskList />
        </main>
      </div>
    </DragDropContext>
  );
};

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
