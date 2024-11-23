package org.acme.entity;

public enum TransactionStatus {
    PENDING,        // Transaction initiated but not processed
    PROCESSING,     // Transaction is being processed
    COMPLETED,      // Transaction successfully completed
    FAILED,         // Transaction failed
    CANCELLED,      // Transaction cancelled by user
    REVERSED,       // Transaction was reversed
    ON_HOLD,        // Transaction is on hold (e.g., pending review)
    SCHEDULED       // Future-dated transaction
}
