const db = require('../config/database');

exports.createMember = async function(req, res) {
    try {
        const { name, licensePlate, contactInfo, membershipType } = req.body;
        const result = await new Promise((resolve, reject) => {
            const query = `INSERT INTO members (name, license_plate, contact_info, membership_type) 
                          VALUES (?, ?, ?, ?)`;
            db.run(query, [name, licensePlate, contactInfo, membershipType], function(err) {
                if (err) reject(err);
                resolve({
                    success: true,
                    id: this.lastID,
                    message: 'Member created successfully'
                });
            });
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getMember = async function(req, res) {
    try {
        const { licensePlate } = req.params;
        
        if (!licensePlate) {
            return res.status(400).json({ 
                success: false,
                message: 'License plate is required'
            });
        }

        const member = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM members WHERE license_plate = ?';
            db.get(query, [licensePlate], (err, row) => {
                if (err) reject(err);
                if (!row) {
                    resolve(null);
                }
                resolve(row);
            });
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: member
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: error.message 
        });
    }
}


exports.updateMember = async function(req, res) {
    try {
        const { licensePlate } = req.params;
        const updates = req.body;
        const result = await new Promise((resolve, reject) => {
            const query = `UPDATE members 
                          SET name = ?, contact_info = ?, membership_type = ? 
                          WHERE license_plate = ?`;
            db.run(query, 
                [updates.name, updates.contactInfo, updates.membershipType, licensePlate], 
                function(err) {
                    if (err) reject(err);
                    resolve({
                        success: true,
                        message: 'Member updated successfully'
                    });
            });
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
