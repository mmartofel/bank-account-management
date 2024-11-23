import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { TransactionList } from '../components/TransactionList';
import { TransactionFilters } from '../components/TransactionFilters';
import { TransactionFilters as Filters } from '../types/transaction';

const defaultFilters: Filters = {
    page: 0,
    size: 20
};

export const TransactionsPage: React.FC = () => {
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    const handleFilterChange = (newFilters: Filters) => {
        setFilters({
            ...newFilters,
            page: 0 // Reset page when filters change
        });
    };

    const handleResetFilters = () => {
        setFilters(defaultFilters);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Transactions
                </Typography>

                <Paper sx={{ mb: 3 }}>
                    <TransactionFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onReset={handleResetFilters}
                    />
                </Paper>

                <TransactionList accountId={filters.accountId} />
            </Box>
        </Container>
    );
};
