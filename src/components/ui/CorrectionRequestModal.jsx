import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import Button from './Button';
import { X } from 'lucide-react';

const ALLOWED_FIELDS = [
    { id: 'shopName', label: 'Shop Name' },
    { id: 'ownerName', label: 'Owner Name' },
    { id: 'CustomerType', label: 'Customer Type' },
    { id: 'orderMode', label: 'Order Mode' },
    { id: 'mobileNo1', label: 'Mobile No 1' },
    { id: 'mobileNo2', label: 'Mobile No 2' },
    { id: 'landlineNo', label: 'Landline No' },
    { id: 'emailId', label: 'Email ID' },
    { id: 'businessEmail', label: 'Business Email' },
    { id: 'address', label: 'Address' },
    { id: 'IsGSTRegistered', label: 'GST Registration Status' },
    { id: 'GSTNumber', label: 'GST Number' },
    { id: 'gstType', label: 'GST Type' },
    { id: 'GSTCertificateImg', label: 'GST Certificate Image' },
    { id: 'PANCard', label: 'PAN Card Number' },
    { id: 'AadharCard', label: 'Aadhar Card Number' },
    { id: 'PANCardImg', label: 'PAN Card Image' },
    { id: 'AadharCardImg', label: 'Aadhar Card Image' },
    { id: 'zone', label: 'Region/Zone' },
    { id: 'specificLab', label: 'Specific Lab' },
    { id: 'plant', label: 'Plant' },
    { id: 'fittingCenter', label: 'Fitting Center' },
    { id: 'creditDays', label: 'Credit Days' },
    { id: 'creditLimit', label: 'Credit Limit' },
    { id: 'courierName', label: 'Courier Name' },
    { id: 'courierTime', label: 'Courier Time' },
    { id: 'brandCategories', label: 'Brand Categories' },
    { id: 'salesPerson', label: 'Sales Person' },
];

const CorrectionRequestModal = ({ isOpen, onClose, onSubmit, customerName, loading, initialFields = [], showTargetRole = false }) => {
    const [selectedFields, setSelectedFields] = useState(initialFields);
    const [remark, setRemark] = useState('');
    const [targetRole, setTargetRole] = useState('Sales');

    useState(() => {
        if (isOpen && initialFields.length > 0) setSelectedFields(initialFields);
    }, [isOpen, initialFields]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!remark.trim()) { alert('Please provide a remark'); return; }
        onSubmit({ fieldsToCorrect: initialFields, remark, targetRole });
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
             style={{ background: 'rgba(4,18,38,0.75)' }}>
            <div
                className="w-full max-w-2xl rounded-3xl flex flex-col max-h-[90vh] overflow-hidden"
                style={{
                    background: 'rgba(8,18,36,0.97)',
                    backdropFilter: 'blur(28px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                }}
                onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b"
                     style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-tight"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                            Send for Correction
                        </h2>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                            Reviewing: <span style={{ color: 'var(--primary-glow)', fontWeight: 600 }}>{customerName}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full transition-colors"
                            style={{ color: 'var(--muted-foreground)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    {initialFields.length > 0 && (
                        <div className="mb-6 p-4 rounded-2xl"
                             style={{
                                 background: 'color-mix(in oklab, var(--warning) 8%, transparent)',
                                 border: '1px solid color-mix(in oklab, var(--warning) 20%, transparent)',
                             }}>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                                style={{ color: 'var(--warning)' }}>
                                Fields Marked for Correction
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {initialFields.map(fieldId => {
                                    const field = ALLOWED_FIELDS.find(f => f.id === fieldId);
                                    let label = field ? field.label : fieldId;
                                    if (!field) {
                                        label = fieldId.replace(/RefId$/, '').replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase());
                                        const parts = fieldId.split(/[.[\]]+/).filter(Boolean);
                                        if (parts[0] === 'address' && !isNaN(parts[1]) && parts[2])
                                            label = `Address ${+parts[1]+1} – ${parts[2].replace(/([A-Z])/g,' $1').trim()}`;
                                        else if (parts[0] === 'brandCategories' && !isNaN(parts[1]) && parts[2])
                                            label = `Brand ${+parts[1]+1} – ${parts[2].replace(/([A-Z])/g,' $1').trim()}`;
                                    }
                                    return (
                                        <span key={fieldId}
                                              className="px-3 py-1 text-xs font-semibold rounded-lg"
                                              style={{
                                                  background: 'color-mix(in oklab, var(--warning) 12%, transparent)',
                                                  border: '1px solid color-mix(in oklab, var(--warning) 30%, transparent)',
                                                  color: 'var(--warning)',
                                              }}>
                                            {label}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-[0.18em]"
                               style={{ color: 'var(--muted-foreground)' }}>
                            Detailed Remark
                        </label>
                        <textarea
                            value={remark}
                            onChange={e => setRemark(e.target.value)}
                            placeholder="Explain what needs to be corrected and why…"
                            rows={5}
                            className="w-full p-4 rounded-xl text-sm font-medium resize-none custom-scrollbar"
                            style={{
                                background: 'color-mix(in oklab, var(--foreground) 5%, transparent)',
                                border: '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)',
                                color: 'var(--foreground)',
                                outline: 'none',
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = 'color-mix(in oklab, var(--primary-glow) 60%, transparent)';
                                e.target.style.boxShadow = '0 0 0 3px color-mix(in oklab, var(--primary-glow) 10%, transparent)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'color-mix(in oklab, var(--foreground) 12%, transparent)';
                                e.target.style.boxShadow = '';
                            }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 flex gap-3 border-t"
                     style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(4,12,24,0.4)' }}>
                    <Button variant="outlined" onClick={onClose} disabled={loading} className="flex-1">
                        Cancel
                    </Button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !remark.trim()}
                        className="flex-1 py-3 px-6 font-semibold rounded-xl text-white transition-all focus:outline-none flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)', color: 'var(--primary-foreground)' }}>
                        {loading && <Icon icon="mdi:loading" className="animate-spin text-xl" />}
                        Send Request
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CorrectionRequestModal;
