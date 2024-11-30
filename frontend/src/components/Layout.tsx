import React from 'react';
import {
    Box,
    Container,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Footer } from './Footer';
import { Header } from './Header';

const drawerWidth = 240;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { text: 'User Search', path: '/', icon: <PersonSearchIcon /> },
        { text: 'Accounts', path: '/accounts', icon: <AccountBalanceIcon /> },
        { text: 'Transactions', path: '/transactions', icon: <ReceiptLongIcon /> },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Header />
            
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        top: '64px',
                        height: 'calc(100% - 64px)'
                    },
                }}
            >
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `${drawerWidth}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ flexGrow: 1, mb: 4 }}>
                    {children}
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};
