const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// create table for users
// structure: id, username, email, password, date
db.run(`
CREATE TABLE 
IF NOT EXISTS users 
    (user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT, 
    email TEXT, 
    password TEXT, 
    date TEXT)`);

// ! sessions handled by express-session & express-session-sqlite

// create table for posts
// structure: id, user_id, title, description, content (JSON), date, modified_date
db.run(`
CREATE TABLE
IF NOT EXISTS posts
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    content TEXT,
    date TEXT,
    modified_date TEXT)`);

// create table for ratings (0-5 stars)
// structure: id, user_id, post_id, rating
db.run(`
CREATE TABLE
IF NOT EXISTS ratings
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    post_id INTEGER,
    rating INTEGER)`);


module.exports = db;

// on exit close database
process.on('exit', function() {
    db.close();
})