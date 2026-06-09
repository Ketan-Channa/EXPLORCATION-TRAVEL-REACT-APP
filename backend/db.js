import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Replaces your legacy DriverManager connection with a thread-safe connection pool linked to Aiven Cloud
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kets.8865',
    database: process.env.DB_NAME || 'travelmanagementsystem',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false // Required for secure cloud connection to Aiven MySQL
    }
});

// Structural diagnostic test connection and auto-table initialization
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection pool established successfully with Aiven Cloud.");

        // Auto-create account table if it doesn't exist in your cloud database
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS account (
                username VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                security_question VARCHAR(255) NOT NULL,
                answer VARCHAR(255) NOT NULL
            );
        `;

        await connection.query(createTableQuery);
        console.log("Database tables verified/created successfully.");

        connection.release();
    } catch (error) {
        console.error("Database connection or initialization failed:", error.message);
    }
})();

export default pool;