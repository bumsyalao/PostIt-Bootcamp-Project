import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import routes from './server/routes/index';

const port = parseInt(process.env.PORT, 10) || 8000;
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

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to POSTIT',
}));

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`running server on port ${port}`);
});

module.exports = app;
