const db = require('../config/database');

async function addToBlacklist(licensePlate) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO blacklist (license_plate) VALUES (?)';
        db.run(query, [licensePlate], function(err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    resolve({
                        success: false,
                        message: 'Vehicle already blacklisted'
                    });
                }
                reject(err);
            }
            resolve({
                success: true,
                id: this.lastID,
                message: 'Vehicle added to blacklist'
            });
        });
    });
}

async function removeFromBlacklist(licensePlate) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM blacklist WHERE license_plate = ?';
        db.run(query, [licensePlate], function(err) {
            if (err) reject(err);
            if (this.changes === 0) {
                resolve({
                    success: false,
                    message: 'Vehicle not found in blacklist'
                });
            }
            resolve({
                success: true,
                message: 'Vehicle removed from blacklist'
            });
        });
    });
}

async function getBlacklist() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM blacklist ORDER BY added_at DESC';
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    addToBlacklist,
    removeFromBlacklist,
    getBlacklist
};
