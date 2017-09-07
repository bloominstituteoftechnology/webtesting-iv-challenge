const mongoose = require('mongoose');
const Food = require('./food');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');

// mongoose.connect('mongodb://localhost/test'); // ~~~> , { useMongoClient: true }, (err) => {...} ???
/* eslint no-console: 0 */
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, (err) => {
  if (err) return console.log(err);
  console.log('DUDE! You are like totally connected to the TEST DataBase, man!');
});
// added to use npm run watch, not sure if this is the best practice?
mongoose.models = {};
mongoose.modelSchemas = {};
// Promises & mongoose: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const expect = chai.expect;
chai.use(chaiHTTP);

describe('/food', () => {
  beforeEach((done) => {
    // beforeEach "hook" clears out db prior to each test, asynchronously with "done"
    // "Food.remove(...)" is asynchronous
    Food.remove({}, (err) => {
      if (err) console.log('Something went wrong!', err);
      done();
    });
  });

  describe('[GET] /food', () => {
    it('should GET all the Food', (done) => {
      chai.request(server)
        .get('/food')
        .end((err, res) => {
          if (err) return console.log('Ummm, go GET Hume\'s Guillotine?\n', err.response.error);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe('[POST] /food', () => {
    it('should ADD a new Food', (done) => {
      const food = {
        name: 'Pizza'
      };
      chai.request(server)
        .post('/food')
        .send(food)
        .end((err, res) => {
          if (err) return console.log('Like your head POST-Hume\'s Guillotine\n', err.response.error);
          expect(res.status).to.equal(201); // https://http.cat/201
          expect(res.body.name).to.equal('Pizza');
          done();
        });
    });
  });

  // describe('[PUT] /food', () => {
  //   it('should MODIFY an existing Food item', (done) => {
  //     const food = {
  //       name: 'Pizza'
  //     };
  //     const update = {
  //       newName: 'Hot Dog',
  //       oldName: 'Pizza'
  //     };
  //     chai.request(server)
  //       .post('/food')
  //       .send(food)
  //       .end((err, res) => {
  //         if (err) return console.log('PUTs POST setup: like your head POST-Hume\'s Guillotine\n', err.response.error);
  //         // expect(res.status).to.equal(201); // https://http.cat/201
  //         // expect(res.body.name).to.equal('Pizza');
  //         // done();
  //       });
  //     chai.request(server)
  //       .put('/food')
  //       .send(update)
  //       .end((err, res) => {
  //         console.log('From Test', res.body);
  //         if (err) return console.log('PUT action: like your head POST-Hume\'s Guillotine\n', err.response.error);
  //         expect(res.status).to.equal(202); // https://http.cat/202
  //         expect(res.body.name).to.equal('Hot Dog');
  //         done();
  //       });
  //   });
  // });
});
