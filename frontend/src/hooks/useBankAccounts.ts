import { useState, useEffect } from 'react';
import { BankAccount } from '../types/BankAccount';
import { bankAccountApi } from '../services/api';

export const useBankAccounts = (userId?: number) => {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const response = userId 
                    ? await bankAccountApi.getByUserId(userId)
                    : await bankAccountApi.getAll();
                
                // Ensure response.data is an array
                const accountsData = Array.isArray(response.data) ? response.data : [];
                setAccounts(accountsData);
                setError(null);
            } catch (err) {
                console.error('Error fetching accounts:', err);
                setAccounts([]); // Reset accounts on error
                setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [userId]);

    const updateAccountStatus = async (id: number, status: BankAccount['status']) => {
        try {
            const response = await bankAccountApi.updateStatus(id, status);
            if (response.data) {
                setAccounts(prevAccounts => 
                    prevAccounts.map(account => 
                        account.id === id ? response.data : account
                    )
                );
                return response.data;
            }
            throw new Error('No data received from update');
        } catch (err) {
            console.error('Error updating account status:', err);
            throw err instanceof Error ? err : new Error('Failed to update account status');
        }
    };

    return {
        accounts,
        loading,
        error,
        updateAccountStatus,
    };
};
