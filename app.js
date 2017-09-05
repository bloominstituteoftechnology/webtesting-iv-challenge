const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/food', {}, (err) => {
  if (err) return console.log(err);
  console.log('You are connected to the food DataBase');
});

server.listen(8080, () => {
  console.log("Ye ol' server is listening on port 8080, me boy-o!");
});
