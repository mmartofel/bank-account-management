import axios from 'axios';
import { BankAccount } from '../types/BankAccount';
import { User, UserSearchResult } from '../types/User';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API_BASE_URL is currently set to:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User endpoints
export const searchUsers = async (query: string): Promise<UserSearchResult> => {
    // Since there's no direct search endpoint, we'll get all users and filter client-side
    const response = await api.get<User[]>('/users');
    const filteredUsers = response.data.filter(user => 
        user.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
    );
    return {
        users: filteredUsers,
        total: filteredUsers.length
    };
};

export const getUserById = async (userId: number): Promise<User> => {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
};

export const getUserAccounts = async (userId: number): Promise<BankAccount[]> => {
    const response = await api.get<BankAccount[]>(`/users/${userId}/accounts`);
    return response.data;
};

export const bankAccountApi = {
    getAll: () => api.get<BankAccount[]>('/accounts'),
    getById: (id: number) => api.get<BankAccount>(`/accounts/${id}`),
    getByUserId: (userId: number) => api.get<BankAccount[]>(`/accounts/user/${userId}`),
    create: (account: Omit<BankAccount, 'id'>, userId: number) => 
        api.post<BankAccount>(`/accounts?userId=${userId}`, account),
    update: (id: number, account: Partial<BankAccount>) => 
        api.put<BankAccount>(`/accounts/${id}`, account),
    updateStatus: (id: number, status: BankAccount['status']) => 
        api.put<BankAccount>(`/accounts/${id}/status?status=${status}`, {}),
    delete: (id: number) => api.delete(`/accounts/${id}`),
    search: (params: {
        accountNumber?: string;
        accountType?: string;
        status?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (params.accountNumber) queryParams.append('accountNumber', params.accountNumber);
        if (params.accountType) queryParams.append('accountType', params.accountType);
        if (params.status) queryParams.append('status', params.status);
        return api.get<BankAccount[]>(`/accounts/search?${queryParams.toString()}`);
    },
};
