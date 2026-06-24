const CustomToggle = ({
    options = [],
    value,
    onChange,
    label,
    containerClassName = '',
    disabled = false,
}) => {
    return (
        <div className={`flex items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${containerClassName}`}>
            {label && (
                <label className="block text-xs whitespace-nowrap font-semibold uppercase tracking-widest px-1"
                       style={{ color: 'var(--primary-glow)' }}>
                    {label}
                </label>
            )}
            <div className="flex p-1 w-full rounded-2xl"
                 style={{
                     background: 'color-mix(in oklab, var(--foreground) 6%, transparent)',
                     border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
                 }}>
                {options.map((option) => {
                    const isActive = value === option.value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => !disabled && onChange(option.value)}
                            disabled={disabled}
                            className="flex-1 py-2.5 px-4 rounded-xl whitespace-nowrap text-xs font-semibold uppercase transition-all duration-200"
                            style={{
                                background: isActive
                                    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)'
                                    : 'transparent',
                                color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                                boxShadow: isActive
                                    ? '0 0 0 1px color-mix(in oklab, var(--primary-glow) 30%, transparent)'
                                    : 'none',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                            }}>
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomToggle;
