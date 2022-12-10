// html server
const express = require('express'),
  session = require('express-session'),
  sqlite3 = require('sqlite3').verbose(),
  sqliteStoreFactory = require('express-session-sqlite'),
  SqliteStore = sqliteStoreFactory.default(session),
  app = express()

// set up password for login with google
const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy
  // keys = require('./config/keys')

// set up database
global.db = require('./controllers/database')

// set up session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secretThatIsVerySecret',
  store: new SqliteStore({
    driver: sqlite3.Database,
    path: 'database.db',
    table: 'sessions',
    cookie: { maxAge: 60000 }
  })
}))

// set up passport
app.use(passport.initialize())

// set up passport session
app.use(passport.session())

passport.deserializeUser(function (obj, done) {
  // fetch from databse the userData that we need based on the serialized ID
  done(null, obj)
})

passport.serializeUser(function (user, done) {
  console.log('serialized')
  // we need to only serialize the databse userID of the user
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  // fetch from databse the userData that we need based on the serialized ID
  done(null, obj)
})

// passport.use(
//   new GoogleStrategy( )
// )

// set up routes
require('./routes')(app)

// start server
app.listen(3000, function () {
  console.log('Listening on port 3000')
})

// websocket server
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })

  ws.send('something')
})

