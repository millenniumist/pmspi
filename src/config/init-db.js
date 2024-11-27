const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./parking.db');

db.serialize(() => {
    // Members table
    db.run(`CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        license_plate TEXT UNIQUE NOT NULL,
        contact_info TEXT,
        membership_type TEXT,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Visitors table
    db.run(`CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        license_plate TEXT NOT NULL,
        entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        exit_time DATETIME,
        charges REAL
    )`);

    // Blacklist table
    db.run(`CREATE TABLE IF NOT EXISTS blacklist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        license_plate TEXT UNIQUE NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS parking_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        license_plate TEXT NOT NULL,
        entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        exit_time DATETIME,
        member_type TEXT NOT NULL,
        FOREIGN KEY (license_plate) REFERENCES members(license_plate)
    )`);
});

db.close();
