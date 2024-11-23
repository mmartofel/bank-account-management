import { useState, useCallback } from 'react';
import { Transaction, TransactionFilters, PaginatedResponse } from '../types/transaction';
import { transactionService } from '../services/transactionService';

interface UseTransactionsReturn {
    transactions: Transaction[];
    loading: boolean;
    error: Error | null;
    totalCount: number;
    fetchTransactions: (filters: TransactionFilters) => Promise<void>;
    fetchTransactionById: (id: number) => Promise<Transaction>;
}

export const useTransactions = (): UseTransactionsReturn => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    const fetchTransactions = useCallback(async (filters: TransactionFilters) => {
        if (!filters) {
            console.warn('No filters provided to fetchTransactions');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            console.log('Fetching transactions with filters:', filters);
            const response = await transactionService.getTransactions(filters);
            
            if (response && response.data) {
                setTransactions(response.data);
                setTotalCount(response.totalCount);
            } else {
                setTransactions([]);
                setTotalCount(0);
                console.warn('Received empty response from server');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(error instanceof Error ? error : new Error('Failed to fetch transactions'));
            setTransactions([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTransactionById = useCallback(async (id: number): Promise<Transaction> => {
        setLoading(true);
        setError(null);
        try {
            const transaction = await transactionService.getTransactionById(id);
            return transaction;
        } catch (error) {
            console.error('Error fetching transaction by ID:', error);
            const err = error instanceof Error ? error : new Error('Failed to fetch transaction');
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        transactions,
        loading,
        error,
        totalCount,
        fetchTransactions,
        fetchTransactionById
    };
};
