// load files from controllers folder
// TODO add controllers

// export the routes
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('Hello World!');
    });
}