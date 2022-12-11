// required imports
const bodyParser = require('body-parser'),
  urlencodedParser = bodyParser.urlencoded({ extended: false })

// load files from controllers folder
const loginController = require('./controllers/loginController')
const postController = require('./controllers/postController')
const cors = require('cors')

// export the routes
module.exports = function (app) {
  app.use(cors({credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: true, optionsSuccessStatus: 200}))
  // for each controller
  for (let controller of [loginController, postController]) {
    // for each method
    for (let method in controller) {
      // for each route
      for (let route in controller[method]) {
        // get the path from the controller and route name and method
        app[method]('/' + controller.path + route, urlencodedParser,
          ( req, res, next ) =>
          {
            res.header('Access-Control-Allow-Origin', req.headers.origin)
            controller[method][route](req, res)
          }
        )
      }
    }
  }
}