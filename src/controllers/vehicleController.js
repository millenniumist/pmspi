const db = require('../config/database');

async function processVehicle(licensePlate, direction) {
    // Check blacklist
    const isBlacklisted = await checkBlacklist(licensePlate);
    if (isBlacklisted) {
        return {
            success: false,
            message: 'Vehicle is blacklisted',
            access: 'denied'
        };
    }

    // Check if member
    const isMember = await checkMembership(licensePlate);
    
    if (direction === 'entry') {
        if (isMember) {
            return handleMemberEntry(licensePlate);
        } else {
            return handleVisitorEntry(licensePlate);
        }
    } else {
        if (isMember) {
            return handleMemberExit(licensePlate);
        } else {
            return handleVisitorExit(licensePlate);
        }
    }
}

module.exports = { processVehicle };
