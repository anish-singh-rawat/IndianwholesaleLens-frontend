import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Badge } from '@mui/material';
import { Menu, Bell, Settings } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
    const user = useSelector((state) => state.auth.user);
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <div className="w-full rounded-2xl glass-strong px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative overflow-hidden shadow-glow">
            {/* Shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 animate-shimmer rounded-2xl" />

            {/* Left: menu + user info */}
            <div className="flex items-center gap-3 flex-1 min-w-0 relative z-10">
                {isMobile && (
                    <button
                        onClick={onMenuClick}
                        className="flex items-center justify-center h-9 w-9 rounded-xl transition-colors"
                        style={{ background: 'color-mix(in oklab, var(--primary-glow) 10%, transparent)' }}>
                        <Menu size={18} style={{ color: 'var(--primary-glow)' }} />
                    </button>
                )}

                {/* Avatar */}
                <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center"
                     style={{
                         background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)',
                         boxShadow: '0 0 0 2px color-mix(in oklab, var(--primary-glow) 30%, transparent)',
                     }}>
                    <Icon icon="lucide:user" style={{ fontSize: '20px', color: 'var(--primary-foreground)' }} />
                </div>

                {/* Name + role */}
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-0.5"
                       style={{ color: 'var(--muted-foreground)' }}>
                        Account
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm md:text-base font-semibold truncate"
                              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                            {user?.employeeName || 'Team Member'}
                        </span>
                        {!isMobile && user?.Department?.name && (
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
                                  style={{
                                      background: 'color-mix(in oklab, var(--primary-glow) 12%, transparent)',
                                      border: '1px solid color-mix(in oklab, var(--primary-glow) 25%, transparent)',
                                      color: 'var(--primary-glow)',
                                  }}>
                                {user.Department.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 relative z-10">
                <button className="flex items-center justify-center h-9 w-9 rounded-xl relative transition-colors"
                        style={{ background: 'color-mix(in oklab, var(--foreground) 6%, transparent)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--primary-glow) 10%, transparent)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--foreground) 6%, transparent)'}>
                    <Bell size={18} style={{ color: 'var(--muted-foreground)' }} />
                    {/* Notification dot */}
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
                          style={{ background: 'var(--warning)' }}>
                        <span className="absolute inset-0 rounded-full animate-ping"
                              style={{ background: 'var(--warning)', opacity: 0.5 }} />
                    </span>
                </button>

                <button className="flex items-center justify-center h-9 w-9 rounded-xl transition-colors"
                        style={{ background: 'color-mix(in oklab, var(--foreground) 6%, transparent)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--primary-glow) 10%, transparent)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--foreground) 6%, transparent)'}>
                    <Settings size={18} style={{ color: 'var(--muted-foreground)' }} />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
