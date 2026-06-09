import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. AUTOFILL ENDPOINT: Pulls customer record for autofilling booking panel layouts
router.get('/customer/:username', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT username, id, number, phone FROM customer WHERE username = ?', [req.params.username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Customer profile details not found.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching autofill fields:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 2. BOOK ENDPOINT: Replaces the insert transaction inside BookPackage.java
router.post('/book', async (req, res) => {
    const { username, packageName, totalPeople, idType, phone, totalPrice } = req.body;

    if (!username || !packageName || !totalPeople || !idType || !phone || !totalPrice) {
        return res.status(400).json({ error: 'All parameters are required to process tour bookings.' });
    }

    try {
        const formattedPrice = `Rs. ${totalPrice}`;
        const query = 'INSERT INTO bookpackage (username, package, people, id, phone, price) VALUES (?, ?, ?, ?, ?, ?)';
        await pool.query(query, [username, packageName, totalPeople, idType, phone, formattedPrice]);
        res.status(201).json({ message: 'PACKAGE BOOKED SUCCESSFULLY' });
    } catch (error) {
        console.error("Error booking vacation package:", error.message);
        res.status(500).json({ error: 'Database transaction error processing package purchase.' });
    }
});

// 3. VIEW ENDPOINT: Replaces the selector query inside ViewPackage.java
router.get('/booked/:username', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM bookpackage WHERE username = ? ORDER BY booking_id DESC LIMIT 1', [req.params.username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No active vacation packages booked under this account yet.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error loading booked package rows:", error.message);
        res.status(500).json({ error: 'Internal Server Error fetching itinerary.' });
    }
});

// Structural auto-initialization schema layer for package bookings
(async () => {
    try {
        const connection = await pool.getConnection();

        // Create booking transaction table schema with an auto-incrementing ID primary key
        const createPackageTableQuery = `
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

        await connection.query(createPackageTableQuery);
        console.log("Package transaction schemas verified securely in Aiven Cloud.");
        connection.release();
    } catch (error) {
        console.error("Package table migration breakdown:", error.message);
    }
})();

export default router;