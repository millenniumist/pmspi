const db = require('../config/database');
const { query } = require('../config/database');

async function handleMemberEntry(licensePlate) {
    const timestamp = new Date();
    await query('INSERT INTO parking_sessions (license_plate, entry_time, member_type) VALUES (?, ?, "member")', [licensePlate, timestamp]);
    
    return {
        success: true,
        message: 'Member entry recorded',
        access: 'granted',
        timestamp
    };
}

async function handleVisitorEntry(licensePlate) {
    const timestamp = new Date();
    const query = 'INSERT INTO parking_sessions (license_plate, entry_time, member_type) VALUES (?, ?, "visitor")';
    await query(query, [licensePlate, timestamp]);
    
    return {
        success: true,
        message: 'Visitor entry recorded',
        access: 'granted',
        timestamp
    };
}

async function handleMemberExit(licensePlate) {
    const timestamp = new Date();
    const query = 'UPDATE parking_sessions SET exit_time = ? WHERE license_plate = ? AND exit_time IS NULL';
    await db.query(query, [timestamp, licensePlate]);
    
    return {
        success: true,
        message: 'Member exit recorded',
        timestamp
    };
}

async function handleVisitorExit(licensePlate) {
    const timestamp = new Date();
    const query = `
        UPDATE parking_sessions 
        SET exit_time = ? 
        WHERE license_plate = ? AND exit_time IS NULL
        RETURNING entry_time
    `;
    const [session] = await db.query(query, [timestamp, licensePlate]);
    
    // Calculate parking fee
    const parkingFee = calculateParkingFee(session.entry_time, timestamp);
    
    return {
        success: true,
        message: 'Visitor exit recorded',
        parkingFee,
        timestamp
    };
}

function calculateParkingFee(entryTime, exitTime) {
    const hours = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60));
    const baseRate = 10; // $10 per hour
    return hours * baseRate;
}

module.exports = {
    handleMemberEntry,
    handleVisitorEntry,
    handleMemberExit,
    handleVisitorExit
};
