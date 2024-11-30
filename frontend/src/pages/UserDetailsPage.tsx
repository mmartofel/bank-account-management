import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Box,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserSearch } from '../hooks/useUserSearch';
import { AccountCard } from '../components/AccountCard';

export const UserDetailsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const { loading, error, selectedUser, userAccounts, loadUserDetails } = useUserSearch();

    useEffect(() => {
        if (userId) {
            loadUserDetails(parseInt(userId, 10));
        }
    }, [userId, loadUserDetails]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!selectedUser) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="info">User not found</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <IconButton
                    onClick={() => navigate('/')}
                    sx={{ mr: 2 }}
                    aria-label="back"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    User Details
                </Typography>
            </Box>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Typography>
                            <strong>Name:</strong> {selectedUser.firstName} {selectedUser.middleName ? `${selectedUser.middleName} ` : ''}{selectedUser.lastName}
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> {selectedUser.email}
                        </Typography>
                        {selectedUser.phoneNumber && (
                            <Typography>
                                <strong>Phone:</strong> {selectedUser.phoneNumber}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Address
                        </Typography>
                        <Typography>
                            {selectedUser.streetAddress}
                        </Typography>
                        <Typography>
                            {selectedUser.city}, {selectedUser.state} {selectedUser.zipCode}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" sx={{ mb: 3 }}>
                Bank Accounts ({userAccounts.length})
            </Typography>

            <Grid container spacing={3}>
                {userAccounts.map((account) => (
                    <Grid item xs={12} md={6} lg={4} key={account.id}>
                        <AccountCard account={account} />
                    </Grid>
                ))}
                {userAccounts.length === 0 && (
                    <Grid item xs={12}>
                        <Alert severity="info">No bank accounts found for this user</Alert>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};
