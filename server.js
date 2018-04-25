const mongoose = require('mongoose');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Model = require('./model/Model');
const Routes = require('./routes/Routes');

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));

mongoose.connect('mongodb://localhost/bands', {}, err => {
  if (err) return console.log(err);
  console.log('DB Connection Achieved');
});

server.use('/api/bands', Routes);

const port = process.env.PORT || 6000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
