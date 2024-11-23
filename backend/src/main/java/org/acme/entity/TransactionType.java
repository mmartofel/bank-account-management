package org.acme.entity;

public enum TransactionType {
    DEPOSIT,              // Money added to account
    WITHDRAWAL,           // Money taken from account
    TRANSFER,            // Money moved between accounts
    PAYMENT,             // Bill payment or purchase
    REFUND,              // Money returned to account
    FEE,                 // Bank fees
    INTEREST_CREDIT,     // Interest earned
    DIRECT_DEPOSIT,      // Salary or regular deposits
    WIRE_TRANSFER,       // Wire transfer
    ATM_WITHDRAWAL,      // ATM cash withdrawal
    CHECK_DEPOSIT,       // Check deposit
    REVERSAL             // Transaction reversal
}
