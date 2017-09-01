const path = require('path');
const express = require('express');
const compression = require('compression');
const app = require('./app');


const port = process.env.PORT || 3000;

// let app = express();

app.use(compression());
app.use(express.static('dist'));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(port, () => console.log(`Running server on port ${port}`));
