export enum TransactionType {
    DIRECT_DEPOSIT = 'DIRECT_DEPOSIT',
    PAYMENT = 'PAYMENT',
    TRANSFER = 'TRANSFER',
    ATM_WITHDRAWAL = 'ATM_WITHDRAWAL',
    DEPOSIT = 'DEPOSIT',
    WIRE_TRANSFER = 'WIRE_TRANSFER',
    REFUND = 'REFUND',
    INTEREST_CREDIT = 'INTEREST_CREDIT',
    FEE = 'FEE',
    REVERSAL = 'REVERSAL'
}

export enum TransactionStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    SCHEDULED = 'SCHEDULED'
}

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    currency: string;
    sourceAccountId: number;
    destinationAccountId?: number;
    transactionDate?: string;
    processingDate?: string;
    status: TransactionStatus;
    description: string;
    referenceNumber: string;
    category: string;
    balanceAfterTransaction: number;
}

export interface TransactionFilters {
    accountId?: number;
    type?: TransactionType;
    status?: TransactionStatus;
    startDate?: string | null;
    endDate?: string | null;
    minAmount?: number;
    maxAmount?: number;
    category?: string;
    description?: string;
    page?: number;
    size?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    pageSize: number;
    pageNumber: number;
}
