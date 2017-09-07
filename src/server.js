const express = require('express');
const bodyParser = require('body-parser');
const Food = require('../models/food');

const server = express();
server.use(bodyParser.json());

const STATUS_USER_OK = 200;
const STATUS_USER_CREATED = 201;
const STATUS_USER_ERROR = 422;
// HTTP Method returns:
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
// HELPER FUNCTIONS
const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

// $ curl http://localhost:8080/food
server.get('/food', (request, response) => {
  // Model.find will always return an array
  Food.find({}, (err, food) => {
    if (err) return response.send(err);
    response.send(food);
  });
});

// $  curl -X POST -H "Content-Type: application/json" -d '{"name":"Hot Dog"}' localhost:8080/food
server.post('/food', (request, response) => {
  const food = new Food(request.body);
  // Promises & mongoose: http://mongoosejs.com/docs/promises.html
  food.save((err, newFood) => {
    if (err) return response.send(err);
    response.status(STATUS_USER_CREATED); // https://http.cat/201
    response.send(newFood);
  });
});

// $ curl -X PUT -H "Content-Type: application/json" -d '{"name":"Brussel Sprouts","reaction":"yuck"}' localhost:8080/food/reaction
// https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/
// server.put('/food', (request, response) => {
//   const { name, reaction } = request.body;
//   Food.findAndModify( // ~~~> NOT A FUNCTION ??????? WHY, WHY - WHY?????????????
//     { name },
//     { $set: reaction }, // https://stackoverflow.com/a/24648693/5225057
//     (err, food) => {
//       if (err) return response.send('POST Food.find()', err);
//       food.reaction = reaction;
//       response.status(200); // https://http.cat/200
//       response.send(food);
//     });
// });
// https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
server.put('/food', (request, response) => {
  const { name, reaction } = request.body;
  if (!reaction) {
    // response.json('WHAT THE FUCK?!?!?!?!?');
    sendUserError(`What the heck am I supposed to do with just ${name}?`, response);
    return;
  }
  Food.findOneAndUpdate(
    { name },
    { $set: { reaction } }, // It took me FOREVER to figure out this setting. MngoDB Docs are not, ah... terribly clear :_(
    (err, food) => {
      if (err) return response.send('POST Food.findOneAndUpdate()', err);
      food.reaction = reaction;
      response.status(STATUS_USER_OK); // https://http.cat/200
      response.send(food);
    });
});


// $ curl -X DELETE -H "Content-Type: application/json" -d '{"name":"Hot Dog"}' localhost:8080/food/
// https://docs.mongodb.com/manual/reference/method/db.collection.remove/
server.delete('/food', (request, response) => {
  const { name } = request.body;
  Food.remove({ name }, (err, removedStatus) => { // "The remove() returns an object that contains the status of the operation."
    if (err) return response.send('DELETE Food.remove()', err);
    response.status(STATUS_USER_OK);
    response.send(removedStatus);
  });
});


module.exports = server;
