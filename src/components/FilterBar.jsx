import { memo, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';

const FILTERS = [
  { key: 'all',       label: 'All',       emoji: '📋' },
  { key: 'pending',   label: 'Pending',   emoji: '⏳' },
  { key: 'completed', label: 'Completed', emoji: '✅' },
];

const FilterBar = () => {
  const { filter, setFilter, counts } = useTaskContext();

  const filterButtons = useMemo(() =>
    FILTERS.map(({ key, label, emoji }) => (
      <button
        key={key}
        id={`filter-btn-${key}`}
        className={`filter-btn${filter === key ? ' active' : ''}`}
        onClick={() => setFilter(key)}
        aria-pressed={filter === key}
        aria-label={`Show ${label} tasks (${counts[key]})`}
      >
        <span>{emoji} {label}</span>
        <span className="filter-count">{counts[key]}</span>
      </button>
    )), [filter, setFilter, counts]);

  return (
    <div id="filter-bar" className="filter-bar" role="toolbar" aria-label="Task filters">
      {filterButtons}
    </div>
  );
};

export default memo(FilterBar);
