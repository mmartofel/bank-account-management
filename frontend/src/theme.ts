import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0C1C5C', // APEX Bank dark blue
            light: '#1E3A8A',
            dark: '#091444',
        },
        secondary: {
            main: '#E31837', // APEX Bank red
            light: '#FF1F41',
            dark: '#C41430',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A1A1A',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#0C1C5C',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
            color: '#0C1C5C',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            color: '#0C1C5C',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#0C1C5C',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            color: '#0C1C5C',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            color: '#0C1C5C',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#0C1C5C',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    padding: '8px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                },
                contained: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                containedPrimary: {
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#1E3A8A',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#0C1C5C',
                        },
                    },
                },
            },
        },
    },
});
