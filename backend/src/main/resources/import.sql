-- Drop sequences if they exist
DROP SEQUENCE IF EXISTS transaction_ref_seq;
DROP SEQUENCE IF EXISTS transaction_seq;

-- Create sequences
CREATE SEQUENCE transaction_ref_seq START WITH 1000;
CREATE SEQUENCE transaction_seq START WITH 1;

-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- Inserting 100 sample users
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (1, 'John', 'Robert', 'Smith', '1985-03-15', '123-45-6789', 'john.smith@email.com', '5551234567', '123 Main St', 'Los Angeles', 'CA', '90001');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (2, 'Mary', 'Jane', 'Johnson', '1990-07-22', '234-56-7890', 'mary.johnson@email.com', '5552345678', '456 Oak Ave', 'New York', 'NY', '10001');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (3, 'James', 'William', 'Brown', '1988-11-30', '345-67-8901', 'james.brown@email.com', '5553456789', '789 Pine Rd', 'Chicago', 'IL', '60601');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (4, 'Patricia', 'Ann', 'Davis', '1992-04-18', '456-78-9012', 'patricia.davis@email.com', '5554567890', '321 Elm St', 'Houston', 'TX', '77001');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (5, 'Michael', 'David', 'Miller', '1987-09-25', '567-89-0123', 'michael.miller@email.com', '5555678901', '654 Maple Dr', 'Phoenix', 'AZ', '85001');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (6, 'Linda', 'Marie', 'Wilson', '1993-01-12', '678-90-1234', 'linda.wilson@email.com', '5556789012', '987 Cedar Ln', 'Philadelphia', 'PA', '19101');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (7, 'Robert', 'James', 'Moore', '1986-06-08', '789-01-2345', 'robert.moore@email.com', '5557890123', '147 Birch Rd', 'San Antonio', 'TX', '78201');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (8, 'Barbara', 'Lynn', 'Taylor', '1991-12-03', '890-12-3456', 'barbara.taylor@email.com', '5558901234', '258 Walnut Ave', 'San Diego', 'CA', '92101');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (9, 'William', 'Thomas', 'Anderson', '1989-08-20', '901-23-4567', 'william.anderson@email.com', '5559012345', '369 Spruce St', 'Dallas', 'TX', '75201');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (10, 'Elizabeth', 'Rose', 'Thomas', '1994-05-27', '012-34-5678', 'elizabeth.thomas@email.com', '5550123456', '741 Oak St', 'San Jose', 'CA', '95101');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (11, 'David', 'Jackson', '1987-02-14', '123-45-6780', 'david.jackson@email.com', '5551234560', '852 Pine Ave', 'Austin', 'TX', '78701');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (12, 'Jennifer', 'White', '1992-09-09', '234-56-7891', 'jennifer.white@email.com', '5552345671', '963 Maple St', 'Jacksonville', 'FL', '32201');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (13, 'Richard', 'Lee', 'Harris', '1988-07-16', '345-67-8902', 'richard.harris@email.com', '5553456782', '159 Cedar Ave', 'San Francisco', 'CA', '94101');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (14, 'Maria', 'Garcia', '1993-11-23', '456-78-9013', 'maria.garcia@email.com', '5554567893', '753 Elm Rd', 'Columbus', 'OH', '43201');
INSERT INTO users (id, first_name, middle_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (15, 'Charles', 'Edward', 'Clark', '1986-04-30', '567-89-0124', 'charles.clark@email.com', '5555678904', '951 Birch St', 'Fort Worth', 'TX', '76101');

-- Continue with more diverse names and locations...
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (16, 'Sandra', 'Martinez', '1990-08-05', '678-90-1235', 'sandra.martinez@email.com', '5556789015', '147 Highland Ave', 'Charlotte', 'NC', '28201');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (17, 'Joseph', 'Rodriguez', '1989-03-12', '789-01-2346', 'joseph.rodriguez@email.com', '5557890126', '258 Lake St', 'Detroit', 'MI', '48201');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (18, 'Margaret', 'Lee', '1991-06-19', '890-12-3457', 'margaret.lee@email.com', '5558901237', '369 River Rd', 'El Paso', 'TX', '79901');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (19, 'Thomas', 'Walker', '1988-01-26', '901-23-4568', 'thomas.walker@email.com', '5559012348', '741 Forest Ave', 'Seattle', 'WA', '98101');
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) VALUES (20, 'Dorothy', 'Hall', '1992-12-02', '012-34-5679', 'dorothy.hall@email.com', '5550123457', '852 Beach Rd', 'Denver', 'CO', '80201');

-- Adding more diverse entries...
INSERT INTO users (id, first_name, last_name, date_of_birth, ssn, email, phone_number, street_address, city, state, zip_code) 
SELECT 
  generate_series + 20,
  CASE (generate_series % 20)
    WHEN 0 THEN 'Christopher' WHEN 1 THEN 'Michelle' WHEN 2 THEN 'Daniel'
    WHEN 3 THEN 'Lisa' WHEN 4 THEN 'Matthew' WHEN 5 THEN 'Nancy'
    WHEN 6 THEN 'Anthony' WHEN 7 THEN 'Betty' WHEN 8 THEN 'Donald'
    WHEN 9 THEN 'Sarah' WHEN 10 THEN 'Kevin' WHEN 11 THEN 'Karen'
    WHEN 12 THEN 'Brian' WHEN 13 THEN 'Helen' WHEN 14 THEN 'George'
    WHEN 15 THEN 'Donna' WHEN 16 THEN 'Steven' WHEN 17 THEN 'Carol'
    WHEN 18 THEN 'Edward' WHEN 19 THEN 'Sharon'
  END,
  CASE (generate_series % 20)
    WHEN 0 THEN 'Young' WHEN 1 THEN 'King' WHEN 2 THEN 'Wright'
    WHEN 3 THEN 'Lopez' WHEN 4 THEN 'Hill' WHEN 5 THEN 'Scott'
    WHEN 6 THEN 'Green' WHEN 7 THEN 'Adams' WHEN 8 THEN 'Baker'
    WHEN 9 THEN 'Nelson' WHEN 10 THEN 'Carter' WHEN 11 THEN 'Mitchell'
    WHEN 12 THEN 'Perez' WHEN 13 THEN 'Roberts' WHEN 14 THEN 'Turner'
    WHEN 15 THEN 'Phillips' WHEN 16 THEN 'Campbell' WHEN 17 THEN 'Parker'
    WHEN 18 THEN 'Evans' WHEN 19 THEN 'Edwards'
  END,
  date '1980-01-01' + (generate_series * 37 || ' days')::interval,
  LPAD(CAST(generate_series + 100 AS TEXT), 3, '0') || '-' || 
  LPAD(CAST((generate_series + 20) % 100 AS TEXT), 2, '0') || '-' || 
  LPAD(CAST((generate_series + 1000) % 10000 AS TEXT), 4, '0'),
  CASE (generate_series % 20)
    WHEN 0 THEN 'user' WHEN 1 THEN 'person' WHEN 2 THEN 'member'
    WHEN 3 THEN 'customer' WHEN 4 THEN 'client' WHEN 5 THEN 'contact'
    WHEN 6 THEN 'profile' WHEN 7 THEN 'account' WHEN 8 THEN 'individual'
    WHEN 9 THEN 'subscriber' WHEN 10 THEN 'member' WHEN 11 THEN 'user'
    WHEN 12 THEN 'person' WHEN 13 THEN 'contact' WHEN 14 THEN 'profile'
    WHEN 15 THEN 'client' WHEN 16 THEN 'customer' WHEN 17 THEN 'account'
    WHEN 18 THEN 'subscriber' WHEN 19 THEN 'individual'
  END || (generate_series + 20) || '@email.com',
  '555' || LPAD(CAST((generate_series + 1000) % 10000 AS TEXT), 7, '0'),
  (generate_series + 100) || ' ' || 
  CASE (generate_series % 10)
    WHEN 0 THEN 'Park' WHEN 1 THEN 'Lake' WHEN 2 THEN 'Forest'
    WHEN 3 THEN 'River' WHEN 4 THEN 'Mountain' WHEN 5 THEN 'Valley'
    WHEN 6 THEN 'Spring' WHEN 7 THEN 'Beach' WHEN 8 THEN 'Hill'
    WHEN 9 THEN 'Meadow'
  END || ' ' ||
  CASE (generate_series % 5)
    WHEN 0 THEN 'Road' WHEN 1 THEN 'Street' WHEN 2 THEN 'Avenue'
    WHEN 3 THEN 'Boulevard' WHEN 4 THEN 'Lane'
  END,
  CASE (generate_series % 10)
    WHEN 0 THEN 'Boston' WHEN 1 THEN 'Miami' WHEN 2 THEN 'Atlanta'
    WHEN 3 THEN 'Nashville' WHEN 4 THEN 'Portland' WHEN 5 THEN 'Las Vegas'
    WHEN 6 THEN 'Minneapolis' WHEN 7 THEN 'Sacramento' WHEN 8 THEN 'Orlando'
    WHEN 9 THEN 'Cleveland'
  END,
  CASE (generate_series % 10)
    WHEN 0 THEN 'MA' WHEN 1 THEN 'FL' WHEN 2 THEN 'GA'
    WHEN 3 THEN 'TN' WHEN 4 THEN 'OR' WHEN 5 THEN 'NV'
    WHEN 6 THEN 'MN' WHEN 7 THEN 'CA' WHEN 8 THEN 'FL'
    WHEN 9 THEN 'OH'
  END,
  LPAD(CAST((generate_series * 737 % 90000 + 10000) AS TEXT), 5, '0')
FROM generate_series(1, 80);

-- Reset the sequence
ALTER SEQUENCE users_seq RESTART WITH 101;

-- Create checking accounts for all users
INSERT INTO bank_accounts (id, account_number, routing_number, account_type, balance, currency, interest_rate, status, opened_date, last_activity_date, user_id)
SELECT 
    generate_series,
    LPAD(CAST((generate_series * 7919) % 1000000000000 AS TEXT), 12, '0'),  -- Generate unique 12-digit account numbers
    '123456789',  -- Same routing number for the demo bank
    'CHECKING',
    (random() * 10000)::numeric(10,2),  -- Random balance between 0 and 10000
    'USD',
    0.01,
    'ACTIVE',
    TIMESTAMP '2023-01-01' + (random() * (TIMESTAMP '2023-12-31' - TIMESTAMP '2023-01-01')),
    CURRENT_TIMESTAMP,
    (CASE 
        WHEN generate_series <= 20 THEN generate_series 
        ELSE ((generate_series - 21) / 3) + 21 
    END)
FROM generate_series(1, 200);

-- Create savings accounts for ~70% of users
INSERT INTO bank_accounts (id, account_number, routing_number, account_type, balance, currency, interest_rate, status, opened_date, last_activity_date, user_id)
SELECT 
    generate_series + 200,
    LPAD(CAST((generate_series * 13331 + 1000000) % 1000000000000 AS TEXT), 12, '0'),
    '123456789',
    'SAVINGS',
    (random() * 50000)::numeric(10,2),  -- Random balance between 0 and 50000
    'USD',
    2.50,
    'ACTIVE',
    TIMESTAMP '2023-01-01' + (random() * (TIMESTAMP '2023-12-31' - TIMESTAMP '2023-01-01')),
    CURRENT_TIMESTAMP,
    (CASE 
        WHEN generate_series <= 15 THEN generate_series 
        ELSE ((generate_series - 16) / 2) + 16 
    END)
FROM generate_series(1, 140);

-- Create money market accounts for ~30% of users
INSERT INTO bank_accounts (id, account_number, routing_number, account_type, balance, currency, interest_rate, status, opened_date, last_activity_date, user_id)
SELECT 
    generate_series + 400,
    LPAD(CAST((generate_series * 17389 + 2000000) % 1000000000000 AS TEXT), 12, '0'),
    '123456789',
    'MONEY_MARKET',
    (random() * 100000)::numeric(10,2),  -- Random balance between 0 and 100000
    'USD',
    3.75,
    'ACTIVE',
    TIMESTAMP '2023-01-01' + (random() * (TIMESTAMP '2023-12-31' - TIMESTAMP '2023-01-01')),
    CURRENT_TIMESTAMP,
    generate_series
FROM generate_series(1, 60);

-- Create some CD accounts for ~10% of users
INSERT INTO bank_accounts (id, account_number, routing_number, account_type, balance, currency, interest_rate, status, opened_date, last_activity_date, user_id)
SELECT 
    generate_series + 500,
    LPAD(CAST((generate_series * 19463 + 3000000) % 1000000000000 AS TEXT), 12, '0'),
    '123456789',
    'CERTIFICATE_OF_DEPOSIT',
    (random() * 25000)::numeric(10,2),  -- Random balance between 0 and 25000
    'USD',
    4.50,
    'ACTIVE',
    TIMESTAMP '2023-01-01' + (random() * (TIMESTAMP '2023-12-31' - TIMESTAMP '2023-01-01')),
    CURRENT_TIMESTAMP,
    generate_series
FROM generate_series(1, 20);

-- Update the sequence for bank_accounts
ALTER SEQUENCE bank_accounts_seq RESTART WITH 600;

-- Generate random transactions
INSERT INTO transactions (
    id, 
    type, 
    amount, 
    currency, 
    source_account_id, 
    destination_account_id,
    transaction_date, 
    processing_date, 
    status, 
    description, 
    reference_number, 
    category, 
    balance_after_transaction
)
SELECT 
    nextval('transaction_seq'),
    CASE (FLOOR(random() * 11))::int
        WHEN 0 THEN 'DIRECT_DEPOSIT'
        WHEN 1 THEN 'PAYMENT'
        WHEN 2 THEN 'TRANSFER'
        WHEN 3 THEN 'ATM_WITHDRAWAL'
        WHEN 4 THEN 'DEPOSIT'
        WHEN 5 THEN 'WIRE_TRANSFER'
        WHEN 6 THEN 'REFUND'
        WHEN 7 THEN 'INTEREST_CREDIT'
        WHEN 8 THEN 'FEE'
        WHEN 9 THEN 'REVERSAL'
        WHEN 10 THEN 'PAYMENT'
        ELSE 'TRANSFER'
    END,
    CASE 
        WHEN random() < 0.7 THEN (random() * 1950 + 50)::numeric(10,2)
        ELSE (random() * 8000 + 2000)::numeric(10,2)
    END,
    'USD',
    a.id,
    CASE 
        WHEN random() < 0.3 THEN (
            SELECT id FROM bank_accounts 
            WHERE id != a.id 
            ORDER BY random() 
            LIMIT 1
        )
        ELSE NULL 
    END,
    timestamp '2023-01-01 00:00:00' +
        (random() * (timestamp '2024-01-20 00:00:00' -
                   timestamp '2023-01-01 00:00:00'))::interval,
    timestamp '2023-01-01 00:00:00' +
        (random() * (timestamp '2024-01-20 00:00:00' -
                   timestamp '2023-01-01 00:00:00'))::interval,
    CASE 
        WHEN random() < 0.8 THEN 'COMPLETED'
        WHEN random() < 0.9 THEN 'PENDING'
        WHEN random() < 0.95 THEN 'FAILED'
        ELSE 'SCHEDULED'
    END,
    CASE (FLOOR(random() * 9))::int
        WHEN 0 THEN 'Salary Deposit'
        WHEN 1 THEN 'Monthly Rent'
        WHEN 2 THEN 'Utility Payment'
        WHEN 3 THEN 'Grocery Shopping'
        WHEN 4 THEN 'Online Purchase'
        WHEN 5 THEN 'ATM Withdrawal'
        WHEN 6 THEN 'Investment Transfer'
        WHEN 7 THEN 'Insurance Premium'
        WHEN 8 THEN 'Subscription Payment'
        ELSE 'Miscellaneous Transaction'
    END,
    'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'),
    CASE (FLOOR(random() * 9))::int
        WHEN 0 THEN 'INCOME'
        WHEN 1 THEN 'HOUSING'
        WHEN 2 THEN 'UTILITIES'
        WHEN 3 THEN 'GROCERIES'
        WHEN 4 THEN 'SHOPPING'
        WHEN 5 THEN 'CASH'
        WHEN 6 THEN 'INVESTMENT'
        WHEN 7 THEN 'INSURANCE'
        WHEN 8 THEN 'SUBSCRIPTION'
        ELSE 'OTHER'
    END,
    (random() * 49000 + 1000)::numeric(10,2)
FROM 
    bank_accounts a,
    generate_series(1, 15); -- 15 transactions per account

-- Insert specific test transactions
INSERT INTO transactions (
    id, 
    type, 
    amount, 
    currency, 
    source_account_id, 
    destination_account_id,
    transaction_date, 
    processing_date, 
    status, 
    description, 
    reference_number, 
    category, 
    balance_after_transaction
)
VALUES
    (nextval('transaction_seq'), 'DIRECT_DEPOSIT', 5000.00, 'USD', 1, NULL, '2024-01-01 09:00:00'::timestamp, '2024-01-01 09:00:00'::timestamp, 'COMPLETED', 'January Salary', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'INCOME', 15000.00),
    (nextval('transaction_seq'), 'PAYMENT', 1500.00, 'USD', 1, NULL, '2024-01-02 10:00:00'::timestamp, '2024-01-02 10:00:00'::timestamp, 'COMPLETED', 'Rent Payment', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'HOUSING', 13500.00),
    (nextval('transaction_seq'), 'TRANSFER', 2000.00, 'USD', 2, 3, '2024-01-03 11:00:00'::timestamp, '2024-01-03 11:00:00'::timestamp, 'COMPLETED', 'Investment Transfer', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'INVESTMENT', 8000.00),
    (nextval('transaction_seq'), 'ATM_WITHDRAWAL', 300.00, 'USD', 2, NULL, '2024-01-04 12:00:00'::timestamp, '2024-01-04 12:00:00'::timestamp, 'COMPLETED', 'ATM Withdrawal', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'CASH', 7700.00),
    (nextval('transaction_seq'), 'WIRE_TRANSFER', 10000.00, 'USD', 3, 4, '2024-01-05 13:00:00'::timestamp, '2024-01-05 13:00:00'::timestamp, 'COMPLETED', 'Property Down Payment', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'HOUSING', 20000.00),
    (nextval('transaction_seq'), 'PAYMENT', 2500.00, 'USD', 3, NULL, '2024-01-05 14:00:00'::timestamp, NULL, 'FAILED', 'Car Payment - Insufficient Funds', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'AUTO', NULL),
    (nextval('transaction_seq'), 'PAYMENT', 99.99, 'USD', 4, NULL, '2024-01-06 15:00:00'::timestamp, '2024-01-06 15:00:00'::timestamp, 'COMPLETED', 'Streaming Services', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'ENTERTAINMENT', 5000.00),
    (nextval('transaction_seq'), 'TRANSFER', 5000.00, 'USD', 4, 5, '2024-01-07 16:00:00'::timestamp, NULL, 'PENDING', 'Large Transfer - Pending Review', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'TRANSFER', NULL),
    (nextval('transaction_seq'), 'DEPOSIT', 3000.00, 'USD', 5, NULL, '2024-01-08 17:00:00'::timestamp, '2024-01-08 17:00:00'::timestamp, 'COMPLETED', 'Check Deposit', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'INCOME', 8000.00),
    (nextval('transaction_seq'), 'PAYMENT', 150.00, 'USD', 5, NULL, '2024-02-01 00:00:00'::timestamp, NULL, 'SCHEDULED', 'Scheduled Utility Payment', 'TRX' || LPAD(CAST(nextval('transaction_ref_seq') AS TEXT), 8, '0'), 'UTILITIES', NULL);

-- Update the sequence
ALTER SEQUENCE transaction_seq RESTART WITH 1000;