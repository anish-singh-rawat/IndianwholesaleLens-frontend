import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { PATHS } from '../../routes/config'; // Fixed path from PATHS.paths to PATHS.config if needed

const GoBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return null;
    }

    // Checking if PATHS.CUSTOMER_PORTAL exists, otherwise fallback to root or welcome
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
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-erp-accent/30 hover:text-erp-accent focus:outline-none focus:ring-2 focus:ring-erp-accent/10"
            aria-label="Go back"
        >
            <Icon icon="mdi:arrow-left" className="h-4 w-4" />
            <span>Go back</span>
        </button>
    );
};

export default GoBackButton;
