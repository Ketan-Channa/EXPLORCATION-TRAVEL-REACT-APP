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

export default router;