import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Replaces your legacy DriverManager connection with a thread-safe connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kets.8865',
    database: process.env.DB_NAME || 'travelmanagementsystem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Structural diagnostic test connection to ensure MySQL is running seamlessly on port 3306
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection pool established successfully.");
        connection.release();
    } catch (error) {
        console.error("Database connection initialization failed:", error.message);
    }
})();

export default pool;