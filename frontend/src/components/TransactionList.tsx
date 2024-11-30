import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    Chip,
    Skeleton,
    Alert,
    Box,
    Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Transaction, TransactionFilters, TransactionType } from '../types/transaction';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionDetailsDialog } from './TransactionDetailsDialog';
import { format } from 'date-fns';

interface TransactionListProps {
    filters: TransactionFilters;
}

export const TransactionList: React.FC<TransactionListProps> = ({ filters }) => {
    const { transactions, loading, error, totalCount, fetchTransactions } = useTransactions();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    useEffect(() => {
        console.log('Fetching transactions with filters:', { ...filters, page, size: rowsPerPage });
        try {
            fetchTransactions({
                ...filters,
                page,
                size: rowsPerPage
            });
        } catch (err) {
            console.error('Error fetching transactions:', err);
        }
    }, [fetchTransactions, filters, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        console.log('Changing page size to:', newSize);
        setRowsPerPage(newSize);
        setPage(0);
    };

    const handleOpenDetails = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setDialogOpen(true);
    };

    const getTransactionColor = (type: TransactionType) => {
        switch (type) {
            case TransactionType.PAYMENT:
            case TransactionType.ATM_WITHDRAWAL:
            case TransactionType.FEE:
                return 'error';
            case TransactionType.DIRECT_DEPOSIT:
            case TransactionType.DEPOSIT:
            case TransactionType.INTEREST_CREDIT:
                return 'success';
            default:
                return 'primary';
        }
    };

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                </TableRow>
                            ))
                        ) : transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {transaction.transactionDate
                                            ? format(new Date(transaction.transactionDate), 'yyyy-MM-dd HH:mm')
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={transaction.type} 
                                            color={getTransactionColor(transaction.type)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: transaction.currency
                                        }).format(transaction.amount)}
                                    </TableCell>
                                    <TableCell>{transaction.category}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenDetails(transaction)} size="small">
                                            <InfoIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No transactions found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                labelDisplayedRows={({ from, to, count }) => 
                    `${from}-${to} of ${count !== -1 ? count : 'more than ' + to}`}
            />

            <TransactionDetailsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                transaction={selectedTransaction}
            />
        </Box>
    );
};
