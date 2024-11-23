import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { TransactionList } from '../components/TransactionList';
import { TransactionFilters } from '../components/TransactionFilters';
import { TransactionFilters as Filters } from '../types/transaction';

const defaultFilters: Filters = {
    page: 0,
    size: 20,
    type: undefined,
    status: undefined,
    category: undefined,
    startDate: null,
    endDate: null,
    minAmount: undefined,
    maxAmount: undefined,
    description: undefined,
    accountId: undefined
};

export const TransactionsPage: React.FC = () => {
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    const handleFilterChange = (newFilters: Filters) => {
        console.log('Filters changed:', newFilters);
        setFilters({
            ...defaultFilters,  // Reset to default pagination
            ...newFilters,      // Apply new filters
            page: 0             // Reset page when filters change
        });
    };

    const handleResetFilters = () => {
        console.log('Resetting filters to default');
        setFilters(defaultFilters);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Transactions
                </Typography>

                <Paper sx={{ mb: 3, p: 2 }}>
                    <TransactionFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onReset={handleResetFilters}
                    />
                </Paper>

                <TransactionList filters={filters} />
            </Box>
        </Container>
    );
};
