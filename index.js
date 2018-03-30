const server = require('./server');
const port = 3030;
// const mongoose = require('mongoose');

// //addeds mongoose
// mongoose.connect('mongodb://localhost/teams');

server.listen(port, () => {
  console.log(`Magic is happening on port ${port}`);
});
