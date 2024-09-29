const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const scoreRoutes = require('./routes/scoreRoutes'); // Import score routes
const testRoutes = require('./routes/testRoutes'); // Import test routes
const db = require('./config/db'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the routes
app.use('/api', authRoutes);  // Use the authentication routes
app.use('/api/scores', scoreRoutes); // Use the score routes
app.use('/api/practice-sets', testRoutes); // Use the test routes

// Create studentscores table if it does not exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS studentscores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        score DECIMAL(5,2) NOT NULL
    )
`;

db.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.stack);
    } else {
        console.log('studentscores table created successfully');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});