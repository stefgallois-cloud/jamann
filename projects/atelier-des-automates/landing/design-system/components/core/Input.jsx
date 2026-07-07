export function Input({ type = 'text', placeholder, value, onChange, label, hint, error, disabled = false, icon }) {
  const [focused, setFocused] = React.useState(false);

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    fontFamily: 'var(--font-body)',
  };

  const labelStyle = {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
  };

  const fieldWrap = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: icon ? '12px 16px 12px 40px' : '12px 16px',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text-primary)',
    background: 'var(--color-surface)',
    border: error
      ? '1.5px solid #EF4444'
      : focused
      ? '1.5px solid var(--color-primary)'
      : '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
    transition: 'all var(--transition-fast)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
  };

  const hintStyle = {
    fontSize: 'var(--text-xs)',
    color: error ? '#EF4444' : 'var(--color-text-muted)',
  };

  const iconStyle = {
    position: 'absolute',
    left: '12px',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
    fontSize: '16px',
  };

  return React.createElement('div', { style: wrapStyle },
    label && React.createElement('label', { style: labelStyle }, label),
    React.createElement('div', { style: fieldWrap },
      icon && React.createElement('span', { style: iconStyle }, icon),
      React.createElement('input', {
        type,
        placeholder,
        value,
        onChange,
        disabled,
        style: inputStyle,
        onFocus: () => setFocused(true),
        onBlur:  () => setFocused(false),
      })
    ),
    (hint || error) && React.createElement('span', { style: hintStyle }, error || hint)
  );
}
