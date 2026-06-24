import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { getEmployeeById, updateEmployee } from '../services/employeeService';
import { X } from 'lucide-react';

const PAGE_ACCESS_OPTIONS = [
    { value: 'DASHBOARD', label: 'Dashboard' },
    { value: 'REGISTER_CUSTOMER', label: 'Register Customer' },
    { value: 'REGISTER_STAFF', label: 'Register Staff' },
    { value: 'STAFF_LIST', label: 'Staff List' },
    { value: 'CUSTOMER_LIST', label: 'Customer List' },
    { value: 'SHIP_TO', label: 'Ship To' },
    { value: 'APPROVALS', label: 'Approvals' },
    { value: 'CORRECTIONS', label: 'Corrections' },
    { value: 'NEW_ORDER', label: 'New Order' },
    { value: 'ALL_ORDERS', label: 'All Orders' },
    { value: 'PENDING_ORDERS', label: 'Pending Orders' },
    { value: 'OTHER_SALES', label: 'Other Sales' },
    { value: 'SALES_LIST', label: 'Sales List' },
    { value: 'RETURN_REFUND', label: 'Return & Refund' },
    { value: 'EXCHANGE_REQUESTS', label: 'Exchange Requests' },
    { value: 'DRAFTS', label: 'Drafts' },
    { value: 'DAILY_REPORT', label: 'Daily Report' },
    { value: 'MAIN_REPORT', label: 'Main Report' },
    { value: 'ADD_REPAIR', label: 'Add Repair' },
    { value: 'REPAIR_LIST', label: 'Repair List' },
    { value: 'ADD_VENDOR', label: 'Add Vendor' },
    { value: 'VENDOR_LIST', label: 'Vendor List' },
    { value: 'VENDOR_ORDER', label: 'Vendor Order' },
    { value: 'QUALITY', label: 'Quality' },
    { value: 'FITTING', label: 'Fitting' },
    { value: 'SHIPPING', label: 'Shipping' },
    { value: 'INVENTORY', label: 'Inventory' },
];

const ACCESS_PERMISSION_OPTIONS = [
    { value: 'ADD_STAFF', label: 'Add Staff' },
    { value: 'UPDATE_STAFF', label: 'Update Staff' },
    { value: 'DELETE_STAFF', label: 'Delete Staff' },
    { value: 'ADD_CUSTOMER', label: 'Add Customer' },
    { value: 'UPDATE_CUSTOMER', label: 'Update Customer' },
    { value: 'DELETE_CUSTOMER', label: 'Delete Customer' },
    { value: 'ADD_ORDER', label: 'Add Order' },
    { value: 'UPDATE_ORDER', label: 'Update Order' },
    { value: 'DELETE_ORDER', label: 'Delete Order' },
    { value: 'APPROVE_ORDER', label: 'Approve Order' },
    { value: 'ADD_DRAFT', label: 'Add Draft' },
    { value: 'UPDATE_DRAFT', label: 'Update Draft' },
    { value: 'DELETE_DRAFT', label: 'Delete Draft' },
    { value: 'ADD_REPAIR', label: 'Add Repair' },
    { value: 'UPDATE_REPAIR', label: 'Update Repair' },
    { value: 'DELETE_REPAIR', label: 'Delete Repair' },
    { value: 'ADD_VENDOR', label: 'Add Vendor' },
    { value: 'UPDATE_VENDOR', label: 'Update Vendor' },
    { value: 'DELETE_VENDOR', label: 'Delete Vendor' },
    { value: 'UPDATE_QUALITY', label: 'Update Quality' },
    { value: 'UPDATE_FITTING', label: 'Update Fitting' },
    { value: 'UPDATE_SHIPPING', label: 'Update Shipping' },
    { value: 'UPDATE_INVENTORY', label: 'Update Inventory' },
    { value: 'VIEW_REPORTS', label: 'View Reports' },
    { value: 'EXPORT_REPORTS', label: 'Export Reports' },
];

const sectionStyle = {
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
};

const SectionHeader = ({ title, onToggleAll, allSelected }) => (
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--primary-glow)' }}>{title}</h3>
        <button type="button" onClick={onToggleAll}
                className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all"
                style={{
                    color: 'var(--primary-glow)',
                    border: '1px solid color-mix(in oklab, var(--primary-glow) 25%, transparent)',
                }}>
            {allSelected ? 'Deselect All' : 'Select All'}
        </button>
    </div>
);

const CheckboxGrid = ({ options, selected, onToggle }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
        {options.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex-shrink-0">
                    <input type="checkbox" className="sr-only"
                           checked={selected.includes(opt.value)} onChange={() => onToggle(opt.value)} />
                    <div className="w-4 h-4 rounded border-2 transition-all flex items-center justify-center"
                         style={{
                             background: selected.includes(opt.value)
                                 ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)'
                                 : 'transparent',
                             borderColor: selected.includes(opt.value)
                                 ? 'var(--primary-glow)'
                                 : 'rgba(255,255,255,0.25)',
                         }}>
                        {selected.includes(opt.value) && <Icon icon="mdi:check" style={{ color: 'var(--primary-foreground)', fontSize: '10px' }} />}
                    </div>
                </div>
                <span className="text-[11px] font-medium transition-colors" style={{ color: 'var(--muted-foreground)' }}>
                    {opt.label}
                </span>
            </label>
        ))}
    </div>
);

const CollapsibleSection = ({ title, badge, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={sectionStyle}>
            <button type="button" onClick={() => setOpen(o => !o)}
                    className="w-full flex items-center justify-between px-6 py-4 transition-colors"
                    style={{ color: 'var(--foreground)' }}>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--primary-glow)' }}>{title}</span>
                    {badge > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                              style={{ background: 'color-mix(in oklab, var(--primary-glow) 20%, transparent)', color: 'var(--primary-glow)' }}>
                            {badge}
                        </span>
                    )}
                </div>
                <Icon icon="mdi:chevron-down"
                      style={{ color: 'var(--muted-foreground)', fontSize: '20px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
            </button>
            {open && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
};

const EditEmployeeModal = ({ employeeId, onClose, onSaved }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [pageAccess, setPageAccess] = useState([]);
    const [accessPermissions, setAccessPermissions] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const res = await getEmployeeById(employeeId);
                const user = res?.data?.user || res?.data || res;
                setEmployee(user);
                setPageAccess(user.pageAccess || []);
                const VALID_PERMISSIONS = new Set(ACCESS_PERMISSION_OPTIONS.map(o => o.value));
                setAccessPermissions((user.accessPermissions || []).filter(p => VALID_PERMISSIONS.has(p)));
            } catch (err) {
                toast.error(err?.message || 'Failed to load employee details');
                onClose();
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [employeeId]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    const toggleArrayItem = (list, setList, value) =>
        setList(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

    const toggleAll = (options, list, setList) =>
        setList(list.length === options.length ? [] : options.map(o => o.value));

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await updateEmployee(employeeId, { pageAccess, accessPermissions });
            toast.success('Employee updated successfully');
            onSaved(response?.data?.user || response?.data || null);
            onClose();
        } catch (err) {
            toast.error(err?.error?.message || err?.message || 'Failed to update employee');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
             style={{ background: 'rgba(4,18,38,0.75)' }}
             onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl"
                 style={{
                     background: 'rgba(8,18,36,0.97)',
                     backdropFilter: 'blur(28px) saturate(180%)',
                     border: '1px solid rgba(255,255,255,0.10)',
                     boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                 }}>

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 flex-shrink-0 border-b"
                     style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                            Edit Permissions
                        </h2>
                        {employee && (
                            <p className="text-[11px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                                {employee.employeeName} · {employee.username}
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl transition-all" style={{ color: 'var(--muted-foreground)' }}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 px-8 py-6 space-y-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <div className="h-10 w-10 rounded-full border-2 border-transparent animate-spin"
                                 style={{ borderTopColor: 'var(--primary-glow)', borderRightColor: 'color-mix(in oklab, var(--primary-glow) 40%, transparent)' }} />
                        </div>
                    ) : (
                        <>
                            <CollapsibleSection title="Page Access" badge={pageAccess.length} defaultOpen>
                                <SectionHeader title="Page Access"
                                    allSelected={pageAccess.length === PAGE_ACCESS_OPTIONS.length}
                                    onToggleAll={() => toggleAll(PAGE_ACCESS_OPTIONS, pageAccess, setPageAccess)} />
                                <CheckboxGrid options={PAGE_ACCESS_OPTIONS} selected={pageAccess}
                                    onToggle={v => toggleArrayItem(pageAccess, setPageAccess, v)} />
                                {pageAccess.length > 0 && (
                                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest"
                                       style={{ color: 'var(--muted-foreground)' }}>
                                        {pageAccess.length} page{pageAccess.length !== 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </CollapsibleSection>

                            <CollapsibleSection title="Access Permissions" badge={accessPermissions.length} defaultOpen>
                                <SectionHeader title="Access Permissions"
                                    allSelected={accessPermissions.length === ACCESS_PERMISSION_OPTIONS.length}
                                    onToggleAll={() => toggleAll(ACCESS_PERMISSION_OPTIONS, accessPermissions, setAccessPermissions)} />
                                <CheckboxGrid options={ACCESS_PERMISSION_OPTIONS} selected={accessPermissions}
                                    onToggle={v => toggleArrayItem(accessPermissions, setAccessPermissions, v)} />
                                {accessPermissions.length > 0 && (
                                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest"
                                       style={{ color: 'var(--muted-foreground)' }}>
                                        {accessPermissions.length} permission{accessPermissions.length !== 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </CollapsibleSection>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-8 py-5 flex-shrink-0 border-t"
                     style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(4,12,24,0.4)' }}>
                    <button type="button" onClick={onClose} disabled={saving}
                            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50"
                            style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'var(--muted-foreground)' }}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} disabled={saving || loading}
                            className="px-8 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
                            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)', color: 'var(--primary-foreground)' }}>
                        {saving ? (<><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
