package org.acme.dto;

import org.acme.entity.Transaction;
import org.acme.entity.TransactionStatus;
import org.acme.entity.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {
    public Long id;
    public TransactionType type;
    public BigDecimal amount;
    public String currency;
    public Long sourceAccountId;
    public Long destinationAccountId;
    public LocalDateTime transactionDate;
    public LocalDateTime processingDate;
    public TransactionStatus status;
    public String description;
    public String referenceNumber;
    public String category;
    public BigDecimal balanceAfterTransaction;

    public static TransactionDTO from(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.id = transaction.id;
        dto.type = transaction.getType();
        dto.amount = transaction.getAmount();
        dto.currency = transaction.getCurrency();
        dto.sourceAccountId = transaction.getSourceAccount().id;
        dto.destinationAccountId = transaction.getDestinationAccount() != null ? 
            transaction.getDestinationAccount().id : null;
        dto.transactionDate = transaction.getTransactionDate();
        dto.processingDate = transaction.getProcessingDate();
        dto.status = transaction.getStatus();
        dto.description = transaction.getDescription();
        dto.referenceNumber = transaction.getReferenceNumber();
        dto.category = transaction.getCategory();
        dto.balanceAfterTransaction = transaction.getBalanceAfterTransaction();
        return dto;
    }
}
