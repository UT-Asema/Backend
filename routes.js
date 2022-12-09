// load files from controllers folder
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');

// export the routes
module.exports = function(app) {
    for (let controller of [loginController, postController]) {
        for (let method in loginController) {
            for (let route in loginController[method]) {
                app[method]('/' + controller.path + route, loginController[method][route]);
            }
        }
    }
}