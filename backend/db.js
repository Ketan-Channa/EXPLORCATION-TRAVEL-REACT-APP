import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Determine configuration target environment dynamically
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

        // 🚨 CRITICAL FIX: Temporarily disable foreign key locks so tables drop safely
        await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

        // Clear out old structural layers seamlessly
        await connection.query(`DROP TABLE IF EXISTS bookpackage;`);
        await connection.query(`DROP TABLE IF EXISTS bookhotels;`);
        await connection.query(`DROP TABLE IF EXISTS customer;`);
        await connection.query(`DROP TABLE IF EXISTS account;`);
        console.log("Stale database tables cleared under relaxed constraint state.");

        // 🚨 Re-enable foreign key checks to protect production data relationships
        await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

        // 1. Create clean account table with matching column name 'security'
        const createAccountTable = `
            CREATE TABLE account (
                username VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                security VARCHAR(255) NOT NULL DEFAULT 'YOUR BIRTHDAY',
                answer VARCHAR(255) NOT NULL
            );
        `;
        await connection.query(createAccountTable);

        // 2. Create customer profile table
        const createCustomerTable = `
            CREATE TABLE customer (
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
        await connection.query(createCustomerTable);

        // 3. Create static hotel options lookup table
        const createHotelTable = `
            CREATE TABLE IF NOT EXISTS hotel (
                name VARCHAR(255) PRIMARY KEY,
                cost INT NOT NULL,
                acroom INT NOT NULL,
                foodincluded INT NOT NULL
            );
        `;
        await connection.query(createHotelTable);

        // 4. Create hotel booking records schema
        const createBookHotelsTable = `
            CREATE TABLE bookhotels (
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
        await connection.query(createBookHotelsTable);

        // 5. Create package transactions records schema
        const createBookPackageTable = `
            CREATE TABLE bookpackage (
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
        await connection.query(createBookPackageTable);

        console.log("All database tables initialized successfully with correct column maps.");

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