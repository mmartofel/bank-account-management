import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Chip,
    Divider,
    Box
} from '@mui/material';
import { Transaction } from '../types/transaction';
import { format } from 'date-fns';

interface TransactionDetailsDialogProps {
    transaction: Transaction | null;
    open: boolean;
    onClose: () => void;
}

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

export const TransactionDetailsDialog: React.FC<TransactionDetailsDialogProps> = ({
    transaction,
    open,
    onClose
}) => {
    if (!transaction) return null;

    const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Grid container spacing={2} sx={{ py: 1 }}>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1">{value}</Typography>
            </Grid>
        </Grid>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Transaction Details
                <Typography variant="subtitle2" color="text.secondary">
                    Reference: {transaction.referenceNumber}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ py: 2 }}>
                    <DetailRow
                        label="Amount"
                        value={
                            <Typography
                                variant="h6"
                                color={transaction.amount < 0 ? 'error' : 'success.main'}
                            >
                                {formatCurrency(transaction.amount, transaction.currency)}
                            </Typography>
                        }
                    />
                    <Divider sx={{ my: 2 }} />
                    <DetailRow
                        label="Type"
                        value={
                            <Chip
                                label={transaction.type}
                                size="small"
                                variant="outlined"
                            />
                        }
                    />
                    <DetailRow label="Category" value={transaction.category} />
                    <DetailRow
                        label="Status"
                        value={
                            <Chip
                                label={transaction.status}
                                size="small"
                                color={
                                    transaction.status === 'COMPLETED'
                                        ? 'success'
                                        : transaction.status === 'PENDING'
                                        ? 'warning'
                                        : transaction.status === 'FAILED'
                                        ? 'error'
                                        : 'default'
                                }
                            />
                        }
                    />
                    <Divider sx={{ my: 2 }} />
                    <DetailRow
                        label="Transaction Date"
                        value={format(new Date(transaction.transactionDate), 'PPP')}
                    />
                    <DetailRow
                        label="Processing Date"
                        value={format(new Date(transaction.processingDate), 'PPP')}
                    />
                    <Divider sx={{ my: 2 }} />
                    <DetailRow label="Description" value={transaction.description} />
                    <DetailRow
                        label="Balance After"
                        value={formatCurrency(
                            transaction.balanceAfterTransaction,
                            transaction.currency
                        )}
                    />
                    <DetailRow label="Source Account" value={transaction.sourceAccountId} />
                    {transaction.destinationAccountId && (
                        <DetailRow
                            label="Destination Account"
                            value={transaction.destinationAccountId}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
