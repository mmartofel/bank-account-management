package org.acme.service;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityNotFoundException;
import org.acme.entity.Transaction;
import org.acme.entity.TransactionStatus;
import org.acme.entity.TransactionType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class TransactionService {

    public List<Transaction> findTransactions(
            Long accountId,
            TransactionType type,
            TransactionStatus status,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String category,
            int page,
            int size
    ) {
        StringBuilder query = new StringBuilder("1=1");
        Map<String, Object> params = new java.util.HashMap<>();

        if (accountId != null) {
            query.append(" and (sourceAccount.id = :accountId or destinationAccount.id = :accountId)");
            params.put("accountId", accountId);
        }

        if (type != null) {
            query.append(" and type = :type");
            params.put("type", type);
        }

        if (status != null) {
            query.append(" and status = :status");
            params.put("status", status);
        }

        if (startDate != null) {
            query.append(" and transactionDate >= :startDate");
            params.put("startDate", startDate);
        }

        if (endDate != null) {
            query.append(" and transactionDate <= :endDate");
            params.put("endDate", endDate);
        }

        if (category != null) {
            query.append(" and category = :category");
            params.put("category", category);
        }

        return Transaction.<Transaction>find(query.toString(), Sort.by("transactionDate").descending(), params)
                .page(Page.of(page, size))
                .list();
    }

    public Transaction findTransactionById(Long id) {
        Transaction transaction = Transaction.findById(id);
        if (transaction == null) {
            throw new EntityNotFoundException("Transaction not found with id: " + id);
        }
        return transaction;
    }

    public long countTransactions(
            Long accountId,
            TransactionType type,
            TransactionStatus status,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String category
    ) {
        StringBuilder query = new StringBuilder("1=1");
        Map<String, Object> params = new java.util.HashMap<>();

        if (accountId != null) {
            query.append(" and (sourceAccount.id = :accountId or destinationAccount.id = :accountId)");
            params.put("accountId", accountId);
        }

        if (type != null) {
            query.append(" and type = :type");
            params.put("type", type);
        }

        if (status != null) {
            query.append(" and status = :status");
            params.put("status", status);
        }

        if (startDate != null) {
            query.append(" and transactionDate >= :startDate");
            params.put("startDate", startDate);
        }

        if (endDate != null) {
            query.append(" and transactionDate <= :endDate");
            params.put("endDate", endDate);
        }

        if (category != null) {
            query.append(" and category = :category");
            params.put("category", category);
        }

        return Transaction.count(query.toString(), params);
    }
}
