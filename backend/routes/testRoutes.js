const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Import database configuration
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for storing uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with a timestamp
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error('Only image files (jpeg, jpg, png) are allowed.'));
        }
    }
});

// POST route for uploading practice sets
router.post('/', upload.array('files', 10), (req, res) => {
    const { maxMark, subject, username, testname } = req.body;

    if (!username || !subject || !maxMark || !testname) {
        console.error('Missing required fields:', { username, subject, maxMark, testname });
        return res.status(400).json({ error: 'Username, subject, maxMark, and testname are required' });
    }

    const filePaths = req.files.map(file => file.path).join(','); // Save paths of uploaded files

    const insertQuery = 'INSERT INTO practice_sets (username, subject, max_mark, file_paths, testname) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [username, subject, parseFloat(maxMark), filePaths, testname], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to upload practice set' });
        }
        res.status(201).json({ id: results.insertId, username, subject, max_mark: maxMark, file_paths: filePaths, testname });
    });
});

// Route to fetch available practice sets grouped by subject
router.get('/all', (req, res) => {
    const query = `SELECT id, subject, testname FROM practice_sets ORDER BY subject`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to fetch practice sets' });
        }

        const groupedSets = results.reduce((acc, row) => {
            const subject = row.subject;
            if (!acc[subject]) {
                acc[subject] = { subject, tests: [] };
            }
            acc[subject].tests.push(row);
            return acc;
        }, {});

        res.status(200).json(Object.values(groupedSets));
    });
});

// GET route for fetching specific practice set details by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM practice_sets WHERE id = ?';

    db.query(selectQuery, [id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to fetch practice set details' });
        }
        if (results.length === 0) {
            console.error('Practice set not found for ID:', id);
            return res.status(404).json({ error: 'Practice set not found' });
        }
        res.status(200).json(results[0]);
    });
});

// POST route for submitting answers
router.post('/submit-answer', (req, res) => {
    const { testname, student_name, answer } = req.body;

    // Validate input
    if (!testname || !student_name || !answer) {
        console.error('Missing required fields:', { testname, student_name, answer });
        return res.status(400).json({ error: 'Testname, student_name, and answer are required' });
    }

    const insertQuery = 'INSERT INTO answers (testname, student_name, answer) VALUES (?, ?, ?)';
    db.query(insertQuery, [testname, student_name, answer], (err) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to submit answer' });
        }
        res.status(201).json({ message: 'Answer submitted successfully' });
    });
});

// GET route for fetching all practice sets for a specific teacher
router.get('/teacher/:username', (req, res) => {
    const { username } = req.params;

    const selectQuery = 'SELECT * FROM practice_sets WHERE username = ?';

    db.query(selectQuery, [username], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error for debugging
            return res.status(500).json({ error: 'Failed to fetch practice sets' });
        }
        res.status(200).json(results);
    });
});

// GET route for fetching student answers for a specific practice set by testname
router.get('/answers/:testname', (req, res) => {
    const { testname } = req.params;
    const selectQuery = 'SELECT student_name, answer FROM answers WHERE testname = ?';

    db.query(selectQuery, [testname], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to fetch answers' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;