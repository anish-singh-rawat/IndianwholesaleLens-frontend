import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import Button from './Button';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    type = 'danger',
    loading = false,
    children,
}) => {
    if (!isOpen) return null;

    const themes = {
        danger: {
            icon: 'mdi:alert-circle',
            color: 'var(--destructive)',
            iconBg: 'color-mix(in oklab, var(--destructive) 12%, transparent)',
            iconBorder: 'color-mix(in oklab, var(--destructive) 25%, transparent)',
            btnStyle: { background: 'var(--destructive)', color: '#fff' },
        },
        warning: {
            icon: 'mdi:alert-outline',
            color: 'var(--warning)',
            iconBg: 'color-mix(in oklab, var(--warning) 12%, transparent)',
            iconBorder: 'color-mix(in oklab, var(--warning) 25%, transparent)',
            btnStyle: { background: 'var(--warning)', color: '#1a1a1a' },
        },
        info: {
            icon: 'mdi:information-outline',
            color: 'var(--primary-glow)',
            iconBg: 'color-mix(in oklab, var(--primary-glow) 12%, transparent)',
            iconBorder: 'color-mix(in oklab, var(--primary-glow) 25%, transparent)',
            btnStyle: { background: 'linear-gradient(135deg, var(--primary), var(--primary-glow))', color: 'var(--primary-foreground)' },
        },
    };

    const t = themes[type] || themes.danger;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
             style={{ background: 'rgba(4,18,38,0.75)' }}>
            <div
                className="w-full max-w-md rounded-3xl overflow-hidden"
                style={{
                    background: 'rgba(8, 18, 36, 0.97)',
                    backdropFilter: 'blur(28px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                }}
                onClick={e => e.stopPropagation()}>
                <div className="p-8 pb-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                         style={{ background: t.iconBg, border: `1px solid ${t.iconBorder}` }}>
                        <Icon icon={t.icon} style={{ fontSize: '2rem', color: t.color }} />
                    </div>

                    <h2 className="text-xl font-bold uppercase tracking-tight mb-2"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed px-4" style={{ color: 'var(--muted-foreground)' }}>
                        {message}
                    </p>

                    {children && <div className="w-full mt-5 px-4">{children}</div>}
                </div>

                <div className="flex gap-3 px-8 pb-8">
                    <Button variant="outlined" onClick={onClose} disabled={loading} className="flex-1">
                        {cancelText}
                    </Button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-2.5 px-5 font-semibold rounded-xl text-white transition-all focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={t.btnStyle}>
                        {loading && <Icon icon="mdi:loading" className="animate-spin text-xl" />}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;
