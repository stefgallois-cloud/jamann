export function Card({ children, variant = 'default', padding = 'md', hover = true, style: extraStyle }) {
  const [hovered, setHovered] = React.useState(false);

  const paddings = {
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)',
  };

  const base = {
    background: variant === 'dark' ? 'rgba(255,255,255,0.05)' : 'var(--color-surface)',
    border: variant === 'dark'
      ? '1px solid rgba(255,255,255,0.1)'
      : '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: paddings[padding],
    boxShadow: hovered && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
    transform: hovered && hover ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all var(--transition-base)',
    fontFamily: 'var(--font-body)',
    ...extraStyle,
  };

  return React.createElement('div', {
    style: base,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }, children);
}
