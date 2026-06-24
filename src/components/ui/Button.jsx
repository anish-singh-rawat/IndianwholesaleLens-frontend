import React from 'react';
import { Button as MuiButton, useTheme, alpha } from '@mui/material';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', sx = {}, ...props }) => {
    const theme = useTheme();
    const accentColor = theme.palette.accent.main;

    const getVariantProps = () => {
        switch (variant) {
            case 'outlined':
                return {
                    variant: 'outlined',
                    sx: {
                        color: accentColor,
                        borderColor: accentColor,
                        '&:hover': {
                            borderColor: theme.palette.accent.dark,
                            bgcolor: alpha(accentColor, 0.05),
                        },
                        ...sx
                    }
                };
            case 'ghost':
                return {
                    variant: 'text',
                    sx: {
                        color: accentColor,
                        '&:hover': {
                            bgcolor: alpha(accentColor, 0.05),
                        },
                        ...sx
                    }
                };
            default: // primary
                return {
                    variant: 'contained',
                    sx: {
                        bgcolor: accentColor,
                        color: 'white',
                        '&:hover': {
                            bgcolor: theme.palette.accent.dark,
                            boxShadow: `0 8px 24px ${alpha(accentColor, 0.4)}`,
                        },
                        boxShadow: `0 4px 16px ${alpha(accentColor, 0.3)}`,
                        ...sx
                    }
                };
        }
    };

    const variantProps = getVariantProps();

    return (
        <MuiButton
            type={type}
            onClick={onClick}
            fullWidth={className.includes('w-full')}
            className={className}
            {...variantProps}
            sx={{
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 800,
                px: 4,
                py: 1.2,
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                ...variantProps.sx
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;


