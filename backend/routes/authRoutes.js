import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. SIGNUP ENDPOINT: Replaces the ActionEvent inside Signup.java
router.post('/signup', async (req, res) => {
    const { username, name, password, security, answer } = req.body;

    if (!username || !name || !password || !security || !answer) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [existing] = await pool.query('SELECT username FROM account WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Updated column structural mapping to use 'security' directly
        const query = 'INSERT INTO account (username, name, password, security, answer) VALUES (?, ?, ?, ?, ?)';
        await pool.query(query, [username, name, password, security, answer]);

        res.status(201).json({ message: 'ACCOUNT CREATED SUCCESSFULLY' });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ error: 'Database execution error during signup.' });
    }
});

// 2. LOGIN ENDPOINT: Replaces the ActionEvent inside Login.java
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT username FROM account WHERE username = ? AND password = ?', [username, password]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'INCORRECT USERNAME OR PASSWORD' });
        }

        res.json({ message: 'Login successful', username: rows[0].username });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: 'Database execution error during login.' });
    }
});

// 3. RECOVERY SEARCH ENDPOINT: Replaces the "SEARCH" action inside ForgetPassword.java
router.post('/search', async (req, res) => {
    const { username } = req.body;
    try {
        const [rows] = await pool.query('SELECT name, security FROM account WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Username not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Search error:", error.message);
        res.status(500).json({ error: 'Database error searching for username.' });
    }
});

// 4. RECOVERY RETRIEVE ENDPOINT: Replaces the "RETRIEVE" action inside ForgetPassword.java
router.post('/retrieve', async (req, res) => {
    const { username, answer } = req.body;
    try {
        const [rows] = await pool.query('SELECT password FROM account WHERE username = ? AND answer = ?', [username, answer]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Incorrect answer or username matching error' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Retrieval error:", error.message);
        res.status(500).json({ error: 'Database error retrieving credentials.' });
    }
});

export default router;