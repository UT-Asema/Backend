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

// set up cors
app.use(cors())

// set up session
app.use(session({
  store: new SQLiteStore({ driver: sqlite3.Database, path: 'database.db', table: 'sessions' }),
  secret: 'a secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7,
    Secure: true,
    httpOnly: true,
    SameSite: "none"} // 1 week
}))

// setup cors to allow cross origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// set up routes
routes(app)

// set session to samesite none
app.use(function (req, res, next) {
  if (req.session) {
    // req.session.cookie.SameSite = 'none'
    // // set secure to false
    // req.session.cookie.secure = false
  }
  next()
})

// add Secure = true to end of Set-Cookie header
app.use(function (req, res, next) {
  if (req.session) {
    res.setHeader('Set-Cookie', res.getHeader('Set-Cookie') + '; Secure')
  }
  next();
})
app.listen(3000, function () {
  console.log('Listening on port 3000')
})