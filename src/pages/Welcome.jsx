import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import { Box, Typography, Button, Fade, CircularProgress, Stack } from '@mui/material';

const Welcome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [message] = useState(() => {
        if (location.state?.from === 'register') return 'User Registered Successfully!';
        if (location.state?.from === 'customer-register') return 'Registration Complete!';
        if (location.state?.from === 'login') return 'Login Successful!';
        return 'Welcome Back!';
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const redirectPath = location.state?.from === 'register'
                ? PATHS.STAFF.LIST
                : location.state?.from === 'customer-register'
                    ? PATHS.CUSTOMER.LIST
                    : PATHS.ROOT;
            navigate(redirectPath);
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate, location]);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
            {/* Glow */}
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'color-mix(in oklab, var(--primary-glow) 10%, transparent)', filter: 'blur(120px)', pointerEvents: 'none' }} />

            <Fade in timeout={800}>
                <Box sx={{
                    p: { xs: 6, md: 10 }, borderRadius: '3rem', width: '100%', maxWidth: 640, textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', zIndex: 10,
                    background: 'color-mix(in oklab, var(--card) 75%, transparent)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                }}>
                    <Box><img src={logo} alt="Indian Lens Wholesale" style={{ height: '120px', objectFit: 'contain' }} /></Box>

                    <Box>
                        <Typography variant="h3" fontWeight={800} gutterBottom
                            sx={{ letterSpacing: '-1px', color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>
                            {message}
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                            Wishing You A{' '}
                            <Box component="span" sx={{ color: 'var(--primary-glow)', fontWeight: 800 }}>Great</Box> Day!
                        </Typography>
                    </Box>

                    <Stack spacing={2} alignItems="center">
                        <CircularProgress size={36} thickness={4} sx={{ color: 'var(--primary-glow)' }} />
                        <Typography variant="caption" sx={{ color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Loading...
                        </Typography>
                    </Stack>

                    {location.state?.from === 'customer-register' && (
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Button variant="contained" onClick={() => navigate(PATHS.CUSTOMER.LIST)}
                                sx={{ bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--primary-glow)' }, borderRadius: '50px', px: 4, py: 1.5, fontWeight: 700 }}>
                                View Customer List
                            </Button>
                            <Button variant="outlined" onClick={() => navigate(PATHS.ROOT)}
                                sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--foreground)', borderRadius: '50px', px: 4, py: 1.5, fontWeight: 700 }}>
                                Go to Home
                            </Button>
                        </Box>
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default Welcome;
