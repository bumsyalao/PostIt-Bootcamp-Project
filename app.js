import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/index';

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
