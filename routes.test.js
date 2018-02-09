const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/food-test', { useMongoClient: true });

const server = require('./server');
// require your models
const Food = require('./food');

describe(`food api`, () => {
  let foodId = '';
  //Everytime we run an it block we want to test the getter
  beforeEach(done => {
    const newFood = new Food({ title: 'Spaghetti' });
    newFood.save((err, savedFood) => { // we can hold on to a mongo id, it will give us the ability to test for a bad error
      if (err) {
        done();
      }
      foodId = savedFood._id;
      done(); // If we are not calling done, we will get burnt. Using done to get out of the block to move into the next it block.
    });
  });

  // Clears out our database after each call
  afterEach((done) => {
    Food.remove({}, err => {
      if (err) {
        done();
      }
      done();
    });
  });

  //Think of our test as a client and we will pull out information from our req.body.
  describe(`[POST] '/food'`, () => { // sending up the right data and fake data for post. // two conditions, one with aroniuos data and one with regular data.
    it('should add a food item to the food DB and handles an error with bad input data', (done) => {
      const foodToSave = {
        fda: 'Chicken Nuggets'
      };
      chai
        .request(server)
        .post('/food')
        .send(foodToSave) // We will be able to reference this through req.body on our server //It will be saved as a property on our req.body object.
        .end((err, res) => {
          if (err) {
            expect(err.response.body.err).to.equal('Food validation failed: title: Path `title` is required.');
            expect(err.status).to.equal(422);
            
            // return done(); // We are returning done() to be more explicit. It will stop the tests from running over.
            // return done() will move us down to the it.skip()
          }
          //What do we want our api to do? What are some things we want back? THe res is the response that we are getting back from our server.
          expect(res.body).to.be.an('object'); // type of data we are getting back from res.body <-- note that an array and null is also an object
          expect(res.status).to.equal(422);
          expect(res.body.title).to.equal(foodToSave.title);
          done();
        });
    });
  });

  describe(`[GET] '/food'`, () => {
    it('should return an array of objects', done => {
      chai
        .request(server)
        .get('/food')
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(500);
            done();
          }
          expect(res.status).to.equal(200); // Mongo will send back an array, Mongo is a collection of objects which is an array
          expect(Array.isArray(res.body)).to.equal(true); // to.be is more of a type checker
          expect(res.body.length).to.equal(1); // we can check the property, the type of object etc
          expect(res.body[0]).to.be.an('object');
          expect(foodId.toString()).to.equal(res.body[0]._id);
          done();
        });
    });
  });

  describe(`[DELETE] '/food/:id'`, () => {
    it('should delete an item from the DB', (done) => {
      chai
        .request(server)
        .delete(`/food/${foodId}`)
        .end((err, response) => {
          if (err) {
            expect(err.status).to.equal(404);
            done();
          }
          expect(response.text).to.equal('success');
          //delete request - do own delete to Food in here.. Food.remove({foodID}, (err, removedObj) => {})
        });
    });
  });
});



// 1) food api
// "after each" hook:
// Uncaught ReferenceError: done is not defined
// at chai.request.post.send.end (routes.test.js:51:13)
// at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)
// at node_modules\superagent\lib\node\index.js:795:18
// at IncomingMessage.<anonymous> (node_modules\superagent\lib\node\parsers\json.js:16:7)
// at endReadableNT (_stream_readable.js:974:12)
// at _combinedTickCallback (internal/process/next_tick.js:80:11)
// at process._tickCallback (internal/process/next_tick.js:104:9)
