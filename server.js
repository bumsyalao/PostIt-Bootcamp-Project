import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';


const app = express();
app.use(bodyParser.json());
const compiler = webpack(config);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
});

app.listen(port, () => console.log(`Running server on port ${port}`));
