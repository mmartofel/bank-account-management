import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Container,
    Typography,
    useTheme,
} from '@mui/material';
import logo from '../assets/pko-bp-logo.svg';

export const Header: React.FC = () => {
    const location = useLocation();
    const theme = useTheme();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const buttonStyle = {
        mx: 1,
        '&.active': {
            color: theme.palette.secondary.main,
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
    };

    return (
        <AppBar position="sticky" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box 
                        component={RouterLink} 
                        to="/"
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            textDecoration: 'none',
                            flexGrow: 1,
                            maxWidth: '400px'
                        }}
                    >
                        <Box
                            component="img"
                            src={logo}
                            alt="PKO BP Bank Polski Logo"
                            sx={{
                                height: 40,
                                width: 'auto',
                                maxWidth: '100%'
                            }}
                        />
                    </Box>

                    <Box 
                        sx={{ 
                            display: 'flex',
                            ml: 2
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={{
                                ...buttonStyle,
                                ...(isActive('/') && { className: 'active' }),
                            }}
                        >
                            Search Users
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/accounts"
                            sx={{
                                ...buttonStyle,
                                ...(isActive('/accounts') && { className: 'active' }),
                            }}
                        >
                            All Accounts
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
