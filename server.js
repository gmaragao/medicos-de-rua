const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./src/app/config/config');
const mongoose = require('mongoose');
const port = 3000;

config(app, express, bodyParser, mongoose);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
