const crypto = require('crypto')
module.exports = {
  hashPassword: function (pass, salt) {
    let hash = crypto.createHash('sha256')
    hash.update(pass)
    hash.update(salt)
    return hash.digest('hex')
  },
  makeSalt: function () {
    return crypto.randomBytes(16).toString('hex')
  },
  sleep: function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  checkUser: function (username, password) {
    // get user from database
    let user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
    // if user exists
    if (user) {
      // hash password
      let hash = crypto.createHash('sha256')
      hash.update(password)
      hash.update(user.salt)
      // if password is correct
      if (hash.digest('hex') === user.password) {
        // return user
        return user
      } else {
        // return false
        return false
      }
    }
  }
}