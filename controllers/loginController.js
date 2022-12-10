// dotenv config
require('dotenv').config()

const path = require('path'),
  utils = require('../utils');

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
    }
  },
  post: {
    password: function (req, res) {
      passport.authenticate('local', {
        // successRedirect: '/',
        // failureRedirect: '/login',
        failureFlash: true,
        failureMessage: 'Invalid username or password',
        successMessage: 'Logged in'
      })(req, res, function next(err) {
        console.log(err)
        if (err) {
          res.status(401).send(err.message)
        } else {
          res.status(200).send('Logged in')
        }
      })
    },
    register: function (req, res) {
      // check for mandatory fields
      if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send('Missing fields' + req.body.username + req.body.password + req.body.email)
        return;
      }
      // register user
      let user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username)
      if (user) {
        res.status(201).send('Username already exists')
      } else {
        // create user
        db.prepare('INSERT INTO users (username, email, password, date) VALUES (?, ?, ?, ?)').run(req.body.username, req.body.email, req.body.password, new Date().toISOString())
        res.status(200).send('User created')
      }
    },
    logout: function (req, res) {
      // check if user exists

    },
  },
  put: {},
  delete: {},
}