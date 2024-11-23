import axios from 'axios';
import { BankAccount } from '../types/BankAccount';
import { User, UserSearchResult } from '../types/User';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User endpoints
export const searchUsers = async (query: string): Promise<UserSearchResult> => {
    const response = await api.get<User[]>(`/users/search?query=${encodeURIComponent(query)}`);
    return {
        users: response.data,
        total: response.data.length
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
    create: (account: Omit<BankAccount, 'id'>) => api.post<BankAccount>('/accounts', account),
    update: (id: number, account: Partial<BankAccount>) => api.put<BankAccount>(`/accounts/${id}`, account),
    updateStatus: (id: number, status: BankAccount['status']) => 
        api.put<BankAccount>(`/accounts/${id}/status`, { status }),
    delete: (id: number) => api.delete(`/accounts/${id}`),
    search: (query: string) => api.get<BankAccount[]>(`/accounts/search?query=${encodeURIComponent(query)}`),
};
