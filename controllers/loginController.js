// import database
const db = require('../controllers/database')

// handle login routes
module.exports = {
  path: 'auth/',
  get: {},
  post: {
    login: function (req, res) {
      // check if session exists
      // check if login is valid
      // login user
      // redirect to home
    },
    register: function (req, res) {
      // check if user exists

    },
    logout: function (req, res) {
      // check if user exists

    },
  },
  put: {
    update: function (req, res) {
      // check if user exists

    },
  },
  delete: {
    delete: function (req, res) {
      // check if user exists

    }
  },
}