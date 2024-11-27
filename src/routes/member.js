const express = require('express');
const router = express.Router();
const { createMember, getMember, updateMember } = require('../controllers/memberController');

router.post('/', createMember);
router.get('/:licensePlate', getMember);
router.put('/:licensePlate', updateMember);

module.exports = router;
