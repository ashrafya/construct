// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
let sql;

/**
 * Helper to open a database with a given filename.
 * @param {string} filename - Path to the SQLite database file.
 * @returns {sqlite3.Database}
 */
function openDatabase(filename) {
    return new sqlite3.Database(filename, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        }
    });
}

/**
 * Insert a user into the users table.
 * @param {sqlite3.Database} db - The database instance.
 * @param {string} email
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} password
 * @param {string} role
 * @param {function} callback - Callback with (err)
 */
function insertUser(db, email, firstname, lastname, password, role, callback) {
    const sql = `INSERT INTO users (email, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [email, firstname, lastname, password, role], callback);
}

/**
 * Query users by email.
 * @param {sqlite3.Database} db
 * @param {string} email
 * @param {function} callback - Callback with (err, rows)
 */
function getUserByEmail(db, email, callback) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.all(sql, [email], callback);
}

/**
 * Create a new SQLite database file and initialize the users table.
 * @param {string} filename - Path to the SQLite database file.
 * @param {function} callback - Callback with (err, db)
 */
function createDatabase(filename, callback) {
    const db = new sqlite3.Database(filename, (err) => {
        if (err) {
            return callback(err);
        }
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT CHECK(role IN ('consultant','contractor','client')) NOT NULL
            )
        `, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, db);
        });
    });
}

/**
 * Delete the SQLite database file.
 * @param {string} filename - Path to the SQLite database file.
 * @param {function} callback - Callback with (err)
 */
function deleteDatabase(filename, callback) {
    fs.unlink(filename, callback);
}

module.exports = {
    openDatabase,
    insertUser,
    getUserByEmail,
    createDatabase,
    deleteDatabase
};