const mongoose = require('mongoose');
const server = require('./api/server');

const port = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost/books')
  .then(conn => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed');
  });

server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});