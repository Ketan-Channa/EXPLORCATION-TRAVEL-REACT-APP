import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Detects configuration target environment dynamically
const dbHost = process.env.DB_HOST || 'localhost';
const sslConfig = (dbHost !== 'localhost' && dbHost !== '127.0.0.1')
    ? { rejectUnauthorized: false }
    : undefined;

const pool = mysql.createPool({
    host: dbHost,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kets.8865',
    database: process.env.DB_NAME || 'travelmanagementsystem',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: sslConfig
});

// Structural diagnostic test connection and auto-table initialization
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection pool established successfully.");

        // 1. Auto-create account table if it doesn't exist
        const createAccountTable = `
            CREATE TABLE IF NOT EXISTS account (
                username VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                security VARCHAR(255) NOT NULL DEFAULT 'YOUR BIRTHDAY',
                answer VARCHAR(255) NOT NULL
            );
        `;

        // 2. Auto-create customer profile table
        const createCustomerTable = `
            CREATE TABLE IF NOT EXISTS customer (
                username VARCHAR(255) PRIMARY KEY,
                id VARCHAR(255) NOT NULL,
                number VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                gender VARCHAR(50) NOT NULL,
                country VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                FOREIGN KEY (username) REFERENCES account(username) ON DELETE CASCADE
            );
        `;

        // 3. Auto-create static hotel options lookup table
        const createHotelTable = `
            CREATE TABLE IF NOT EXISTS hotel (
                name VARCHAR(255) PRIMARY KEY,
                cost INT NOT NULL,
                acroom INT NOT NULL,
                foodincluded INT NOT NULL
            );
        `;

        // 4. Auto-create hotel booking records schema linked safely to accounts
        const createBookHotelsTable = `
            CREATE TABLE IF NOT EXISTS bookhotels (
                booking_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                hotel VARCHAR(255) NOT NULL,
                people INT NOT NULL,
                days INT NOT NULL,
                ac VARCHAR(50) NOT NULL,
                id VARCHAR(255) NOT NULL,
                number VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                price VARCHAR(255) NOT NULL,
                FOREIGN KEY (username) REFERENCES account(username) ON DELETE CASCADE
            );
        `;

        // 5. Auto-create package transactions records schema linked safely to accounts
        const createBookPackageTable = `
            CREATE TABLE IF NOT EXISTS bookpackage (
                booking_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                package VARCHAR(255) NOT NULL,
                people INT NOT NULL,
                id VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                price VARCHAR(255) NOT NULL,
                FOREIGN KEY (username) REFERENCES account(username) ON DELETE CASCADE
            );
        `;

        // Execute foundational operations sequentially
        await connection.query(createAccountTable);

        // Safe column migration block handling legacy properties
        try {
            await connection.query('SELECT security FROM account LIMIT 1');
        } catch (colError) {
            try {
                console.log("Migrating legacy database column: security_question -> security...");
                await connection.query('ALTER TABLE account ADD COLUMN security VARCHAR(255) NOT NULL DEFAULT "YOUR BIRTHDAY"');
                await connection.query('UPDATE account SET security = security_question WHERE security_question IS NOT NULL');
                await connection.query('ALTER TABLE account DROP COLUMN security_question');
                console.log("Successfully migrated account table columns.");
            } catch (migrationError) {
                console.log("Non-critical migration notice:", migrationError.message);
            }
        }

        await connection.query(createCustomerTable);
        await connection.query(createHotelTable);
        await connection.query(createBookHotelsTable);
        await connection.query(createBookPackageTable);
        console.log("Database tables verified/created successfully.");

        // Auto-seed hotel catalog parameters if missing
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM hotel');
        if (rows[0].count === 0) {
            const seedQuery = `
                INSERT INTO hotel (name, cost, acroom, foodincluded) VALUES
                ('J.W. MARRIOT HOTEL', 3400, 1000, 800),
                ('MANDRIN HOTEL', 2800, 800, 600),
                ('FOUR SEASONS HOTEL', 4000, 1200, 1000),
                ('RADISON BLUE HOTEL', 3000, 900, 700),
                ('CLASSIO HOTEL', 2200, 700, 500),
                ('THE BAY CLUB HOTEL', 3200, 950, 750),
                ('BREEZE BLOW HOTEL', 2500, 750, 550),
                ('THE TAJ HOTEL', 4500, 1500, 1200),
                ('HAPPY MORNING HOTEL', 1800, 600, 400),
                ('RIVER VIEW HOTEL', 2000, 650, 450);
            `;
            await connection.query(seedQuery);
            console.log("Hotel database seeded successfully.");
        }

        connection.release();
    } catch (error) {
        console.error("Database connection or initialization failed:", error.message);
    }
})();

export default pool;