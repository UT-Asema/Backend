const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// create table for users
// structure: id, username, email, password, date
db.run(`
CREATE TABLE 
IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT, 
    email TEXT, 
    password TEXT, 
    date TEXT)`);

// create table for sessions
// structure: id, secret, user_id, date_expires
db.run(`
CREATE TABLE
IF NOT EXISTS sessions
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    secret TEXT,
    user_id INTEGER,
    date_expires TEXT)`);

// create table for posts
// structure: id, user_id, title, content, date, modified_date
db.run(`
CREATE TABLE
IF NOT EXISTS posts
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
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