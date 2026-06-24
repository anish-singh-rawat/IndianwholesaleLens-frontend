import { useState, useEffect } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import logo from '../assets/logo.png';
import loginImage from '../assets/login-image.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { employeeResetPassword, customerResetPassword } from '../services/authService';
import { PATHS } from '../routes/paths';

const panelStyle = {
    background: 'color-mix(in oklab, var(--card) 80%, transparent)',
    backdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.10)',
};

const iconBox = (color) => ({
    width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
    background: `color-mix(in oklab, ${color} 12%, transparent)`,
    border: `1px solid color-mix(in oklab, ${color} 28%, transparent)`,
});

const ResetPasswordConfirm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const uidb36 = searchParams.get('uidb36');
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pageState, setPageState] = useState('form');
    const isCustomer = type === 'customer';
    const forgotPasswordPath = isCustomer ? PATHS.CUSTOMER_FORGOT_PASSWORD : PATHS.FORGOT_PASSWORD;
    const loginPath = isCustomer ? PATHS.CUSTOMER_LOGIN : PATHS.LOGIN;

    useEffect(() => {
        if (!uidb36 || !token || !type) navigate(PATHS.FORGOT_PASSWORD, { replace: true });
    }, [uidb36, token, type, navigate]);

    const formik = useFormik({
        initialValues: { password: '', confirmPassword: '' },
        validationSchema: Yup.object({
            password: Yup.string().min(8, 'Min 8 characters').required('New password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const fn = isCustomer ? customerResetPassword : employeeResetPassword;
                const res = await fn({ uidb36, token, password: values.password, confirmPassword: values.confirmPassword });
                if (res.success) { setPageState('success'); setTimeout(() => navigate(loginPath), 2500); }
                else handleErrorCode(res.error?.code, res.error?.message);
            } catch (err) {
                handleErrorCode(err?.error?.code, err?.error?.message || err?.message || 'Something went wrong.');
            } finally { setSubmitting(false); }
        },
    });

    const handleErrorCode = (code, message) => {
        if (code === 'TOKEN_EXPIRED') setPageState('expired');
        else if (code === 'INVALID_TOKEN') setPageState('invalid');
        else toast.error(message || 'Something went wrong.');
    };

    const renderContent = () => {
        if (pageState === 'success') return (
            <div className="text-center space-y-4">
                <div style={iconBox('var(--success)')}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--success)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Password reset successfully.</p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Redirecting you to login...</p>
                <Link to={loginPath} className="inline-block text-sm hover:underline" style={{ color: 'var(--primary-glow)' }}>Go to Login now</Link>
            </div>
        );
        if (pageState === 'expired') return (
            <div className="text-center space-y-4">
                <div style={iconBox('var(--warning)')}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--warning)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="font-semibold" style={{ color: 'var(--foreground)' }}>This link has expired.</p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Reset links are valid for 30 minutes only.</p>
                <Button onClick={() => navigate(forgotPasswordPath)} className="mx-auto">Request New Link</Button>
            </div>
        );
        if (pageState === 'invalid') return (
            <div className="text-center space-y-4">
                <div style={iconBox('var(--destructive)')}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--destructive)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Invalid or already-used link.</p>
                <Button onClick={() => navigate(forgotPasswordPath)} className="mx-auto">Request New Link</Button>
            </div>
        );
        return (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <Input label="New Password" name="password" type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password" value={formik.values.password}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? { message: formik.errors.password } : null}
                    icon={<Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
                        style={{ color: 'var(--muted-foreground)', width: '20px', height: '20px', cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)} />}
                />
                <Input label="Confirm New Password" name="confirmPassword" type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password" value={formik.values.confirmPassword}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword ? { message: formik.errors.confirmPassword } : null}
                    icon={<Icon icon={showConfirm ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
                        style={{ color: 'var(--muted-foreground)', width: '20px', height: '20px', cursor: 'pointer' }}
                        onClick={() => setShowConfirm(!showConfirm)} />}
                />
                <Button type="submit" disabled={formik.isSubmitting}
                        className="mt-4 w-full max-w-[220px] mx-auto flex items-center justify-center gap-2">
                    {formik.isSubmitting ? (<><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Resetting...</>) : 'Reset Password'}
                </Button>
                <div className="text-center">
                    <Link to={loginPath} className="text-sm hover:underline" style={{ color: 'var(--primary-glow)' }}>Back to Login</Link>
                </div>
            </form>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
            <div className="rounded-3xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[500px]"
                 style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-full md:w-1/2 relative min-h-[220px]">
                    <img src={loginImage} alt="Visual Lens" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center" style={panelStyle}>
                    <div className="flex justify-center mb-8">
                        <img src={logo} alt="Indian Lens Wholesale" className="h-16 object-contain" />
                    </div>
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>Reset Password</h1>
                        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Enter your new password below.</p>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordConfirm;
