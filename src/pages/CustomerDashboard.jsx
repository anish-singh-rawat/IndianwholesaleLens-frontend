import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';
import { Icon } from '@iconify/react';

const cardStyle = {
    background: 'color-mix(in oklab, var(--card) 75%, transparent)',
    backdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
    borderRadius: '2rem',
};

const rowBorder = { borderBottom: '1px solid rgba(255,255,255,0.06)' };

const CustomerDashboard = () => {
    const user = useSelector(selectCurrentUser);

    const stats = [
        { label: 'Active Orders', value: 0, icon: 'mdi:package-variant-closed', accent: 'var(--primary-glow)' },
        { label: 'Credit Limit', value: `₹${user?.creditLimit?.toLocaleString() || '0'}`, icon: 'mdi:finance', accent: 'var(--warning)' },
        { label: 'Credit Used', value: `₹${user?.creditUsed?.toLocaleString() || '0'}`, icon: 'mdi:account-cash', accent: 'var(--muted-foreground)' },
    ];

    return (
        <div className="space-y-6">
            {/* Banner */}
            <div className="rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--primary-glow) 70%, var(--primary)) 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -50%)' }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10" style={{ background: 'black', transform: 'translate(-40%, 50%)' }} />
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-foreground)' }}>
                        Welcome back, {user?.shopName || user?.ownerName || 'Valued Partner'}! 👋
                    </h1>
                    <p className="text-sm opacity-80" style={{ color: 'var(--primary-foreground)' }}>
                        Manage your orders, view account details, and track your recent activity.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((s, i) => (
                    <div key={i} className="p-6 flex items-center gap-5 transition-shadow hover:shadow-elegant" style={cardStyle}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                             style={{ background: `color-mix(in oklab, ${s.accent} 12%, transparent)`, border: `1px solid color-mix(in oklab, ${s.accent} 20%, transparent)` }}>
                            <Icon icon={s.icon} style={{ fontSize: '28px', color: s.accent }} />
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)' }}>
                                {s.label}
                            </p>
                            <p className="text-2xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                                {s.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Account Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="p-7" style={cardStyle}>
                    <h3 className="text-base font-semibold mb-5 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                        <Icon icon="mdi:card-account-details-outline" style={{ color: 'var(--primary-glow)', fontSize: '22px' }} />
                        Account Details
                    </h3>
                    <div className="space-y-0">
                        {[
                            { label: 'Customer Code', val: user?.customerCode, pill: true },
                            { label: 'Business Email', val: user?.businessEmail },
                            { label: 'Contact Phone',  val: user?.mobileNo1 },
                            { label: 'Zone / Region',  val: user?.zone?.name, accent: true },
                        ].map(({ label, val, pill, accent }) => (
                            <div key={label} className="flex justify-between items-center py-3" style={rowBorder}>
                                <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                                {pill ? (
                                    <span className="text-sm font-bold px-3 py-1 rounded-lg"
                                          style={{ background: 'color-mix(in oklab, var(--foreground) 6%, transparent)', color: 'var(--foreground)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        {val || '---'}
                                    </span>
                                ) : accent ? (
                                    <span className="text-sm font-semibold px-3 py-1 rounded-lg"
                                          style={{ background: 'color-mix(in oklab, var(--primary-glow) 10%, transparent)', color: 'var(--primary-glow)', border: '1px solid color-mix(in oklab, var(--primary-glow) 20%, transparent)' }}>
                                        {val || '---'}
                                    </span>
                                ) : (
                                    <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{val || '---'}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-7" style={cardStyle}>
                    <h3 className="text-base font-semibold mb-5 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                        <Icon icon="mdi:map-marker-radius-outline" style={{ color: 'var(--primary-glow)', fontSize: '22px' }} />
                        Primary Billing Address
                    </h3>
                    {user?.billToAddress ? (
                        <div className="p-5 rounded-2xl"
                             style={{ background: 'color-mix(in oklab, var(--primary-glow) 6%, transparent)', border: '1px solid color-mix(in oklab, var(--primary-glow) 14%, transparent)' }}>
                            <p className="font-bold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{user.billToAddress.branchName || user.firmName}</p>
                            <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--muted-foreground)' }}>{user.billToAddress.address}</p>
                            <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{user.billToAddress.city}, {user.billToAddress.state}</p>
                            <p className="text-xs font-semibold uppercase tracking-widest mt-2" style={{ color: 'var(--muted-foreground)' }}>{user.billToAddress.country} - {user.billToAddress.zipCode}</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-8 rounded-2xl"
                             style={{ background: 'color-mix(in oklab, var(--foreground) 4%, transparent)', border: '1px dashed rgba(255,255,255,0.12)' }}>
                            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
                                No address found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
