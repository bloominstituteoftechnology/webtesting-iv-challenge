const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const db = require('./data/db.js');
const charactersRouter = require('./characters/charactersRouter.js');
const filmsRouter = require('./films/filmsRouter.js');
const server = express();

mongoose
  .connect(db)
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.use('/api/characters', charactersRouter);
server.use('/api/films', filmsRouter);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
