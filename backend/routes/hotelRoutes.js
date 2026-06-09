import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. BOOK HOTEL ENDPOINT: Replaces the executeUpdate statement inside BookHotel.java
router.post('/book', async (req, res) => {
    const { username, hotelName, totalPeople, totalDays, acRoom, idType, idNumber, phone, totalPrice } = req.body;

    if (!username || !hotelName || !totalPeople || !totalDays || !acRoom || !idType || !idNumber || !phone || !totalPrice) {
        return res.status(400).json({ error: 'All parameters are required to process lodging transactions.' });
    }

    try {
        const formattedPrice = `Rs. ${totalPrice}`;
        const query = 'INSERT INTO bookhotels (username, hotel, people, days, ac, id, number, phone, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.query(query, [username, hotelName, totalPeople, totalDays, acRoom, idType, idNumber, phone, formattedPrice]);
        res.status(201).json({ message: 'HOTEL BOOKED SUCCESSFULLY' });
    } catch (error) {
        console.error("Error booking hotel lodging window:", error.message);
        res.status(500).json({ error: 'Database transaction error processing hotel booking.' });
    }
});

// 2. VIEW BOOKED HOTEL ENDPOINT: Replaces the constructor query statement inside ViewBookedHotel.java
router.get('/booked/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const [rows] = await pool.query('SELECT * FROM bookhotels WHERE username = ? ORDER BY booking_id DESC LIMIT 1', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No booked hotel records found for this user account.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error pulling booked hotel data:", error.message);
        res.status(500).json({ error: 'Server Error fetching transaction parameters.' });
    }
});

// 3. LIST HOTELS ENDPOINT: Pulls all hotel pricing options
router.get('/list', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM hotel');
        res.json(rows);
    } catch (error) {
        console.error("Error fetching hotel list:", error.message);
        res.status(500).json({ error: 'Database error retrieving hotel listing.' });
    }
});

// Structural auto-initialization seed schema layer for lodging
(async () => {
    try {
        const connection = await pool.getConnection();

        // 1. Create static hotel parameters lookup table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS hotel (
                name VARCHAR(255) PRIMARY KEY,
                cost_per_person INT NOT NULL,
                ac_room INT NOT NULL,
                food_charges INT NOT NULL
            );
        `);

        // Check if data exists; if completely fresh, seed standard layout variants
        const [existingHotels] = await connection.query('SELECT COUNT(*) as count FROM hotel');
        if (existingHotels[0].count === 0) {
            const seedQuery = `
                INSERT INTO hotel (name, cost_per_person, ac_room, food_charges) VALUES
                ('Raddison Blue Hotel', 3400, 1200, 600),
                ('The Taj Mahal Palace', 6800, 2500, 1200),
                ('JW Marriott Hotel', 5200, 1800, 900);
            `;
            await connection.query(seedQuery);
            console.log("Hotel properties successfully seeded in backend.");
        }

        // 2. Create booking transactions schema
        await connection.query(`
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
        `);

        console.log("Hotel mapping schemas verified securely in Aiven Cloud.");
        connection.release();
    } catch (error) {
        console.error("Hotel table migration breakdown:", error.message);
    }
})();

export default router;