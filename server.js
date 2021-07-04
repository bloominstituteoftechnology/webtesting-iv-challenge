const express = require('express');
const server = express();
const PORT = 3003;
server.use(express.json());

let books = ['Lord of the Rings'];

server.get('/', (req, res) => {
  res.status(200).json({ server: 'running' });
});

server.get('/books', (req, res) => {
  res.status(200).json({ books });
});

server.post('/books', (req, res) => {
  const { book } = req.body;
  books.push(book);
  res.status(200).json({ books });
});

server.delete('/books', (req, res) => {
  const { book } = req.body;
  const newArr = books.filter(b => b != book);
  books = newArr;
  res.status(200).json({ books });
});

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

if (true) {
  module.exports = server;
} else {
  server.listen(
    PORT,
    console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
  );
}
