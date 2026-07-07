/* @ds-bundle: {"format":4,"namespace":"LAtelierDesAutomatesDesignSystem_95f56b","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"d8637b77eae1","components/core/Button.jsx":"dfb83246447b","components/core/Card.jsx":"4e8769ec176e","components/core/Input.jsx":"0dc7eef01540","components/core/Tag.jsx":"cefaaf49e5b5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LAtelierDesAutomatesDesignSystem_95f56b = window.LAtelierDesAutomatesDesignSystem_95f56b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  variant = 'default',
  size = 'md'
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      fontSize: '10px',
      padding: '2px 8px'
    },
    md: {
      fontSize: '11px',
      padding: '4px 10px'
    }
  };
  const variants = {
    default: {
      background: 'rgba(99,102,241,0.1)',
      color: 'var(--color-indigo-600)'
    },
    violet: {
      background: 'rgba(167,139,250,0.12)',
      color: 'var(--color-violet-500)'
    },
    cyan: {
      background: 'rgba(6,182,212,0.12)',
      color: 'var(--color-cyan-600)'
    },
    dark: {
      background: 'rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.9)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)'
    },
    success: {
      background: 'rgba(16,185,129,0.1)',
      color: '#059669'
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  return React.createElement('span', {
    style
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  href,
  icon
}) {
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
    lineHeight: 1
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-sm)',
      padding: '8px 16px'
    },
    md: {
      fontSize: 'var(--text-base)',
      padding: '12px 24px'
    },
    lg: {
      fontSize: 'var(--text-lg)',
      padding: '16px 32px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-text-inverted)',
      boxShadow: '0 2px 8px rgba(99,102,241,0.25)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
      padding: size === 'sm' ? '6px 14px' : size === 'lg' ? '14px 30px' : '10px 22px'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-body)'
    },
    gradient: {
      background: 'var(--gradient-brand)',
      color: 'var(--color-text-inverted)',
      boxShadow: '0 4px 16px rgba(99,102,241,0.35)'
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  const [hovered, setHovered] = React.useState(false);
  const hoverStyle = hovered && !disabled ? {
    transform: 'translateY(-1px)',
    boxShadow: variant === 'ghost' ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
    background: variant === 'primary' ? 'var(--color-primary-hover)' : variant === 'secondary' ? 'rgba(99,102,241,0.06)' : variant === 'ghost' ? 'rgba(99,102,241,0.06)' : 'var(--gradient-brand)'
  } : {};
  const combined = {
    ...style,
    ...hoverStyle
  };
  if (href) {
    return React.createElement('a', {
      href,
      style: combined,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    }, icon && React.createElement('span', null, icon), children);
  }
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    disabled,
    style: combined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, icon && React.createElement('span', null, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  style: extraStyle
}) {
  const [hovered, setHovered] = React.useState(false);
  const paddings = {
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const base = {
    background: variant === 'dark' ? 'rgba(255,255,255,0.05)' : 'var(--color-surface)',
    border: variant === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: paddings[padding],
    boxShadow: hovered && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
    transform: hovered && hover ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all var(--transition-base)',
    fontFamily: 'var(--font-body)',
    ...extraStyle
  };
  return React.createElement('div', {
    style: base,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  hint,
  error,
  disabled = false,
  icon
}) {
  const [focused, setFocused] = React.useState(false);
  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    fontFamily: 'var(--font-body)'
  };
  const labelStyle = {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-text-primary)'
  };
  const fieldWrap = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };
  const inputStyle = {
    width: '100%',
    padding: icon ? '12px 16px 12px 40px' : '12px 16px',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text-primary)',
    background: 'var(--color-surface)',
    border: error ? '1.5px solid #EF4444' : focused ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
    transition: 'all var(--transition-fast)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box'
  };
  const hintStyle = {
    fontSize: 'var(--text-xs)',
    color: error ? '#EF4444' : 'var(--color-text-muted)'
  };
  const iconStyle = {
    position: 'absolute',
    left: '12px',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
    fontSize: '16px'
  };
  return React.createElement('div', {
    style: wrapStyle
  }, label && React.createElement('label', {
    style: labelStyle
  }, label), React.createElement('div', {
    style: fieldWrap
  }, icon && React.createElement('span', {
    style: iconStyle
  }, icon), React.createElement('input', {
    type,
    placeholder,
    value,
    onChange,
    disabled,
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  })), (hint || error) && React.createElement('span', {
    style: hintStyle
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  color = 'default'
}) {
  const colors = {
    default: {
      background: 'var(--color-bg-subtle)',
      color: 'var(--color-text-body)',
      border: '1px solid var(--color-border)'
    },
    indigo: {
      background: 'rgba(99,102,241,0.1)',
      color: 'var(--color-indigo-600)',
      border: '1px solid rgba(99,102,241,0.2)'
    },
    violet: {
      background: 'rgba(167,139,250,0.1)',
      color: 'var(--color-violet-500)',
      border: '1px solid rgba(167,139,250,0.2)'
    },
    cyan: {
      background: 'rgba(6,182,212,0.1)',
      color: 'var(--color-cyan-600)',
      border: '1px solid rgba(6,182,212,0.2)'
    }
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
    ...colors[color]
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
    marginLeft: '2px'
  };
  return React.createElement('span', {
    style
  }, children, onRemove && React.createElement('button', {
    onClick: onRemove,
    style: removeStyle
  }, '×'));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

})();
