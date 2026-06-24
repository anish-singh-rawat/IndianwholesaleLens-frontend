import { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    error,
    containerClassName = '',
    variant = 'default',
    isVerificationMode = false,
    isRejected = false,
    onToggleRejection,
    name,
    ...props
}, ref) => {
    return (
        <div className={`w-full flex items-center gap-3 ${containerClassName}`}>
            {/* Verification checkbox */}
            {isVerificationMode && (
                <button
                    type="button"
                    onClick={() => onToggleRejection?.(name)}
                    className="flex-shrink-0 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all"
                    style={{
                        borderColor: isRejected
                            ? 'var(--destructive)'
                            : 'color-mix(in oklab, var(--foreground) 20%, transparent)',
                        background: isRejected
                            ? 'color-mix(in oklab, var(--destructive) 20%, transparent)'
                            : 'transparent',
                    }}>
                    {isRejected && (
                        <span className="h-2 w-2 rounded-full block"
                              style={{ background: 'var(--destructive)' }} />
                    )}
                </button>
            )}

            {/* Input wrapper */}
            <div className="relative w-full flex flex-col gap-1">
                {label && (
                    <label
                        htmlFor={name}
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: 'var(--muted-foreground)' }}>
                        {label}
                    </label>
                )}

                <div className="relative flex items-center">
                    <input
                        ref={ref}
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 pr-10"
                        style={{
                            background: isRejected
                                ? 'color-mix(in oklab, var(--destructive) 8%, transparent)'
                                : 'color-mix(in oklab, var(--foreground) 5%, transparent)',
                            border: `1px solid ${isRejected
                                ? 'color-mix(in oklab, var(--destructive) 40%, transparent)'
                                : error
                                    ? 'color-mix(in oklab, var(--destructive) 40%, transparent)'
                                    : 'color-mix(in oklab, var(--foreground) 10%, transparent)'}`,
                            color: 'var(--foreground)',
                        }}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--primary-glow) 60%, transparent)';
                            e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in oklab, var(--primary-glow) 10%, transparent)';
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = isRejected || error
                                ? 'color-mix(in oklab, var(--destructive) 40%, transparent)'
                                : 'color-mix(in oklab, var(--foreground) 10%, transparent)';
                            e.currentTarget.style.boxShadow = '';
                        }}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute right-3 flex items-center justify-center"
                             style={{ color: 'var(--muted-foreground)' }}>
                            {icon}
                        </div>
                    )}
                </div>

                {error?.message && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--destructive)' }}>
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
