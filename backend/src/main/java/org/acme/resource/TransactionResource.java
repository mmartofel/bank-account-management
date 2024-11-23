package org.acme.resource;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.TransactionDTO;
import org.acme.entity.TransactionStatus;
import org.acme.entity.TransactionType;
import org.acme.service.TransactionService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Path("/api/transactions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class TransactionResource {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @Inject
    TransactionService transactionService;

    @GET
    public Response getTransactions(
            @QueryParam("accountId") Long accountId,
            @QueryParam("type") TransactionType type,
            @QueryParam("status") TransactionStatus status,
            @QueryParam("startDate") String startDateStr,
            @QueryParam("endDate") String endDateStr,
            @QueryParam("category") String category,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size
    ) {
        LocalDateTime startDate = startDateStr != null ? LocalDateTime.parse(startDateStr, DATE_FORMATTER) : null;
        LocalDateTime endDate = endDateStr != null ? LocalDateTime.parse(endDateStr, DATE_FORMATTER) : null;

        List<TransactionDTO> transactions = transactionService.findTransactions(
                accountId, type, status, startDate, endDate, category, page, size
        ).stream().map(TransactionDTO::from).collect(Collectors.toList());

        long totalCount = transactionService.countTransactions(
                accountId, type, status, startDate, endDate, category
        );

        return Response.ok(transactions)
                .header("Access-Control-Expose-Headers", "X-Total-Count, X-Page-Size, X-Page-Number")
                .header("X-Total-Count", totalCount)
                .header("X-Page-Size", size)
                .header("X-Page-Number", page)
                .build();
    }

    @GET
    @Path("/{id}")
    public Response getTransactionById(@PathParam("id") Long id) {
        return Response.ok(TransactionDTO.from(transactionService.findTransactionById(id))).build();
    }

    @GET
    @Path("/account/{accountId}")
    public Response getAccountTransactions(
            @PathParam("accountId") Long accountId,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size
    ) {
        List<TransactionDTO> transactions = transactionService.findTransactions(
                accountId, null, null, null, null, null, page, size
        ).stream().map(TransactionDTO::from).collect(Collectors.toList());

        long totalCount = transactionService.countTransactions(
                accountId, null, null, null, null, null
        );

        return Response.ok(transactions)
                .header("Access-Control-Expose-Headers", "X-Total-Count, X-Page-Size, X-Page-Number")
                .header("X-Total-Count", totalCount)
                .header("X-Page-Size", size)
                .header("X-Page-Number", page)
                .build();
    }
}
