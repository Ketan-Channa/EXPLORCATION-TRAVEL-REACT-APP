import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. ADD PROFILE ENDPOINT: Replaces the ActionEvent insert statement inside AddCustomer.java
router.post('/add', async (req, res) => {
    const { username, id, number, name, gender, country, address, phone, email } = req.body;
    try {
        const query = 'INSERT INTO customer (username, id, number, name, gender, country, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await pool.query(query, [username, id, number, name, gender, country, address, phone, email]);
        res.status(201).json({ message: 'CUSTOMER DETAILS ADDED SUCCESSFULLY' });
    } catch (error) {
        console.error("Error adding customer details:", error.message);
        res.status(500).json({ error: 'Failed to insert customer profile details.' });
    }
});

// 2. VIEW PROFILE ENDPOINT: Replaces the select query inside ViewCustomer.java & UpdateCustomer.java constructor lifecycle
router.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM customer WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No personal details found for this user.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching customer profile data:", error.message);
        res.status(500).json({ error: 'Server error retrieving customer record.' });
    }
});

// 3. UPDATE PROFILE ENDPOINT: Replaces the ActionEvent update statement inside UpdateCustomer.java
router.put('/update/:username', async (req, res) => {
    const { username } = req.params;
    const { id, number, name, gender, country, address, phone, email } = req.body;
    try {
        const query = `
            UPDATE customer 
            SET id = ?, number = ?, name = ?, gender = ?, country = ?, address = ?, phone = ?, email = ? 
            WHERE username = ?
        `;
        const values = [id, number, name, gender, country, address, phone, email, username];
        await pool.query(query, values);
        res.json({ message: 'CUSTOMER DETAILS UPDATED SUCCESSFULLY' });
    } catch (error) {
        console.error("Error updating customer details:", error.message);
        res.status(500).json({ error: 'Failed to update customer profile data.' });
    }
});

// 4. CASCADE DELETE PROFILE ENDPOINT: Replaces the transactional multi-deletion routing inside DeleteCustomer.java
router.delete('/delete/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // Run all deletions within independent statements synchronously to safely clean up associated child rows
        await pool.query('DELETE FROM customer WHERE username = ?', [username]);
        await pool.query('DELETE FROM bookpackage WHERE username = ?', [username]);
        await pool.query('DELETE FROM bookhotels WHERE username = ?', [username]);
        await pool.query('DELETE FROM account WHERE username = ?', [username]);
        
        res.json({ message: 'DATA DELETED SUCCESSFULLY' });
    } catch (error) {
        console.error("Error handling cascade customer account erasure:", error.message);
        res.status(500).json({ error: 'Server processing failure deleting profile data layers.' });
    }
});

export default router;