const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
const sinon = require('sinon');

const server = require('../server');
chai.use(chaihttp);

const Topping = require('../model');

describe('Server', () => {
    let fakeId;
    beforeEach((done) => {
      mongoose.connect('mongodb://localhost/punit');
      const db = mongoose.connection;
      db.on('error', () => {
        console.error('connection error');
        done();
      });
      db.once('open', () => {
          console.log('Topping those Pizzas!');
      });
      new Topping({
          name: 'test',
          category: 'vegetable'
      }).save((err, saved) => {
        if (err) {
            console.log(err);
            return done();
        }
        fakeId = saved._id;
        done();
        });
    });
    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('[POST] /api/topping', () => {
        it('should add a new topping', (done) => {
            const newTopping = {
                name: 'banana pepper',
                category: 'vegetable'
            };
            chai.request(server)
            .post('/api/topping')
            .send(newTopping)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('banana pepper');
            });
            done();
        });
    });

    describe('[GET] /api/toppings', () => {
        it('should return a list of all the toppings', (done) => {
            chai.request(server)
            .get('/api/toppings')
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
            });
            done();
        });
    });

    describe('[DELETE] /api/delete/:id', () => {
        console.log(fakeId);
        it('should delete a topping from the list', (done) => {
            chai.request(server)
            .delete(`/api/delete/${fakeId}`)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    done();
                }
                console.log(res);
                expect(res.status).to.equal(200);
                // expect(res.body.name).to.equal('test');
            });
            done();
        });
    });
});
