import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser, setCredentials } from '../../store/slices/authSlice';
import { Icon } from '@iconify/react';
import logo from '../../assets/logo.png';
import { acceptTermsConditions } from '../../services/customerService';
import { toast } from 'react-toastify';
import GoBackButton from '../navigation/GoBackButton';
import {
    Box, AppBar, Toolbar, Typography, Button, Container, Chip,
    Dialog, DialogTitle, DialogContent, DialogActions, Stack, alpha, useTheme, Fade
} from '@mui/material';

const surfaceStyle = {
    background: 'rgba(8,18,36,0.97)',
    backdropFilter: 'blur(28px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.08)',
};

const CustomerLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const token = useSelector(state => state.auth.token);
    const theme = useTheme();

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [termsAccepting, setTermsAccepting] = useState(false);

    useEffect(() => {
        if (user && !user?.termsAndConditionsAccepted) setShowTermsModal(true);
    }, [user]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/customer-login', { replace: true });
    };

    const handleAcceptTerms = async () => {
        setTermsAccepting(true);
        try {
            const res = await acceptTermsConditions();
            if (res?.success) {
                toast.success('Terms & Conditions accepted successfully');
                dispatch(setCredentials({ user: { ...user, termsAndConditionsAccepted: true }, token }));
                setShowTermsModal(false);
            } else {
                toast.error(res?.message || 'Failed to accept terms');
            }
        } catch (err) {
            toast.error(err?.message || err?.error?.message || 'Something went wrong');
        } finally {
            setTermsAccepting(false);
        }
    };

    const handleDeclineTerms = () => {
        toast.info('You must accept the Terms & Conditions to continue.');
        handleLogout();
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'var(--background)', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <AppBar position="sticky" elevation={0}
                sx={{
                    background: 'rgba(8,18,36,0.85)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ py: 1.5, justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{
                                p: 1, borderRadius: '14px', display: 'flex',
                                background: 'color-mix(in oklab, var(--primary) 15%, transparent)',
                                border: '1px solid color-mix(in oklab, var(--primary-glow) 20%, transparent)',
                            }}>
                                <img src={logo} alt="Indian Lens Wholesale" style={{ height: '30px' }} />
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Typography variant="caption" sx={{ color: 'var(--primary-glow)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'block' }}>
                                    Customer Portal
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: 'var(--foreground)', fontWeight: 700, lineHeight: 1.2 }}>
                                    {user?.shopName || user?.ownerName || 'Welcome'}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Chip label={user?.customerCode || 'GUEST'} size="small"
                                sx={{ bgcolor: 'color-mix(in oklab, var(--primary-glow) 15%, transparent)', color: 'var(--primary-glow)', fontWeight: 700, borderRadius: '8px' }} />
                            <Button variant="outlined" color="error" onClick={handleLogout}
                                startIcon={<Icon icon="mdi:logout" />}
                                sx={{ borderRadius: '50px', borderWidth: '1.5px', px: 3, '&:hover': { borderWidth: '1.5px' } }}>
                                Logout
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Content */}
            <Box component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>
                <Container maxWidth="xl">
                    <Fade in timeout={600}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ p: 1.5, borderRadius: '16px', ...surfaceStyle }}>
                                <GoBackButton />
                            </Box>
                            <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: '24px', minHeight: '60vh', ...surfaceStyle }}>
                                <Outlet />
                            </Box>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* Terms Dialog */}
            <Dialog open={showTermsModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography variant="h5" fontWeight={800} sx={{ color: 'var(--primary-glow)' }}>
                        Terms & Conditions
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                        Please review and accept to continue
                    </Typography>
                </DialogTitle>
                <DialogContent dividers sx={{ border: 'none', px: 4 }}>
                    <Typography variant="body2" component="div" sx={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'var(--foreground)' }}>
                                Indian Lens Wholesale Customer Agreement
                            </Typography>
                            By accessing and using the Indian Lens Wholesale Customer Portal, you agree to be bound by the following terms.
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={700} sx={{ color: 'var(--foreground)' }}>1. Account Responsibility</Typography>
                            You are responsible for maintaining the confidentiality of your account credentials.
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={700} sx={{ color: 'var(--foreground)' }}>2. Order & Payment Terms</Typography>
                            All orders placed through the portal are subject to acceptance and availability.
                        </Box>
                        <Box sx={{ p: 2, borderRadius: '12px', mt: 2, background: 'color-mix(in oklab, var(--primary-glow) 5%, transparent)', border: '1px solid color-mix(in oklab, var(--primary-glow) 15%, transparent)', fontStyle: 'italic' }}>
                            Full terms and conditions apply as per company policy.
                        </Box>
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                    <Button onClick={handleDeclineTerms} sx={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                        Decline &amp; Logout
                    </Button>
                    <Button onClick={handleAcceptTerms} variant="contained" disabled={termsAccepting}
                        sx={{ bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--primary-glow)' }, px: 5, borderRadius: '50px', fontWeight: 700 }}>
                        {termsAccepting ? 'Accepting...' : 'I Accept'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomerLayout;
