const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const detectionRoutes = require('./routes/detection');
const monitoringRoutes = require('./routes/monitoring');
const memberRoutes = require('./routes/member');
const blacklistRoutes = require('./routes/blacklist');
require('events').EventEmitter.defaultMaxListeners = 15;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Add this line for request logging
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('./parking.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Basic routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', detectionRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
