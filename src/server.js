const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const detectionRoutes = require('./routes/detection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
