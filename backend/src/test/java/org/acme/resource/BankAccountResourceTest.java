package org.acme.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.transaction.Transactional;
import org.acme.entity.BankAccount;
import org.acme.entity.User;
import org.acme.entity.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.Matchers.hasSize;

@QuarkusTest
public class BankAccountResourceTest {

    private Long testUserId;
    private Long testAccountId;

    @BeforeEach
    @Transactional
    void setUp() {
        // Clean up existing test data in the correct order
        // First delete transactions
        Transaction.deleteAll();
        // Then delete bank accounts
        BankAccount.deleteAll();
        // Finally delete users
        User.deleteAll();

        // Create test user
        User testUser = new User();
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        testUser.setEmail("john.doe@test.com");
        testUser.setDateOfBirth(LocalDate.now().minusYears(30));
        testUser.setPhoneNumber("555-0123");
        testUser.setStreetAddress("123 Test St");
        testUser.setCity("Test City");
        testUser.setState("CA");
        testUser.setZipCode("12345");
        testUser.persist();
        testUserId = testUser.getId();

        // Create test bank account
        BankAccount testAccount = new BankAccount();
        testAccount.setAccountNumber("1234567890");
        testAccount.setRoutingNumber("987654321");
        testAccount.setAccountType(BankAccount.AccountType.CHECKING);
        testAccount.setBalance(new BigDecimal("1000.00"));
        testAccount.setCurrency("USD");
        testAccount.setInterestRate(new BigDecimal("0.01"));
        testAccount.setStatus(BankAccount.AccountStatus.ACTIVE);
        testAccount.setOpenedDate(LocalDateTime.now());
        testAccount.setLastActivityDate(LocalDateTime.now());
        testAccount.setUser(testUser);
        testAccount.persist();
        testAccountId = testAccount.getId();
    }

    @Test
    public void testGetAllAccounts() {
        given()
            .when().get("/api/accounts")
            .then()
                .statusCode(200)
                .body("$", hasSize(1))
                .body("[0].accountNumber", equalTo("1234567890"))
                .body("[0].accountType", equalTo("CHECKING"));
    }

    @Test
    public void testGetAccountById() {
        given()
            .when().get("/api/accounts/" + testAccountId)
            .then()
                .statusCode(200)
                .body("accountNumber", equalTo("1234567890"))
                .body("routingNumber", equalTo("987654321"))
                .body("accountType", equalTo("CHECKING"))
                .body("balance", equalTo(1000.00f))
                .body("currency", equalTo("USD"));
    }

    @Test
    public void testGetAccountByIdNotFound() {
        given()
            .when().get("/api/accounts/999999")
            .then()
                .statusCode(404);
    }

    @Test
    public void testGetAccountsByUserId() {
        given()
            .when().get("/api/accounts/user/" + testUserId)
            .then()
                .statusCode(200)
                .body("$", hasSize(1))
                .body("[0].accountNumber", equalTo("1234567890"));
    }

    @Test
    public void testCreateAccount() {
        BankAccount newAccount = new BankAccount();
        newAccount.setAccountNumber("9876543210");
        newAccount.setRoutingNumber("123456789");
        newAccount.setAccountType(BankAccount.AccountType.SAVINGS);
        newAccount.setBalance(new BigDecimal("2000.00"));
        newAccount.setCurrency("USD");
        newAccount.setInterestRate(new BigDecimal("0.02"));

        given()
            .contentType(ContentType.JSON)
            .body(newAccount)
            .queryParam("userId", testUserId)
            .when().post("/api/accounts")
            .then()
                .statusCode(201)
                .header("Location", containsString("/api/accounts/"));
    }

    @Test
    public void testCreateAccountWithDuplicateNumber() {
        BankAccount duplicateAccount = new BankAccount();
        duplicateAccount.setAccountNumber("1234567890"); // Same as test account
        duplicateAccount.setRoutingNumber("123456789");
        duplicateAccount.setAccountType(BankAccount.AccountType.SAVINGS);

        given()
            .contentType(ContentType.JSON)
            .body(duplicateAccount)
            .queryParam("userId", testUserId)
            .when().post("/api/accounts")
            .then()
                .statusCode(409);
    }

    @Test
    public void testUpdateAccount() {
        BankAccount updatedAccount = new BankAccount();
        updatedAccount.setAccountNumber("1234567890");
        updatedAccount.setRoutingNumber("987654321");
        updatedAccount.setAccountType(BankAccount.AccountType.SAVINGS);
        updatedAccount.setBalance(new BigDecimal("1500.00"));
        updatedAccount.setCurrency("USD");
        updatedAccount.setInterestRate(new BigDecimal("0.02"));
        updatedAccount.setStatus(BankAccount.AccountStatus.ACTIVE);

        given()
            .contentType(ContentType.JSON)
            .body(updatedAccount)
            .when().put("/api/accounts/" + testAccountId)
            .then()
                .statusCode(200)
                .body("accountType", equalTo("SAVINGS"))
                .body("balance", equalTo(1500.00f));
    }

    @Test
    public void testDeleteAccount() {
        given()
            .when().delete("/api/accounts/" + testAccountId)
            .then()
                .statusCode(204);

        // Verify account is now closed
        given()
            .when().get("/api/accounts/" + testAccountId)
            .then()
                .statusCode(200)
                .body("status", equalTo("CLOSED"));
    }

    @Test
    public void testSearchAccounts() {
        // Search by account number
        given()
            .queryParam("accountNumber", "1234567890")
            .when().get("/api/accounts/search")
            .then()
                .statusCode(200)
                .body("accountNumber", equalTo("1234567890"));

        // Search by account type
        given()
            .queryParam("accountType", "CHECKING")
            .when().get("/api/accounts/search")
            .then()
                .statusCode(200)
                .body("$", hasSize(1))
                .body("[0].accountType", equalTo("CHECKING"));

        // Search by status
        given()
            .queryParam("status", "ACTIVE")
            .when().get("/api/accounts/search")
            .then()
                .statusCode(200)
                .body("$", hasSize(1))
                .body("[0].status", equalTo("ACTIVE"));
    }

    @Test
    public void testUpdateAccountStatus() {
        given()
            .queryParam("status", "FROZEN")
            .when().put("/api/accounts/" + testAccountId + "/status")
            .then()
                .statusCode(200)
                .body("status", equalTo("FROZEN"));
    }

    @Test
    public void testUpdateAccountStatusInvalidStatus() {
        given()
            .when().put("/api/accounts/" + testAccountId + "/status")
            .then()
                .statusCode(400);
    }
}
