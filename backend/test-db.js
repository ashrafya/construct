// test-db.js
const { createDatabase, insertUser, getUserByEmail, deleteDatabase } = require('./db.js');

const DB_FILENAME = 'test.db';

// 1. Create database and initialize table
createDatabase(DB_FILENAME, (err, db) => {
    if (err) {
        console.error('Database creation failed:', err);
        return;
    }
    console.log('Database created');

    // 2. Insert a test user
    const testUser = {
        email: 'test@example.com',
        firstname: 'Nael',
        lastname: 'Ashraf',
        password: 'securepassword123',
        role: 'client'
    };

    insertUser(db, testUser.email, testUser.firstname, testUser.lastname, testUser.password, testUser.role, (err) => {
        if (err) {
            console.error('Insert failed:', err);
            db.close();
            return;
        }
        console.log('User inserted');

        // 3. Query user by email
        getUserByEmail(db, testUser.email, (err, rows) => {
            if (err) {
                console.error('Query failed:', err);
            } 
            else if (rows.length === 0) {
                console.log('User not found');
            } 
            else {
                console.log('Found user:', rows[0]);
            }
        
            // Close database connection
            db.close();
        });
    });
});

// // Delete database after closing
// deleteDatabase(DB_FILENAME, (err) => {
//     if (err) {
//         console.error('Failed to delete database:', err);
//     } else {
//         console.log('Database deleted');
//     }
// });