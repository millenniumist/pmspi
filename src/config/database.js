const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./parking.db');

// Promisify database operations
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = {
    db,
    query
};
