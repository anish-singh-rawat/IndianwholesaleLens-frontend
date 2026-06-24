import React, { forwardRef } from 'react';
import { TextField, InputAdornment, Box, alpha, useTheme } from '@mui/material';

const Input = forwardRef(({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    icon, 
    error, 
    containerClassName = "", 
    variant = "default", 
    isVerificationMode = false, 
    isRejected = false, 
    onToggleRejection, 
    name, 
    ...props 
}, ref) => {
    const theme = useTheme();
    const isOrange = variant === "orange";
    const accentColor = theme.palette.accent.main;

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1.5 }} className={containerClassName}>
            {isVerificationMode && (
                <Box
                    onClick={() => onToggleRejection?.(name)}
                    sx={{
                        width: 20,
                        height: 20,
                        minWidth: 20,
                        borderRadius: '6px',
                        border: '2px solid',
                        borderColor: isRejected ? 'error.main' : 'divider',
                        bgcolor: isRejected ? 'error.main' : 'background.paper',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        '&:hover': {
                            borderColor: isRejected ? 'error.dark' : 'accent.main',
                        }
                    }}
                >
                    {isRejected && <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }} />}
                </Box>
            )}
            <TextField
                inputRef={ref}
                fullWidth
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                error={!!error || isRejected}
                helperText={error ? error.message : null}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: icon ? (
                        <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                            {icon}
                        </InputAdornment>
                    ) : null,
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        bgcolor: isOrange ? alpha(accentColor, 0.1) : alpha(theme.palette.primary.main, 0.02),
                        '& fieldset': {
                            borderColor: isOrange ? accentColor : alpha(theme.palette.primary.main, 0.1),
                        },
                        '&:hover fieldset': {
                            borderColor: accentColor,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transform: 'translate(14px, -9px) scale(0.75)', // Fix for shrink label positioning with custom padding
                    }
                }}
                {...props}
            />
        </Box>
    );
});

Input.displayName = 'Input';

export default Input;


