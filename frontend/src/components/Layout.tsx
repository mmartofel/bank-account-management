import React from 'react';
import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const drawerWidth = 240;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { text: 'User Search', path: '/', icon: <PersonSearchIcon /> },
        { text: 'Accounts', path: '/accounts', icon: <AccountBalanceIcon /> },
        { text: 'Transactions', path: '/transactions', icon: <ReceiptLongIcon /> }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Bank Account Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
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
                                        backgroundColor: 'action.selected'
                                    }
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
