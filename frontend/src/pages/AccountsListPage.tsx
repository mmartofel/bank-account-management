import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    InputAdornment,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { AccountCard } from '../components/AccountCard';
import { useBankAccounts } from '../hooks/useBankAccounts';
import { BankAccount } from '../types/BankAccount';

export const AccountsListPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { accounts, loading, error } = useBankAccounts();

    const filteredAccounts = accounts.filter(account => 
        account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (account: BankAccount) => {
        // TODO: Implement edit functionality
        console.log('Edit account:', account);
    };

    const handleDelete = (account: BankAccount) => {
        // TODO: Implement delete functionality
        console.log('Delete account:', account);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Bank Accounts
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {filteredAccounts.length === 0 ? (
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    No accounts found
                </Typography>
            ) : (
                filteredAccounts.map(account => (
                    <AccountCard
                        key={account.id}
                        account={account}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </Container>
    );
};
