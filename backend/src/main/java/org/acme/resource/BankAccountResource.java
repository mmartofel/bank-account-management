package org.acme.resource;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.validation.Valid;
import org.acme.entity.BankAccount;
import org.acme.entity.User;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.hibernate.exception.ConstraintViolationException;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@Path("/api/accounts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Bank Account Management", description = "Operations for managing bank accounts")
@ApplicationScoped
public class BankAccountResource {

    @GET
    @Operation(summary = "Get all bank accounts", 
              description = "Returns a list of all bank accounts in the system")
    @APIResponse(responseCode = "200",
                description = "List of bank accounts",
                content = @Content(mediaType = MediaType.APPLICATION_JSON))
    public List<BankAccount> getAllAccounts() {
        return BankAccount.listAll();
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Get bank account by ID",
              description = "Returns a specific bank account by its ID")
    @APIResponse(responseCode = "200",
                description = "The bank account",
                content = @Content(mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "404",
                description = "Bank account not found")
    public Response getAccountById(
            @Parameter(description = "Bank account ID", required = true)
            @PathParam("id") Long id) {
        return BankAccount.findByIdOptional(id)
                .map(account -> Response.ok(account).build())
                .orElse(Response.status(Status.NOT_FOUND).build());
    }

    @GET
    @Path("/user/{userId}")
    @Operation(summary = "Get accounts by user ID",
              description = "Returns all bank accounts owned by a specific user")
    @APIResponse(responseCode = "200",
                description = "List of user's bank accounts",
                content = @Content(mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "404",
                description = "User not found")
    public Response getAccountsByUserId(
            @Parameter(description = "User ID", required = true)
            @PathParam("userId") Long userId) {
        User user = User.findById(userId);
        if (user == null) {
            return Response.status(Status.NOT_FOUND)
                    .entity("User not found")
                    .build();
        }
        
        List<BankAccount> accounts = BankAccount.list("user.id", userId);
        return Response.ok(accounts).build();
    }

    @POST
    @Transactional
    @Operation(summary = "Create a new bank account")
    @APIResponse(
        responseCode = "201",
        description = "Bank account created",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    @APIResponse(
        responseCode = "400",
        description = "Invalid input"
    )
    @APIResponse(
        responseCode = "404",
        description = "User not found"
    )
    @APIResponse(
        responseCode = "409",
        description = "Account number already exists"
    )
    public Response createAccount(
            @Valid BankAccount account,
            @Parameter(description = "User ID") @QueryParam("userId") Long userId) {
        try {
            // Validate user exists
            User user = User.findById(userId);
            if (user == null) {
                return Response.status(Status.NOT_FOUND)
                        .entity("User not found")
                        .build();
            }

            // Check if account number already exists
            if (BankAccount.find("accountNumber", account.getAccountNumber()).count() > 0) {
                return Response.status(Status.CONFLICT)
                        .entity("Account number already exists")
                        .build();
            }

            // Set default values if not provided
            if (account.getOpenedDate() == null) {
                account.setOpenedDate(LocalDateTime.now());
            }
            if (account.getLastActivityDate() == null) {
                account.setLastActivityDate(LocalDateTime.now());
            }
            if (account.getStatus() == null) {
                account.setStatus(BankAccount.AccountStatus.ACTIVE);
            }
            if (account.getCurrency() == null) {
                account.setCurrency("USD");
            }
            if (account.getBalance() == null) {
                account.setBalance(BigDecimal.ZERO);
            }

            account.setUser(user);
            account.persist();

            return Response.created(URI.create("/api/accounts/" + account.getId())).build();
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                return Response.status(Status.CONFLICT)
                        .entity("Account with these details already exists")
                        .build();
            }
            return Response.status(Status.INTERNAL_SERVER_ERROR)
                    .entity("An error occurred while creating the account")
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    @Operation(summary = "Update a bank account")
    @APIResponse(
        responseCode = "200",
        description = "Bank account updated",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    @APIResponse(
        responseCode = "404",
        description = "Bank account not found"
    )
    @APIResponse(
        responseCode = "409",
        description = "Account number already exists"
    )
    public Response updateAccount(
            @Parameter(description = "Bank account ID") @PathParam("id") Long id,
            @Valid BankAccount updatedAccount) {
        try {
            BankAccount existingAccount = BankAccount.findById(id);
            if (existingAccount == null) {
                return Response.status(Status.NOT_FOUND).build();
            }

            // Check if account number is being changed and if it conflicts
            if (!existingAccount.getAccountNumber().equals(updatedAccount.getAccountNumber()) &&
                BankAccount.find("accountNumber = ?1 and id != ?2",
                        updatedAccount.getAccountNumber(), id).count() > 0) {
                return Response.status(Status.CONFLICT)
                        .entity("Account number already exists")
                        .build();
            }

            // Update fields
            existingAccount.setAccountNumber(updatedAccount.getAccountNumber());
            existingAccount.setRoutingNumber(updatedAccount.getRoutingNumber());
            existingAccount.setAccountType(updatedAccount.getAccountType());
            existingAccount.setBalance(updatedAccount.getBalance());
            existingAccount.setCurrency(updatedAccount.getCurrency());
            existingAccount.setInterestRate(updatedAccount.getInterestRate());
            existingAccount.setStatus(updatedAccount.getStatus());
            existingAccount.setLastActivityDate(LocalDateTime.now());

            return Response.ok(existingAccount).build();
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                return Response.status(Status.CONFLICT)
                        .entity("Update would violate constraints")
                        .build();
            }
            return Response.status(Status.INTERNAL_SERVER_ERROR)
                    .entity("An error occurred while updating the account")
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    @Operation(summary = "Delete a bank account",
              description = "Soft deletes a bank account by setting its status to CLOSED")
    @APIResponse(responseCode = "204",
                description = "Bank account deleted")
    @APIResponse(responseCode = "404",
                description = "Bank account not found")
    public Response deleteAccount(
            @Parameter(description = "Bank account ID", required = true)
            @PathParam("id") Long id) {
        BankAccount account = BankAccount.findById(id);
        if (account == null) {
            return Response.status(Status.NOT_FOUND).build();
        }

        // Instead of hard delete, set status to CLOSED
        account.setStatus(BankAccount.AccountStatus.CLOSED);
        account.setLastActivityDate(LocalDateTime.now());

        return Response.noContent().build();
    }

    @GET
    @Path("/search")
    @Operation(summary = "Search for bank accounts",
              description = "Searches for bank accounts by account number, account type, or status")
    @APIResponse(responseCode = "200",
                description = "List of bank accounts",
                content = @Content(mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400",
                description = "Invalid search parameters")
    public Response searchAccounts(
            @Parameter(description = "Account number", required = false)
            @QueryParam("accountNumber") String accountNumber,
            @Parameter(description = "Account type", required = false)
            @QueryParam("accountType") BankAccount.AccountType accountType,
            @Parameter(description = "Account status", required = false)
            @QueryParam("status") BankAccount.AccountStatus status) {
        if (accountNumber != null && !accountNumber.isEmpty()) {
            BankAccount account = BankAccount.find("accountNumber", accountNumber).firstResult();
            return account != null ? Response.ok(account).build()
                                 : Response.status(Status.NOT_FOUND).build();
        }

        if (accountType != null) {
            List<BankAccount> accounts = BankAccount.list("accountType", accountType);
            return Response.ok(accounts).build();
        }

        if (status != null) {
            List<BankAccount> accounts = BankAccount.list("status", status);
            return Response.ok(accounts).build();
        }

        return Response.status(Status.BAD_REQUEST)
                .entity("At least one search parameter (accountNumber, accountType, or status) is required")
                .build();
    }

    @PUT
    @Path("/{id}/status")
    @Transactional
    @Operation(summary = "Update account status",
              description = "Updates the status of a bank account")
    @APIResponse(responseCode = "200",
                description = "Account status updated",
                content = @Content(mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "404",
                description = "Bank account not found")
    public Response updateAccountStatus(
            @Parameter(description = "Bank account ID", required = true)
            @PathParam("id") Long id,
            @Parameter(description = "New account status", required = true)
            @QueryParam("status") BankAccount.AccountStatus newStatus) {
        if (newStatus == null) {
            return Response.status(Status.BAD_REQUEST)
                    .entity("Status parameter is required")
                    .build();
        }

        BankAccount account = BankAccount.findById(id);
        if (account == null) {
            return Response.status(Status.NOT_FOUND).build();
        }

        account.setStatus(newStatus);
        account.setLastActivityDate(LocalDateTime.now());

        return Response.ok(account).build();
    }
}
