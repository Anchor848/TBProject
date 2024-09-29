// backend/routes/scoreRoutes.js
const express = require('express');
const db = require('../config/db'); // Import the database connection
const router = express.Router();

// POST route for submitting a student score
router.post('/', (req, res) => {
    const { student_name, subject, score } = req.body;

    // Validate input
    if (!student_name || !subject || score === undefined) {
        console.error('Missing required fields:', { student_name, subject, score });
        return res.status(400).json({ error: 'Student name, subject, and score are required' });
    }

    // Insert the score into the studentscores table
    const insertQuery = 'INSERT INTO studentscores (student_name, subject, score) VALUES (?, ?, ?)';
    db.query(insertQuery, [student_name, subject, score], (err) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to submit score' });
        }
        res.status(201).json({ message: 'Score submitted successfully' });
    });
});

module.exports = router;