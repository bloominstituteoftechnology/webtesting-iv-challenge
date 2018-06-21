const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const friendController = require('./friends/friendController');
const db = require('./data/db.js');
const server = express();

mongoose
  .connect(db)
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.use('/api/friends', friendController);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
