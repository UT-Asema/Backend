const bettersqlite = require('better-sqlite3');
const db = new bettersqlite('database.db');

// create table for users
// structure: id, username, email, password, salt, date
db.prepare('CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, google_id INTEGER, username TEXT UNIQUE, email TEXT, password TEXT, salt TEXT, date TEXT)').run();

// ! sessions handled by express-session & express-session-sqlite

// create table for posts
// structure: id, user_id, title, description, content (JSON), date, modified_date
db.prepare('CREATE TABLE IF NOT EXISTS posts (post_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, description TEXT, content TEXT, date TEXT, modified_date TEXT)').run();

// create table for ratings (0-5 stars)
// structure: id, user_id, post_id, rating
db.prepare('CREATE TABLE IF NOT EXISTS ratings (rating_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, post_id INTEGER, rating INTEGER)').run();

module.exports = db;

// on exit close database
// process.on('exit', function () {
//     db.close();
// });