export type AccountType = 'CHECKING' | 'SAVINGS' | 'MONEY_MARKET' | 'CERTIFICATE_OF_DEPOSIT';
export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

export interface BankAccount {
    id: number;
    accountNumber: string;
    routingNumber: string;
    accountType: AccountType;
    balance: number;
    currency: string;
    interestRate: number;
    status: AccountStatus;
    userId: number;
    openedDate?: string;
    lastActivityDate?: string;
}
