export function Badge({ children, variant = 'default', size = 'md' }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { fontSize: '10px', padding: '2px 8px' },
    md: { fontSize: '11px', padding: '4px 10px' },
  };

  const variants = {
    default:  { background: 'rgba(99,102,241,0.1)',  color: 'var(--color-indigo-600)' },
    violet:   { background: 'rgba(167,139,250,0.12)', color: 'var(--color-violet-500)' },
    cyan:     { background: 'rgba(6,182,212,0.12)',   color: 'var(--color-cyan-600)'   },
    dark:     { background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)'   },
    outline:  { background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' },
    success:  { background: 'rgba(16,185,129,0.1)',  color: '#059669' },
  };

  const style = { ...base, ...sizes[size], ...variants[variant] };
  return React.createElement('span', { style }, children);
}
