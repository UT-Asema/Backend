// handle login routes
module.exports = {
  path: 'auth/',
  get: {},
  post: {
    login: function (req, res) {
      // using passport to authenticate either google or local
      // if google
      passport.authenticate('google', { scope: ['profile'] })(req, res)
      // if local
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res)
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