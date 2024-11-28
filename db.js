const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '34.69.212.53',
    port: '3306',
    user: 'root',
    password: 'se4458midterm',
    database: 'airplane',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
