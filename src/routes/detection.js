const express = require('express');
const router = express.Router();

router.post('/plate-detected', async (req, res) => {
    const { license_plate, direction } = req.body;
    
    // Validate input
    if (!license_plate || !direction) {
        return res.status(400).json({
            success: false,
            message: 'License plate and direction are required'
        });
    }

    // Validate direction
    if (!['entry', 'exit'].includes(direction)) {
        return res.status(400).json({
            success: false,
            message: 'Direction must be either "entry" or "exit"'
        });
    }

    try {
        // Process the plate detection
        const result = await processVehicle(license_plate, direction);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
