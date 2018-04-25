const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = express();
const Model = require('./model/Model');

server.use(bodyParser.json());
server.use(morgan('dev'));

mongoose.connect('mongodb://localhost/bands', {}, err => {
  if (err) return console.log(err);
  console.log('DB Connection Achieved');
});

const Routes = require('./routes/Routes');
server.use('/api/bands', Routes);

const port = process.env.PORT || 6000;
server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on ${port}`);
});
