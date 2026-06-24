import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

import { loginUser } from '../services/authService';
import { setCredentials } from '../store/slices/authSlice';
import { PATHS } from '../routes/paths';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import loginImage from '../assets/login-image.png';
import mascot from '../assets/login-mascot.gif';
import logo from '../assets/logo.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        loginId:  Yup.string().required('Email or Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: { loginId: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginUser({ loginId: values.loginId, password: values.password });
                if (response.success) {
                    dispatch(setCredentials({
                        user: response.data.user,
                        token: response.data.tokens.accessToken,
                        refreshToken: response.data.tokens.refreshToken
                    }));
                    toast.success('Login Successful');
                    navigate(PATHS.WELCOME, { state: { from: 'login' } });
                } else {
                    toast.error(response.message || 'Login failed');
                }
            } catch (err) {
                toast.error(err.message || 'An error occurred during login');
            }
        },
    });

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
             style={{ background: 'var(--background)' }}>

            {/* Background orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full blur-[160px] animate-pulse-glow"
                     style={{ background: 'color-mix(in oklab, var(--primary-glow) 16%, transparent)' }} />
                <div className="absolute bottom-[-20%] left-[-10%] h-[440px] w-[440px] rounded-full blur-[140px] animate-float-slow"
                     style={{ background: 'color-mix(in oklab, var(--primary) 14%, transparent)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[200px]"
                     style={{ background: 'color-mix(in oklab, var(--accent) 6%, transparent)' }} />
            </div>

            {/* Grid backdrop */}
            <div className="pointer-events-none absolute inset-0 grid-bg -z-10 opacity-50" />

            {/* Card */}
            <motion.div
                className="relative w-full max-w-4xl mx-4 rounded-3xl overflow-hidden glass-strong shadow-glow"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}>

                <div className="flex flex-col md:flex-row min-h-[600px]">

                    {/* ── Left pane (image) ── */}
                    <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-end overflow-hidden"
                         style={{
                             background: 'linear-gradient(160deg, color-mix(in oklab, var(--primary) 18%, transparent), color-mix(in oklab, var(--primary-glow) 10%, transparent))',
                             borderRight: '1px solid color-mix(in oklab, var(--primary-glow) 12%, transparent)',
                         }}>

                        {/* Image */}
                        <div className="absolute inset-0 flex items-start justify-center pt-6 px-6">
                            <img src={loginImage} alt="" className="w-full max-w-xs object-contain opacity-90" />
                        </div>

                        {/* Speech bubble */}
                        <motion.div
                            className="absolute bottom-28 left-8 rounded-2xl px-5 py-3 glass-strong"
                            style={{ borderRadius: '20px 20px 20px 4px' }}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}>
                            <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-glow)' }}>
                                Hello! 👋
                            </p>
                        </motion.div>

                        {/* Mascot */}
                        <img
                            src={mascot}
                            alt="mascot"
                            className="relative z-10 w-32 mb-0 object-contain"
                            style={{ transform: 'translateX(-40px)' }}
                        />

                        {/* Eyebrow label */}
                        <div className="absolute top-6 left-6">
                            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                                  style={{
                                      background: 'color-mix(in oklab, var(--card) 60%, transparent)',
                                      borderColor: 'color-mix(in oklab, var(--primary-glow) 40%, transparent)',
                                      color: 'var(--primary-glow)',
                                  }}>
                                <span className="relative inline-flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                                </span>
                                Wholesale Portal
                            </span>
                        </div>
                    </div>

                    {/* ── Right pane (form) ── */}
                    <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-12">

                        {/* Logo */}
                        <motion.div
                            className="mb-8 flex justify-center md:justify-start"
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.45 }}>
                            <img src={logo} alt="DigiOptics" className="h-28 object-contain" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.5 }}>

                            <h1 className="text-2xl font-bold mb-1"
                                style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                                Welcome back
                            </h1>
                            <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
                                Sign in to your account to continue
                            </p>

                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                                <Input
                                    label="Email or Username"
                                    name="loginId"
                                    value={formik.values.loginId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.loginId && formik.errors.loginId
                                        ? { message: formik.errors.loginId } : null}
                                />

                                <Input
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && formik.errors.password
                                        ? { message: formik.errors.password } : null}
                                    icon={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            style={{ color: 'var(--muted-foreground)', lineHeight: 0 }}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />

                                <div className="flex justify-end -mt-2">
                                    <Link to="/forgot-password"
                                          className="text-xs font-semibold transition-colors"
                                          style={{ color: 'var(--primary-glow)' }}>
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Signing in…' : 'Sign In'}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
