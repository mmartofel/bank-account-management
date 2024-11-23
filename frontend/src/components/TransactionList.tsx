import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Box,
    Chip,
    IconButton,
    Tooltip,
    Skeleton
} from '@mui/material';
import { Transaction, TransactionStatus, TransactionType } from '../types/transaction';
import { useTransactions } from '../hooks/useTransactions';
import { format } from 'date-fns';
import InfoIcon from '@mui/icons-material/Info';
import { TransactionDetailsDialog } from './TransactionDetailsDialog';

interface TransactionListProps {
    accountId?: number;
}

const statusColors: Record<TransactionStatus, 'success' | 'warning' | 'error' | 'default'> = {
    [TransactionStatus.COMPLETED]: 'success',
    [TransactionStatus.PENDING]: 'warning',
    [TransactionStatus.FAILED]: 'error',
    [TransactionStatus.SCHEDULED]: 'default'
};

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

const LoadingRow = () => (
    <TableRow>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" width={100} /></TableCell>
        <TableCell><Skeleton animation="wave" width={80} /></TableCell>
        <TableCell align="right"><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" width={100} /></TableCell>
        <TableCell align="right"><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" width={40} /></TableCell>
    </TableRow>
);

export const TransactionList: React.FC<TransactionListProps> = ({ accountId }) => {
    const {
        transactions,
        loading,
        error,
        totalCount,
        pageSize,
        pageNumber,
        fetchTransactions,
        fetchTransactionById,
        fetchAccountTransactions
    } = useTransactions();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (accountId) {
            fetchAccountTransactions(accountId, page, rowsPerPage);
        } else {
            fetchTransactions({
                page,
                size: rowsPerPage
            });
        }
    }, [accountId, page, rowsPerPage, fetchTransactions, fetchAccountTransactions]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetails = async (id: number) => {
        try {
            const transaction = await fetchTransactionById(id);
            setSelectedTransaction(transaction);
            setDialogOpen(true);
        } catch (error) {
            console.error('Failed to fetch transaction details:', error);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTransaction(null);
    };

    if (error) {
        return (
            <Typography color="error" variant="body1">
                Error loading transactions: {error.message}
            </Typography>
        );
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Balance</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: rowsPerPage }).map((_, index) => (
                                    <LoadingRow key={index} />
                                ))
                            ) : transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No transactions found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id} hover>
                                        <TableCell>
                                            {format(new Date(transaction.transactionDate), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={transaction.type}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>{transaction.category}</TableCell>
                                        <TableCell align="right">
                                            {formatCurrency(transaction.amount, transaction.currency)}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={transaction.status}
                                                size="small"
                                                color={statusColors[transaction.status]}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatCurrency(
                                                transaction.balanceAfterTransaction,
                                                transaction.currency
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="View Details">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleViewDetails(transaction.id)}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <TransactionDetailsDialog
                transaction={selectedTransaction}
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </>
    );
};
