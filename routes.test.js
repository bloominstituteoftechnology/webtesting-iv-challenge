const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/food-test', { useMongoClient: true });

const server = require('./server');
const Recipe = require('./recipemodel');

describe(`recipe api`, () => {
  beforeEach(() => {
    const newRecipe = new Recipe({
      title: "Pepperoni Pizza",
      text: "Crust, White Sauce, Cheese, Pepperoni",
      rating: 1
    });
    newRecipe.save();
  });
  afterEach(() => {
    Recipe.remove({}, (err) => {
      done();
    });
  });

  describe(`[GET] '/recipes/Pepperoni%20Pizza'`, () => {});
    it('Should return the recipe object', done => {
      chai
        .request(server)
        .get('/recipes/Pepperoni%20Pizza')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Pepperoni Pizza');
          done();
        })
    })
})