const express = require('express');
const router = express.Router();
const { getSystemStatus } = require('../controllers/monitoringController');

router.get('/status', async (req, res) => {
    try {
        const status = await getSystemStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
