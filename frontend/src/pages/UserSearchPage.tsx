import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Autocomplete,
    TextField,
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useUserSearch } from '../hooks/useUserSearch';
import { User } from '../types/User';

export const UserSearchPage: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, error, searchResults, handleSearch } = useUserSearch();

    const debouncedSearch = useMemo(
        () => debounce(async (query: string) => {
            if (query.length >= 2) { // Only search if 2 or more characters
                handleSearch(query);
            }
        }, 300), // 300ms delay
        [handleSearch]
    );

    const handleInputChange = (_event: React.SyntheticEvent, value: string) => {
        setInputValue(value);
        debouncedSearch(value);
    };

    const handleUserSelect = (_event: React.SyntheticEvent, user: User | null) => {
        setSelectedUser(user);
        if (user) {
            navigate(`/users/${user.id}`);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Find Bank Account User
            </Typography>
            
            <Paper sx={{ p: 3, mb: 4 }}>
                <Autocomplete
                    id="user-search"
                    options={searchResults?.users || []}
                    getOptionLabel={(option) => option.email}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <div>
                                <Typography variant="body1">
                                    {option.firstName} {option.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {option.email}
                                </Typography>
                            </div>
                        </li>
                    )}
                    loading={loading}
                    onInputChange={handleInputChange}
                    onChange={handleUserSelect}
                    inputValue={inputValue}
                    value={selectedUser}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search by email"
                            placeholder="Start typing an email address..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading && <CircularProgress color="inherit" size={20} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    noOptionsText={inputValue.length < 2 
                        ? "Type at least 2 characters to search" 
                        : "No users found"}
                    filterOptions={(x) => x} // Disable client-side filtering
                />
                
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};
