import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { AccountBalance, Edit, Delete } from '@mui/icons-material';
import { BankAccount } from '../types/BankAccount';

interface AccountCardProps {
    account: BankAccount;
    onEdit?: (account: BankAccount) => void;
    onDelete?: (account: BankAccount) => void;
}

const statusColors = {
    ACTIVE: 'success',
    INACTIVE: 'warning',
    CLOSED: 'error',
} as const;

const accountTypeLabels = {
    CHECKING: 'Checking',
    SAVINGS: 'Savings',
    MONEY_MARKET: 'Money Market',
    CERTIFICATE_OF_DEPOSIT: 'Certificate of Deposit',
} as const;

export const AccountCard: React.FC<AccountCardProps> = ({ 
    account,
    onEdit,
    onDelete,
}) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: account.currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccountBalance />
                        <Box>
                            <Typography variant="h6">
                                Account {account.accountNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {accountTypeLabels[account.accountType]}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Chip 
                            label={account.status}
                            color={statusColors[account.status]}
                            size="small"
                            sx={{ mr: 1 }}
                        />
                        {onEdit && (
                            <IconButton size="small" onClick={() => onEdit(account)}>
                                <Edit />
                            </IconButton>
                        )}
                        {onDelete && (
                            <IconButton size="small" onClick={() => onDelete(account)}>
                                <Delete />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Routing Number: {account.routingNumber}
                    </Typography>
                    <Typography variant="h6" color="primary" mt={1}>
                        Balance: {formatCurrency(account.balance)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Interest Rate: {(account.interestRate * 100).toFixed(2)}%
                    </Typography>
                    {account.openedDate && (
                        <Typography variant="body2" color="text.secondary">
                            Opened: {formatDate(account.openedDate)}
                        </Typography>
                    )}
                    {account.lastActivityDate && (
                        <Typography variant="body2" color="text.secondary">
                            Last Activity: {formatDate(account.lastActivityDate)}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};
