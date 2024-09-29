// backend/setup.js
const db = require('./config/db');
const bcrypt = require('bcrypt');

const defaultUsers = [
    { username: 'mcq', password: '1024', user_type: 'teacher' },
    { username: 'zhuyiren', password: 'nico1', user_type: 'student' }
];

const checkUserExists = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

const insertDefaultUsers = async () => {
    for (const user of defaultUsers) {
        const exists = await checkUserExists(user.username);
        if (exists) {
            console.log(`User ${user.username} already exists. Skipping.`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        db.query('INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)', 
            [user.username, hashedPassword, user.user_type], 
            (err) => {
                if (err) {
                    console.error(`Error inserting user ${user.username}:`, err);
                } else {
                    console.log(`Inserted user: ${user.username}`);
                }
            }
        );
    }

    db.end();  // Close connection after inserting
};

insertDefaultUsers().catch(console.error);