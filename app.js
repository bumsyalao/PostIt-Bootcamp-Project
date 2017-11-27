const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes/index');

const port = parseInt(process.env.PORT, 10) || 3000;
const homepage = `${__dirname}/client/index.html`;
// Set up the express app
const app = express();

app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Require our routes into the application.

routes(app);

module.exports = app;
