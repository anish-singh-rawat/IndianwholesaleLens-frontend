import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5EADD4',
      light: '#67E8F9',
      dark: '#0F766E',
      contrastText: '#0A1628',
    },
    secondary: {
      main: '#334155',
      light: '#475569',
      dark: '#1E293B',
      contrastText: '#F8FAFC',
    },
    accent: {
      main: '#67E8F9',
      light: '#A5F3FC',
      dark: '#0E7490',
      contrastText: '#0A1628',
    },
    erp: {
      primary: '#5EADD4',
      secondary: '#67E8F9',
      accent: '#5EADD4',
      dark: '#041226',
      danger: '#F87171',
    },
    warning: {
      main: '#FBBF24',
      contrastText: '#1C1917',
    },
    error: {
      main: '#F87171',
    },
    success: {
      main: '#34D399',
    },
    background: {
      default: '#0D1B2E',
      paper: '#0A1628',
    },
    text: {
      primary: '#E2EAF4',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Inter", "ui-sans-serif", "system-ui", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0' },
    body1: { fontFamily: '"Inter", sans-serif' },
    body2: { fontFamily: '"Inter", sans-serif' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { transform: 'translateY(-1px)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #5EADD4 0%, #67E8F9 100%)',
          boxShadow: '0 0 0 1px rgba(94,173,212,0.3), 0 20px 60px -20px rgba(94,173,212,0.5)',
          color: '#0A1628',
          '&:hover': {
            background: 'linear-gradient(135deg, #67E8F9 0%, #A5F3FC 100%)',
            boxShadow: '0 30px 80px -30px rgba(103,232,249,0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 22, 40, 0.75)',
          backdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 0 1px rgba(94,173,212,0.08), 0 20px 60px -20px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.05)',
          color: '#E2EAF4',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.12)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EADD4',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(94,173,212,0.4)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: '#94A3B8', '&.Mui-focused': { color: '#67E8F9' } },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 22, 40, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(255,255,255,0.06)', color: '#E2EAF4' },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(10,22,40,0.6)',
          color: '#67E8F9',
          fontFamily: '"Space Grotesk", sans-serif',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 22, 40, 0.95)',
          backdropFilter: 'blur(28px) saturate(180%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 10, transition: 'all 0.2s ease' },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(255,255,255,0.06)' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(10, 22, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;
