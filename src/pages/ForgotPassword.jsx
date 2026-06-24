import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import logo from '../assets/logo.png';
import loginImage from '../assets/login-image.png';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { employeeForgotPassword, customerForgotPassword } from '../services/authService';
import { PATHS } from '../routes/paths';

const panelStyle = {
    background: 'color-mix(in oklab, var(--card) 80%, transparent)',
    backdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
};

const ForgotPassword = ({ type = 'employee' }) => {
    const [submitted, setSubmitted] = useState(false);
    const isCustomer = type === 'customer';

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({ email: Yup.string().email('Enter a valid email').required('Email is required') }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const fn = isCustomer ? customerForgotPassword : employeeForgotPassword;
                const res = await fn(values.email);
                if (res?.success === false) {
                    toast.error(res?.error?.code === 'USER_NOT_FOUND' ? 'No account found with that email.' : res?.error?.message);
                    return;
                }
                setSubmitted(true);
            } catch (err) {
                toast.error(err?.error?.code === 'USER_NOT_FOUND' ? 'No account found with that email.' : err?.error?.message || err?.message || 'Something went wrong.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
            <div className="rounded-3xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[500px]"
                 style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>

                {/* Left – image */}
                <div className="w-full md:w-1/2 relative min-h-[220px]">
                    <img src={loginImage} alt="Visual Lens"
                         className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    {isCustomer && (
                        <div className="absolute bottom-8 left-8 text-white z-10">
                            <h2 className="text-3xl font-bold mb-2">Customer Portal</h2>
                            <p className="text-sm opacity-80">Reset your customer account password.</p>
                        </div>
                    )}
                </div>

                {/* Right – form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center" style={panelStyle}>
                    <div className="flex justify-center mb-8">
                        <img src={logo} alt="Indian Lens Wholesale" className="h-14 object-contain" />
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                            Forgot Password
                        </h1>
                        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                            {isCustomer ? 'Enter your business email to receive a reset link.' : 'Enter your email to receive a reset link.'}
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                                 style={{ background: 'color-mix(in oklab, var(--primary-glow) 15%, transparent)', border: '1px solid color-mix(in oklab, var(--primary-glow) 30%, transparent)' }}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--primary-glow)' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Check your inbox.</p>
                            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>A reset link has been sent. Valid for 30 minutes.</p>
                            <Link to={isCustomer ? PATHS.CUSTOMER_LOGIN : PATHS.LOGIN}
                                  className="inline-block text-sm hover:underline" style={{ color: 'var(--primary-glow)' }}>
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <Input
                                label={isCustomer ? 'Business Email' : 'Email Address'}
                                name="email" type="email"
                                placeholder={isCustomer ? 'Enter your business email' : 'Enter your email address'}
                                value={formik.values.email}
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email ? { message: formik.errors.email } : null}
                            />
                            <Button type="submit" disabled={formik.isSubmitting}
                                    className="mt-4 w-full max-w-[220px] mx-auto flex items-center justify-center gap-2">
                                {formik.isSubmitting ? (<><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending...</>) : 'Send Reset Link'}
                            </Button>
                            <div className="text-center">
                                <Link to={isCustomer ? PATHS.CUSTOMER_LOGIN : PATHS.LOGIN}
                                      className="text-sm hover:underline" style={{ color: 'var(--primary-glow)' }}>
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
