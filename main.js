const express = require('express');
const app = express();

// require routes
const routes = require('./routes');

// set up routes
routes(app);

// start server
app.listen(3000, function() {
    console.log('Listening on port 3000');
})