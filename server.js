const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const db = require('./data/db.js');
const server = express();
const Films = require('./filmSchema.js');

mongoose
  .connect(db)
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => res.send('API Running...'));

server.post('/films', (req, res) => {
  const newFilm = req.body
  console.log(newFilm)
  Films.create(newFilm)
    .then(response => res.status(201).json({ data: response }))
    .catch(err => res.status(500).json({ data: err }))
})

// server.delete('/films/:id', (req, res) => {
//   Films.find({ _id: req.params.id })
//     .then(response => res.status(200).json({ data: response }))
//     .catch(err => res.status(500).json({ data: err }))
// })

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () =>
    console.log(`\n\nAPI running on http://localhost:${port}`)
  );
}

module.exports = server
