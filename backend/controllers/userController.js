const db = require('../config/db');
const bcrypt = require('bcrypt');

const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Query to find user by username
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (isMatch) {
                return res.status(200).json({
                    message: 'Login successful',
                    user_type: user.user_type,
                    username: user.username, // Include username in response for frontend use
                });
            } else {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    });
};

module.exports = { loginUser };