import { useState, useCallback } from 'react';
import { Transaction, TransactionFilters, PaginatedResponse } from '../types/transaction';
import { transactionService } from '../services/transactionService';

interface UseTransactionsReturn {
    transactions: Transaction[];
    loading: boolean;
    error: Error | null;
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    fetchTransactions: (filters: TransactionFilters) => Promise<void>;
    fetchTransactionById: (id: number) => Promise<Transaction>;
    fetchAccountTransactions: (accountId: number, page?: number, size?: number) => Promise<void>;
}

export const useTransactions = (): UseTransactionsReturn => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pageNumber, setPageNumber] = useState(0);

    const fetchTransactions = useCallback(async (filters: TransactionFilters) => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionService.getTransactions(filters);
            setTransactions(response.data);
            setTotalCount(response.totalCount);
            setPageSize(response.pageSize);
            setPageNumber(response.pageNumber);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTransactionById = useCallback(async (id: number): Promise<Transaction> => {
        setLoading(true);
        setError(null);
        try {
            return await transactionService.getTransactionById(id);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to fetch transaction');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAccountTransactions = useCallback(async (
        accountId: number,
        page: number = 0,
        size: number = 20
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionService.getAccountTransactions(accountId, page, size);
            setTransactions(response.data);
            setTotalCount(response.totalCount);
            setPageSize(response.pageSize);
            setPageNumber(response.pageNumber);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch account transactions'));
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        transactions,
        loading,
        error,
        totalCount,
        pageSize,
        pageNumber,
        fetchTransactions,
        fetchTransactionById,
        fetchAccountTransactions
    };
};
