// html server
let express = require('express'),
  sqlite3 = require('sqlite3').verbose(),
  app = express(),
  session = require('express-session'),
  SQLiteStore = require('express-session-sqlite').default(session),
  routes = require('./routes'),
  path = require('path'),
  utils = require('./utils'),
  cors = require('cors')

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
let LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth20').Strategy

// passport config for local strategy
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

// set up passport for google oauth2
// passport.use('google',
//   new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/callback"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     // add user to database if not already there
//     let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(profile.id)
//     if (!user) {
//       db.prepare('INSERT INTO users (google_id, username, email) VALUES (?, ?, ?)').run(profile.id, profile.displayName.split(/\s\s+/g).join("")/* removing white space */ + "#" + profile.id, profile.emails[0].value)
//       user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(profile.id)
//     }
//
//     // return user
//     console.log(user)
//     return cb(null, user)
//   }
// ))

// set up other passport stuff I don't understand
app.use(passport.initialize({}))
app.use(passport.session({ secret: 'a secret' }))

// set headers
app.use(function (req, res, next) {
  res.header("Referrer-Policy", "no-referrer");
})


app.use(cors())

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