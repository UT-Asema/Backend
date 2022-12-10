const crypto = require('crypto')
module.exports = {
  hashPassword: function (pass, salt) {
    let hash = crypto.createHash('sha256')
    hash.update(pass)
    hash.update(salt)
    return hash.digest('hex')
  },
  sleep: function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}