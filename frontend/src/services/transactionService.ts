import axios from 'axios';
import { Transaction, TransactionFilters, PaginatedResponse } from '../types/transaction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API_BASE_URL is currently set to:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const transactionService = {
    async getTransactions(filters: TransactionFilters): Promise<PaginatedResponse<Transaction>> {
        // Convert filters to query parameters
        const params = new URLSearchParams();
        
        if (typeof filters.page === 'number') params.append('page', filters.page.toString());
        if (typeof filters.size === 'number') params.append('size', filters.size.toString());
        if (filters.type) params.append('type', filters.type);
        if (filters.status) params.append('status', filters.status);
        if (filters.category) params.append('category', filters.category);
        if (filters.description) params.append('description', filters.description);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (typeof filters.minAmount === 'number') params.append('minAmount', filters.minAmount.toString());
        if (typeof filters.maxAmount === 'number') params.append('maxAmount', filters.maxAmount.toString());
        if (typeof filters.accountId === 'number') params.append('accountId', filters.accountId.toString());

        try {
            console.log('Fetching transactions with params:', Object.fromEntries(params));
            const response = await api.get<Transaction[]>('/transactions', { params });
            
            // Extract pagination information from headers
            const totalCount = parseInt(response.headers['x-total-count'] || '0');
            const pageSize = parseInt(response.headers['x-page-size'] || '20');
            const pageNumber = parseInt(response.headers['x-page-number'] || '0');

            console.log('Pagination info:', { totalCount, pageSize, pageNumber });
            console.log('Received transactions:', response.data.length);

            return {
                data: response.data,
                totalCount,
                pageSize,
                pageNumber
            };
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },

    async getTransactionById(id: number): Promise<Transaction> {
        try {
            const response = await api.get<Transaction>(`/transactions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching transaction by ID:', error);
            throw error;
        }
    },

    async getAccountTransactions(accountId: number, page: number = 0, size: number = 20): Promise<PaginatedResponse<Transaction>> {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString()
        });

        try {
            const response = await api.get(
                `/transactions/account/${accountId}`,
                { params }
            );

            return {
                data: response.data,
                totalCount: parseInt(response.headers['x-total-count'] || '0'),
                pageSize: parseInt(response.headers['x-page-size'] || '20'),
                pageNumber: parseInt(response.headers['x-page-number'] || '0')
            };
        } catch (error) {
            console.error('Error fetching account transactions:', error);
            throw error;
        }
    }
};
