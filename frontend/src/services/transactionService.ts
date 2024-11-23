import axios from 'axios';
import { Transaction, TransactionFilters, PaginatedResponse } from '../types/transaction';

const API_URL = 'http://localhost:8080/api';

export const transactionService = {
    getTransactions: async (filters: TransactionFilters): Promise<PaginatedResponse<Transaction>> => {
        const params = new URLSearchParams();
        
        if (filters.accountId) params.append('accountId', filters.accountId.toString());
        if (filters.type) params.append('type', filters.type);
        if (filters.status) params.append('status', filters.status);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.category) params.append('category', filters.category);
        if (filters.page !== undefined) params.append('page', filters.page.toString());
        if (filters.size !== undefined) params.append('size', filters.size.toString());

        const response = await axios.get(`${API_URL}/transactions`, { params });
        
        return {
            data: response.data,
            totalCount: parseInt(response.headers['x-total-count'] || '0'),
            pageSize: parseInt(response.headers['x-page-size'] || '20'),
            pageNumber: parseInt(response.headers['x-page-number'] || '0')
        };
    },

    getTransactionById: async (id: number): Promise<Transaction> => {
        const response = await axios.get(`${API_URL}/transactions/${id}`);
        return response.data;
    },

    getAccountTransactions: async (
        accountId: number,
        page: number = 0,
        size: number = 20
    ): Promise<PaginatedResponse<Transaction>> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString()
        });

        const response = await axios.get(
            `${API_URL}/transactions/account/${accountId}`,
            { params }
        );

        return {
            data: response.data,
            totalCount: parseInt(response.headers['x-total-count'] || '0'),
            pageSize: parseInt(response.headers['x-page-size'] || '20'),
            pageNumber: parseInt(response.headers['x-page-number'] || '0')
        };
    }
};
