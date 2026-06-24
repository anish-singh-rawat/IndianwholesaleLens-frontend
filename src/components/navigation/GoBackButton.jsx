import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { PATHS } from '../../routes/config';
import { ChevronLeft } from 'lucide-react';

const GoBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) return null;

    const fallbackPath = (PATHS.CUSTOMER_PORTAL && location.pathname.startsWith(PATHS.CUSTOMER_PORTAL))
        ? PATHS.CUSTOMER_PORTAL
        : PATHS.WELCOME;

    const handleGoBack = () => {
        if ((window.history.state?.idx ?? 0) > 0) {
            navigate(-1);
            return;
        }
        navigate(fallbackPath, { replace: true });
    };

    return (
        <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
            style={{
                background: 'color-mix(in oklab, var(--foreground) 6%, transparent)',
                border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
                color: 'var(--muted-foreground)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--primary-glow) 40%, transparent)';
                e.currentTarget.style.color = 'var(--primary-glow)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--foreground) 10%, transparent)';
                e.currentTarget.style.color = 'var(--muted-foreground)';
            }}
            aria-label="Go back">
            <ChevronLeft size={14} />
            <span>Go back</span>
        </button>
    );
};

export default GoBackButton;
