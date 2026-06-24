import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import GoBackButton from '../navigation/GoBackButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const MainLayout = () => {
    const isMobile = useMediaQuery('(max-width:900px)');
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--sidebar-width',
            isSidebarOpen && !isMobile ? '280px' : '0px'
        );
    }, [isSidebarOpen, isMobile]);

    return (
        <div className="flex min-h-screen w-full relative overflow-hidden"
             style={{ background: 'var(--background)' }}>

            {/* Background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 right-[-12%] h-[500px] w-[500px] rounded-full blur-[160px] animate-pulse-glow"
                     style={{ background: 'color-mix(in oklab, var(--primary-glow) 14%, transparent)' }} />
                <div className="absolute bottom-[-20%] left-[-8%] h-[400px] w-[400px] rounded-full blur-[140px] animate-float-slow"
                     style={{ background: 'color-mix(in oklab, var(--primary) 12%, transparent)' }} />
            </div>

            {/* Grid backdrop */}
            <div className="pointer-events-none absolute inset-0 grid-bg -z-10 opacity-40" />

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content */}
            <main className="flex flex-col flex-1 min-h-screen w-full relative z-10 p-3 md:p-5 pt-4 md:pt-6 overflow-x-hidden">
                <div className="flex flex-col gap-4 h-full max-w-full">

                    {/* Topbar */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}>
                        <Topbar onMenuClick={toggleSidebar} />
                    </motion.div>

                    {/* Go Back row */}
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
                        className="rounded-xl glass px-4 py-2.5 flex items-center">
                        <GoBackButton />
                    </motion.div>

                    {/* Page content */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14, ease: 'easeOut' }}
                        className="flex-1 rounded-2xl glass-strong p-4 md:p-6 min-h-[calc(100vh-260px)] overflow-hidden">
                        <Outlet />
                    </motion.div>
                </div>
            </main>

            {/* FAB — New Order */}
            <motion.button
                onClick={() => navigate('/new-order')}
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center h-14 w-14 rounded-full shadow-glow transition-shadow"
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Create New Order">
                <Plus size={26} style={{ color: 'var(--primary-foreground)' }} />
            </motion.button>
        </div>
    );
};

export default MainLayout;
