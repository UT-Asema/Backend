// html server
let express = require('express'),
  sqlite3 = require('sqlite3').verbose(),
  app = express(),
  session = require('express-session'),
  SQLiteStore = require('express-session-sqlite').default(session),
  routes = require('./routes'),
  path = require('path'),
  utils = require('./utils')

global.db = require('./controllers/database')

// set up session
app.use(session({
  store: new SQLiteStore({ driver: sqlite3.Database, path: 'database.db', table: 'sessions' }),
  secret: 'a secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
}))

// set up routes
routes(app)

// passport
global.passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

// passport config
passport.use('local', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
  function (req, username, password, done) {
    // get user from database
    let user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
    console.log('\'' + username + '\'' + ' ' + password)

    console.log(user)
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }

    console.log('utils')
    // check password
    if (utils.hashPassword(password, user.salt) !== user.password) {
      return done(null, false, { message: 'Incorrect password.' })
    }

    console.log('done')

    req.user = user
    // return user
    return done(null, user)
  })
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// set up routes
routes(app)

// start server
app.listen(3000, function () {
  console.log('Listening on port 3000')
})

// serve login form
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/login.html'))
})