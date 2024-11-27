const express = require('express');
const router = express.Router();
const { addToBlacklist, removeFromBlacklist, getBlacklist } = require('../controllers/blacklistController');

router.post('/', async (req, res) => {
    try {
        const { license_plate } = req.body;
        if (!license_plate) {
            return res.status(400).json({
                success: false,
                message: 'License plate is required'
            });
        }
        const result = await addToBlacklist(license_plate);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:licensePlate', async (req, res) => {
    try {
        const result = await removeFromBlacklist(req.params.licensePlate);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const blacklist = await getBlacklist();
        res.json({
            success: true,
            data: blacklist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
