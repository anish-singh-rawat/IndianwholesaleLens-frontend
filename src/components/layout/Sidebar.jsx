import { PATHS } from '../../routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@mui/material';
import { logoutUser } from '../../services/authService';
import { logOut, selectCurrentUser } from '../../store/slices/authSlice';
import usePermissions from '../../hooks/usePermissions';
import { resetRegistration } from '../../store/slices/customerRegistrationSlice';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: 'lucide:layout-dashboard', path: PATHS.ROOT, page: 'DASHBOARD' },
    {
        label: 'Add New',
        icon: 'lucide:square-pen',
        subItems: [
            { label: 'Register Customer', path: PATHS.CUSTOMER.REGISTER, page: 'REGISTER_CUSTOMER' },
            { label: 'Register Staff',    path: PATHS.STAFF.REGISTER,    page: 'REGISTER_STAFF' },
        ],
    },
    {
        label: 'Staff',
        icon: 'lucide:users',
        subItems: [
            { label: 'Staff List', path: PATHS.STAFF.LIST, page: 'STAFF_LIST' },
        ],
    },
    {
        label: 'Customer',
        icon: 'lucide:user-round',
        subItems: [
            { label: 'Customer List', path: PATHS.CUSTOMER.LIST,    page: 'CUSTOMER_LIST' },
            { label: 'Ship To',       path: PATHS.CUSTOMER.SHIP_TO, page: 'SHIP_TO' },
            { label: 'Approvals',     path: PATHS.APPROVALS,        page: 'APPROVALS' },
            { label: 'Corrections',   path: PATHS.CORRECTIONS,      page: 'CORRECTIONS' },
        ],
    },
    {
        label: 'Orders',
        icon: 'lucide:headphones',
        subItems: [
            { label: 'New Order',      path: PATHS.CUSTOMER_CARE.NEW_ORDER,      page: 'NEW_ORDER',      isBold: true },
            { label: 'All Orders',     path: PATHS.CUSTOMER_CARE.ALL_ORDERS,     page: 'ALL_ORDERS' },
            { label: 'Pending Orders', path: PATHS.CUSTOMER_CARE.PENDING_ORDERS, page: 'PENDING_ORDERS' },
            { label: 'Other Sales',    path: PATHS.CUSTOMER_CARE.SERVICE_GOODS,  page: 'OTHER_SALES' },
            { label: 'Sales List',     path: PATHS.SALES.LIST,                   page: 'SALES_LIST' },
        ],
    },
    {
        label: 'Returns & Exchanges',
        icon: 'lucide:undo-2',
        subItems: [
            { label: 'Return & Refund',   path: PATHS.RETURNS.RETURN_REFUND, page: 'RETURN_REFUND' },
            { label: 'Exchange Requests', path: PATHS.RETURNS.EXCHANGE,      page: 'EXCHANGE_REQUESTS' },
        ],
    },
    { label: 'Drafts',   icon: 'lucide:file-text',    path: PATHS.DRAFTS,              page: 'DRAFTS' },
    {
        label: 'Reports',
        icon: 'lucide:chart-column',
        subItems: [
            { label: 'Daily Report', path: PATHS.REPORTS.DAILY, page: 'DAILY_REPORT' },
            { label: 'Main Report',  path: PATHS.REPORTS.MAIN,  page: 'MAIN_REPORT' },
        ],
    },
    {
        label: 'Repair',
        icon: 'lucide:tool-case',
        subItems: [
            { label: 'Add Repair',  path: PATHS.REPAIR.ADD,  page: 'ADD_REPAIR' },
            { label: 'Repair List', path: PATHS.REPAIR.LIST, page: 'REPAIR_LIST' },
        ],
    },
    {
        label: 'Vendor',
        icon: 'lucide:truck',
        subItems: [
            { label: 'Add Vendor',   path: PATHS.VENDOR.ADD,   page: 'ADD_VENDOR' },
            { label: 'Vendor List',  path: PATHS.VENDOR.LIST,  page: 'VENDOR_LIST' },
            { label: 'Vendor Order', path: PATHS.VENDOR.ORDER, page: 'VENDOR_ORDER' },
        ],
    },
    { label: 'Quality',   icon: 'lucide:badge-check',   path: PATHS.OPERATIONS.QC,       page: 'QUALITY' },
    { label: 'Fitting',   icon: 'lucide:ruler',          path: PATHS.OPERATIONS.FITTING,  page: 'FITTING' },
    { label: 'Shipping',  icon: 'lucide:send',           path: PATHS.OPERATIONS.DISPATCH, page: 'SHIPPING' },
    { label: 'Inventory', icon: 'lucide:package-search', path: PATHS.INVENTORY,           page: 'INVENTORY' },
];

const drawerWidth = 280;

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch   = useDispatch();
    const location   = useLocation();
    const user       = useSelector(selectCurrentUser);
    const { hasPageAccess } = usePermissions();
    const isMobile   = useMediaQuery('(max-width:900px)');
    const [openSubmenus, setOpenSubmenus] = useState({});

    const filteredNavItems = useMemo(() => {
        return navItems
            .map(item => {
                if (item.subItems) {
                    const filteredSubs = item.subItems.filter(sub =>
                        sub.page ? hasPageAccess(sub.page) : true
                    );
                    if (filteredSubs.length === 0) return null;
                    return { ...item, subItems: filteredSubs };
                }
                return (item.page ? hasPageAccess(item.page) : true) ? item : null;
            })
            .filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        const newOpen = {};
        filteredNavItems.forEach(item => {
            if (item.subItems?.some(sub => sub.path === location.pathname)) {
                newOpen[item.label] = true;
            }
        });
        setOpenSubmenus(prev => ({ ...prev, ...newOpen }));
    }, [location.pathname, filteredNavItems]);

    const toggleSubmenu = (label) =>
        setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));

    const handleLogout = async () => {
        try { await logoutUser(); } catch {}
        finally {
            dispatch(resetRegistration());
            dispatch(logOut());
        }
    };

    const isParentActive = (item) =>
        item.subItems?.some(sub => sub.path === location.pathname);

    const SidebarContent = () => (
        <div className="flex flex-col h-full" style={{ background: 'rgba(8,18,36,0.97)', backdropFilter: 'blur(28px)' }}>
            {/* Logo */}
            <div className="flex items-center justify-center px-6 py-6 border-b"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <img src={logo} alt="DigiOptics" className="max-w-[140px] w-full object-contain" />
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
                <nav className="flex flex-col gap-1">
                    {filteredNavItems.map((item) => {
                        const hasSub   = !!item.subItems;
                        const isActive = hasSub ? isParentActive(item) : location.pathname === item.path;
                        const isOpenSub = openSubmenus[item.label];

                        return (
                            <div key={item.label}>
                                {hasSub ? (
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={{
                                            background: isActive
                                                ? 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 25%, transparent), color-mix(in oklab, var(--primary-glow) 15%, transparent))'
                                                : 'transparent',
                                            color: isActive ? 'var(--primary-glow)' : 'var(--muted-foreground)',
                                            border: isActive ? '1px solid color-mix(in oklab, var(--primary-glow) 25%, transparent)' : '1px solid transparent',
                                        }}>
                                        <Icon icon={item.icon} style={{ fontSize: '18px', flexShrink: 0 }} />
                                        <span className="flex-1 text-left" style={{ fontFamily: 'var(--font-sans)' }}>{item.label}</span>
                                        <ChevronDown size={14} style={{
                                            transition: 'transform 0.2s',
                                            transform: isOpenSub ? 'rotate(180deg)' : 'rotate(0deg)',
                                            opacity: 0.6
                                        }} />
                                    </button>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        onClick={() => isMobile && toggleSidebar()}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={({ isActive: navActive }) => ({
                                            background: navActive
                                                ? 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 25%, transparent), color-mix(in oklab, var(--primary-glow) 15%, transparent))'
                                                : 'transparent',
                                            color: navActive ? 'var(--primary-glow)' : 'var(--muted-foreground)',
                                            border: navActive ? '1px solid color-mix(in oklab, var(--primary-glow) 25%, transparent)' : '1px solid transparent',
                                        })}>
                                        <Icon icon={item.icon} style={{ fontSize: '18px', flexShrink: 0 }} />
                                        <span style={{ fontFamily: 'var(--font-sans)' }}>{item.label}</span>
                                    </NavLink>
                                )}

                                {/* Subitems */}
                                <AnimatePresence initial={false}>
                                    {hasSub && isOpenSub && (
                                        <motion.div
                                            key="submenu"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="overflow-hidden">
                                            <div className="ml-6 mt-1 mb-1 flex flex-col gap-0.5 pl-3 border-l"
                                                 style={{ borderColor: 'color-mix(in oklab, var(--primary) 20%, transparent)' }}>
                                                {item.subItems.map((sub) => {
                                                    const isSubActive = location.pathname === sub.path;
                                                    return (
                                                        <NavLink
                                                            key={sub.path}
                                                            to={sub.path}
                                                            onClick={() => isMobile && toggleSidebar()}
                                                            className="rounded-lg px-3 py-2 text-xs transition-all duration-150"
                                                            style={{
                                                                color: isSubActive ? 'var(--primary-glow)' : 'var(--muted-foreground)',
                                                                fontWeight: isSubActive ? 600 : 400,
                                                                background: isSubActive
                                                                    ? 'color-mix(in oklab, var(--primary-glow) 8%, transparent)'
                                                                    : 'transparent',
                                                            }}>
                                                            {sub.label}
                                                        </NavLink>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* User / Logout */}
            <div className="px-3 pb-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                    style={{
                        color: 'var(--destructive)',
                        background: 'transparent',
                        border: '1px solid transparent',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'color-mix(in oklab, var(--destructive) 12%, transparent)';
                        e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--destructive) 25%, transparent)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                    }}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            className="fixed inset-0 z-40"
                            style={{ background: 'rgba(4,18,38,0.7)', backdropFilter: 'blur(4px)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleSidebar}
                        />
                        <motion.div
                            key="drawer"
                            className="fixed left-0 top-0 bottom-0 z-50 overflow-hidden"
                            style={{ width: drawerWidth }}
                            initial={{ x: -drawerWidth }}
                            animate={{ x: 0 }}
                            exit={{ x: -drawerWidth }}
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    return (
        <>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="desktop-sidebar"
                        className="relative flex-shrink-0 h-screen sticky top-0"
                        style={{ width: drawerWidth }}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: drawerWidth, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 30 }}>
                        <div className="h-full overflow-hidden" style={{ width: drawerWidth }}>
                            <SidebarContent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edge toggle */}
            <button
                onClick={toggleSidebar}
                className="fixed top-1/2 z-50 flex items-center justify-center transition-all duration-300 shadow-glow"
                style={{
                    left: isOpen ? drawerWidth - 12 : 0,
                    transform: 'translateY(-50%)',
                    width: 28,
                    height: 52,
                    borderRadius: '0 10px 10px 0',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)',
                    color: 'var(--primary-foreground)',
                }}>
                {isOpen
                    ? <ChevronLeft size={16} />
                    : <ChevronRight size={16} />}
            </button>
        </>
    );
};

export default Sidebar;
