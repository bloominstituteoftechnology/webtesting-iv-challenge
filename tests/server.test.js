const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
const sinon = require('sinon');

const server = require('../server');
chai.use(chaihttp);

const Topping = require('../model');

describe('Server', () => {
    before((done) => {
      mongoose.connect('mongodb://localhost/punit');
      const db = mongoose.connection;
      db.on('error', () => {
        console.error('connection error');
      });
      db.once('open', () => {
          console.log('Topping those Pizzas!');
          done();
      });
    });
    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('[POST] /topping', () => {
        it('should add a new topping', (done) => {
            const newTopping = {
                name: 'banana pepper',
                category: 'vegetable'
            };
            chai.request(server)
            .post('/api/topping')
            .send(newTopping,
                console.log(newTopping)
            )
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('banana pepper')
            });
            done();
        });
    });
});
