// dotenv config
require('dotenv').config()

const path = require('path'),
  utils = require('../utils')

// handle login routes
module.exports = {
  path: 'auth/',
  get: {
    'check': (req, res) => {
      if (req.user) {
        res.status(200).send(req.user)
      } else {
        res.status(401).send('Not logged in')
      }
    },
    'login': (req, res) => {
      res.sendFile(path.join(__dirname + '../..' + '/login.html'))
    },
  },
  post: {
    'login': function (req, res) {
      // get username and password from body
      let username = req.body.username
      let password = req.body.password

      // check if username and password are valid
      let user = utils.checkUser(username, password)

      // if user is valid
      if (user) {
        // set session user to user
        req.session.user = user
        // send user
        res.status(200).send(user)
      } else {
        // send error
        res.status(401).send('Invalid username or password')
      }
    },
    'register': function (req, res) {
      // check for mandatory fields
      if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send('Missing fields' + req.body.username + req.body.password + req.body.email)
        return
      }
      // register user
      let user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username)
      if (user) {
        res.status(201).send('Username already exists')
      } else {
        // make salt
        let salt = utils.makeSalt()
        // hash password
        let password = utils.hashPassword(req.body.password, salt)
        // create user
        db.prepare('INSERT INTO users (username, email, password, salt, date) VALUES (?, ?, ?, ?, ?)').run(req.body.username, req.body.email, password, salt, Date.now())
        res.status(200).send('User created')
      }
    },
    'logout': function (req, res) {
      // check if user exists
      if (req.user) {
        req.logout()
        res.status(200).send('Logged out')
      }
    },
    'delete': function (req, res) {
      // check if user exists
      if (req.user) {
        // delete user
        db.prepare('DELETE FROM users WHERE user_id = ?').run(req.user.user_id)
        res.status(200).send('User deleted')
      }
    }
  },
  put: {},
  delete: {},
}