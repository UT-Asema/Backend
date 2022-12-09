const express = require('express');
const app = express();

// require routes
const routes = require('./routes');

// set up routes
routes(app);