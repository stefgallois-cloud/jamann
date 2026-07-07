export function Tag({ children, onRemove, color = 'default' }) {
  const colors = {
    default: { background: 'var(--color-bg-subtle)', color: 'var(--color-text-body)', border: '1px solid var(--color-border)' },
    indigo:  { background: 'rgba(99,102,241,0.1)',   color: 'var(--color-indigo-600)', border: '1px solid rgba(99,102,241,0.2)' },
    violet:  { background: 'rgba(167,139,250,0.1)',  color: 'var(--color-violet-500)', border: '1px solid rgba(167,139,250,0.2)' },
    cyan:    { background: 'rgba(6,182,212,0.1)',    color: 'var(--color-cyan-600)',   border: '1px solid rgba(6,182,212,0.2)' },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    lineHeight: 1.4,
    ...colors[color],
  };

  const removeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.1)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '10px',
    lineHeight: 1,
    color: 'inherit',
    padding: 0,
    marginLeft: '2px',
  };

  return React.createElement('span', { style },
    children,
    onRemove && React.createElement('button', { onClick: onRemove, style: removeStyle }, '×')
  );
}
