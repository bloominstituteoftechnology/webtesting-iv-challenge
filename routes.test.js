const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('./server');
const Woof = require('./woofs/Woof');

chai.use(chaiHTTP);

describe('Woofs', () => {
  let woofId;

  before(done => {
    mongoose.connect('mongodb://localhost/test', {}, err => {
      if (err) return console.log(err);
      console.log('TEST DB Connection Achieved');
    });
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  beforeEach(() => {
    const newWoof = new Woof({
      user: 'james',
      message: 'critter, you are my favorite cat and i love you very much'
    });
    return newWoof
      .save()
      .then(savedWoof => {
        woofId = savedWoof._id.toString();
      });
  });
  
  afterEach(done => {
    Woof.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe(`[GET] /api/woofs`, () => {
    it('Returns the correct amount of woofs', function() {
        return chai.request(server)
            .get('/api/woofs')
            .then(function(woofs) {
                expect(woofs).to.have.status(200);
                expect(woofs).to.be.json;
                expect(woofs.body).to.have.length(1);
                expect(woofs.body[0]._id).to.equal(woofId);
            })
            .catch(function(err) {
                throw err;
            });
        });

        it('Returns a woof by id', function() {
            return chai.request(server)
                .get(`/api/woofs/${woofId}`)
                .then(function(res) {
                    expect(res).to.have.status(200);
                })
                .catch(function(err) {
                    throw err;
                });
            });
        });

    describe(`[POST] /api/woofs`, () => {
        it('Posts a woof', function() {
            const newWoof = {
                'user': 'sarah',
                'message': 'heeeeeyyyyy'
            } 

            return chai.request(server)
                .post('/api/woofs')
                .send({ ...newWoof })
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.user).to.equal(newWoof.user);
                    expect(res.body.message).to.equal(newWoof.message);
                    expect(res.body._id).to.be.string;
                    expect(res.body.Date).to.be.string;
                })
                .catch(function(err) {
                    throw err;
                });
            });
        });

    describe(`[PUT] /api/woofs/:id`, () => {
        it('Updates a woof', function() {
            return chai.request(server)
                .put(`/api/woofs/${woofId}`)
                .send({
                    user: 'sarah',
                    message: 'heeeeeeyyyyy'
                })
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                })
                .catch(function(err) {
                    throw err;
                });
            });
        });
    describe(`[DELETE] /api/woofs/:id`, () => {
        it('Deletes a woof', function() {
            return chai.request(server)
                .delete(`/api/woofs/${woofId}`)
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                })
                .catch(function(err) {
                    throw err;
                });
            });
        });
});