import { useState, useCallback } from 'react';
import { User, UserSearchResult } from '../types/User';
import { searchUsers, getUserById, getUserAccounts } from '../services/api';
import { BankAccount } from '../types/BankAccount';

export const useUserSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<UserSearchResult | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userAccounts, setUserAccounts] = useState<BankAccount[]>([]);

    const handleSearch = useCallback(async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const results = await searchUsers(query);
            setSearchResults(results);
        } catch (err) {
            setError('Failed to search users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadUserDetails = useCallback(async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const [user, accounts] = await Promise.all([
                getUserById(userId),
                getUserAccounts(userId)
            ]);
            setSelectedUser(user);
            setUserAccounts(accounts);
        } catch (err) {
            setError('Failed to load user details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        searchResults,
        selectedUser,
        userAccounts,
        handleSearch,
        loadUserDetails
    };
};
