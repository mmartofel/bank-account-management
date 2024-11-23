export interface User {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth?: string;
    socialSecurityNumber?: string;
    email: string;
    phoneNumber?: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    bankAccounts?: number[];
}

export interface UserSearchResult {
    users: User[];
    total: number;
}
