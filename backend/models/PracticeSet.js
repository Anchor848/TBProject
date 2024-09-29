const db = require('../config/db');  // Import the database connection

// Function to insert a new practice set
const createPracticeSet = (data, callback) => {
    const { subject, maxMark, fileName } = data;
    const sql = 'INSERT INTO practice_sets (subject, maxMark, fileName) VALUES (?, ?, ?)';
    
    db.query(sql, [subject, maxMark, fileName], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Function to fetch all practice sets
const getAllPracticeSets = (callback) => {
    const sql = 'SELECT * FROM practice_sets';
    
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = {
    createPracticeSet,
    getAllPracticeSets,
};