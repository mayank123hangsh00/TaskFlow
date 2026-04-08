import { memo } from 'react';

const EmptyState = ({ filter }) => {
  const content = {
    all: {
      icon: '📝',
      title: 'No tasks yet',
      subtitle: 'Add your first task above to get started!',
    },
    pending: {
      icon: '🎉',
      title: 'All caught up!',
      subtitle: "You've completed everything. Add more tasks to keep going.",
    },
    completed: {
      icon: '🚀',
      title: 'Nothing completed yet',
      subtitle: 'Check off tasks to see them here.',
    },
  };

  const { icon, title, subtitle } = content[filter] || content.all;

  return (
    <div id="empty-state" className="empty-state" role="status" aria-live="polite">
      <span className="empty-state-icon" aria-hidden="true">{icon}</span>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-subtitle">{subtitle}</p>
    </div>
  );
};

export default memo(EmptyState);
