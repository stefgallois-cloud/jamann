export function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick, href, icon }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    transition: 'all var(--transition-base)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  const sizes = {
    sm: { fontSize: 'var(--text-sm)',  padding: '8px 16px' },
    md: { fontSize: 'var(--text-base)', padding: '12px 24px' },
    lg: { fontSize: 'var(--text-lg)',  padding: '16px 32px' },
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-text-inverted)',
      boxShadow: '0 2px 8px rgba(99,102,241,0.25)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
      padding: size === 'sm' ? '6px 14px' : size === 'lg' ? '14px 30px' : '10px 22px',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-body)',
    },
    gradient: {
      background: 'var(--gradient-brand)',
      color: 'var(--color-text-inverted)',
      boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
    },
  };

  const style = { ...base, ...sizes[size], ...variants[variant] };

  const [hovered, setHovered] = React.useState(false);
  const hoverStyle = hovered && !disabled ? {
    transform: 'translateY(-1px)',
    boxShadow: variant === 'ghost' ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
    background: variant === 'primary' ? 'var(--color-primary-hover)' :
                variant === 'secondary' ? 'rgba(99,102,241,0.06)' :
                variant === 'ghost' ? 'rgba(99,102,241,0.06)' :
                'var(--gradient-brand)',
  } : {};

  const combined = { ...style, ...hoverStyle };

  if (href) {
    return React.createElement('a', {
      href,
      style: combined,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    }, icon && React.createElement('span', null, icon), children);
  }

  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    disabled,
    style: combined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }, icon && React.createElement('span', null, icon), children);
}
