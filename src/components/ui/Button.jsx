import { forwardRef } from 'react';

const Button = forwardRef(({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    sx,
    ...props
}, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: {
            style: {
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)',
                color: 'var(--primary-foreground)',
                boxShadow: '0 0 0 1px color-mix(in oklab, var(--primary) 30%, transparent), 0 20px 60px -20px color-mix(in oklab, var(--primary) 50%, transparent)',
                padding: '10px 24px',
            },
        },
        outlined: {
            style: {
                background: 'transparent',
                color: 'color-mix(in oklab, var(--foreground) 85%, transparent)',
                border: '1px solid color-mix(in oklab, var(--foreground) 14%, transparent)',
                padding: '10px 24px',
            },
        },
        ghost: {
            style: {
                background: 'transparent',
                color: 'var(--primary-glow)',
                padding: '10px 24px',
            },
        },
        danger: {
            style: {
                background: 'color-mix(in oklab, var(--destructive) 20%, transparent)',
                color: 'var(--destructive)',
                border: '1px solid color-mix(in oklab, var(--destructive) 30%, transparent)',
                padding: '10px 24px',
            },
        },
    };

    const chosen = variants[variant] || variants.primary;

    const handleMouseEnter = (e) => {
        if (disabled) return;
        if (variant === 'primary') {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 30px 80px -30px color-mix(in oklab, var(--primary) 40%, transparent)';
        } else if (variant === 'outlined') {
            e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--primary-glow) 40%, transparent)';
            e.currentTarget.style.color = 'var(--foreground)';
        } else if (variant === 'ghost') {
            e.currentTarget.style.background = 'color-mix(in oklab, var(--primary-glow) 8%, transparent)';
        }
    };

    const handleMouseLeave = (e) => {
        if (disabled) return;
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = chosen.style.boxShadow || '';
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.color = chosen.style.color;
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
    };

    return (
        <button
            ref={ref}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${className}`}
            style={chosen.style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';
export default Button;
