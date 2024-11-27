const { query } = require('../config/database');

async function checkBlacklist(licensePlate) {
    const result = await query('SELECT * FROM blacklist WHERE license_plate = ?', [licensePlate]);
    return result.length > 0;
}

async function checkMembership(licensePlate) {
    const result = await query('SELECT * FROM members WHERE license_plate = ?', [licensePlate]);
    return result.length > 0;
}

module.exports = {
    checkBlacklist,
    checkMembership
};
