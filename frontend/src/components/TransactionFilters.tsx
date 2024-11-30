import React from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid
} from '@mui/material';
import { TransactionType, TransactionStatus, TransactionFilters as Filters } from '../types/transaction';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface TransactionFiltersProps {
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
    onReset: () => void;
}

const categories = [
    'INCOME',
    'HOUSING',
    'TRANSPORTATION',
    'FOOD',
    'UTILITIES',
    'INSURANCE',
    'HEALTHCARE',
    'SAVINGS',
    'PERSONAL',
    'ENTERTAINMENT',
    'OTHER'
];

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
    filters,
    onFilterChange,
    onReset
}) => {
    const handleChange = (field: keyof Filters, value: any) => {
        onFilterChange({
            ...filters,
            [field]: value
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                                value={filters.type || ''}
                                label="Transaction Type"
                                onChange={(e) => handleChange('type', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {Object.values(TransactionType).map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type.replace(/_/g, ' ')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status || ''}
                                label="Status"
                                onChange={(e) => handleChange('status', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {Object.values(TransactionStatus).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={filters.category || ''}
                                label="Category"
                                onChange={(e) => handleChange('category', e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DatePicker
                            label="Start Date"
                            value={filters.startDate ? new Date(filters.startDate) : null}
                            onChange={(date) =>
                                handleChange(
                                    'startDate',
                                    date ? date.toISOString() : null
                                )
                            }
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DatePicker
                            label="End Date"
                            value={filters.endDate ? new Date(filters.endDate) : null}
                            onChange={(date) =>
                                handleChange(
                                    'endDate',
                                    date ? date.toISOString() : null
                                )
                            }
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onReset}
                            fullWidth
                        >
                            Reset Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};
