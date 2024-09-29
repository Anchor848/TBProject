const express = require('express');
const { loginUser } = require('../controllers/userController');
const db = require('../config/db'); // Import your database configuration

const router = express.Router();

router.post('/login', loginUser);  // Define the login route

// Route to get all student usernames
router.get('/students', (req, res) => {
    const selectQuery = 'SELECT username FROM users WHERE user_type = "student"';

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to fetch student names' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;