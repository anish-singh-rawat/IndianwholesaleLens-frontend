import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from './store/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { PATHS, routesConfig } from './routes/config';
import ProtectedRoute from './components/ProtectedRoute';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { useEffect } from 'react';

// Force dark mode globally
if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
}

// ── Unauthorized page ─────────────────────────────────────────────────────────
const UnauthorizedPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8"
         style={{ background: 'var(--background)' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
            <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full blur-[140px]"
                 style={{ background: 'color-mix(in oklab, var(--primary-glow) 18%, transparent)' }} />
            <div className="absolute bottom-[-20%] left-[-10%] h-[360px] w-[360px] rounded-full blur-[140px]"
                 style={{ background: 'color-mix(in oklab, var(--primary) 15%, transparent)' }} />
        </div>

        <div className="rounded-2xl glass p-8 text-center max-w-md w-full shadow-glow">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                 style={{ background: 'color-mix(in oklab, var(--destructive) 15%, transparent)', border: '1px solid color-mix(in oklab, var(--destructive) 30%, transparent)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    style={{ color: 'var(--destructive)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                Access Denied
            </h1>
            <p className="text-sm mb-1" style={{ color: 'var(--muted-foreground)' }}>
                You don't have permission to view this page.
            </p>
            <p className="text-xs mb-6" style={{ color: 'color-mix(in oklab, var(--muted-foreground) 60%, transparent)' }}>
                Contact your administrator if you believe this is an error.
            </p>
            <a href={PATHS.ROOT}
               className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
               style={{
                   background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)',
                   color: 'var(--primary-foreground)',
               }}>
                Go to Dashboard
            </a>
        </div>
    </div>
);

// ── Route renderer ────────────────────────────────────────────────────────────
function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user            = useSelector(selectCurrentUser);

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const renderRoutes = (routes) => routes.map((route, index) => {
        const {
            element: Component,
            props: routeProps = {},
            children,
            isPublic,
            index: isIndexRoute,
            path,
            page,
        } = route;

        let element = <Component {...routeProps} />;

        if (isPublic && (path === PATHS.LOGIN || path === PATHS.CUSTOMER_LOGIN)) {
            element = !isAuthenticated
                ? <Component />
                : <Navigate
                    to={user?.EmployeeType === 'CUSTOMER' ? PATHS.CUSTOMER_PORTAL : PATHS.WELCOME}
                    state={{ from: 'login' }}
                    replace
                />;
        }

        if (!isPublic && page) {
            element = (
                <ProtectedRoute page={page}>
                    <Component {...routeProps} />
                </ProtectedRoute>
            );
        }

        if (isIndexRoute) {
            return <Route key={`index-${index}`} index element={element} />;
        }

        if (children) {
            return (
                <Route key={path || `wrapper-${index}`} path={path} element={element}>
                    {renderRoutes(children)}
                </Route>
            );
        }

        return <Route key={path} path={path} element={element} />;
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <div className="min-h-screen font-sans" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
                        <Routes>
                            {renderRoutes(routesConfig)}
                            <Route path={PATHS.UNAUTHORIZED} element={<UnauthorizedPage />} />
                        </Routes>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        style={{ zIndex: 99999 }}
                        toastStyle={{
                            background: 'rgba(10, 22, 40, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#E2EAF4',
                        }}
                    />
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
