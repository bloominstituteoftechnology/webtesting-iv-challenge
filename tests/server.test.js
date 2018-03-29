const mongoose = require('mongoose');
const chaihttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;
const sinon = require('sinon');

const server = require('../server');
const Weapon = require('../models/WeaponsModel');

mongoose
  .connect('mongodb://localhost/test')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

chai.use(chaihttp);

describe('server.js', () => {
  beforeEach(done => {
    const knife = {
      name: 'Knife',
      description: 'Stabs the flesh',
    };
    const weapon = new Weapon(knife);
    weapon.save((err, savedWeapon) => {
      if (err) {
        console.log(err);
        return done();
      }
      done();
    });
  });

  afterEach(done => {
    Weapon.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[Post] /weapons', () => {
    it('should add a new weapon', done => {
      const pencil = {
        name: 'Pencil',
        description: 'Pokes the flesh',
      };

      chai
        .request(server)
        .post('/weapons')
        .send(pencil)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          assert.equal(res.body.name, 'Pencil');
          done();
        });
    });
  });

  describe('[Delete] /weapons/:name', () => {
    it('should delete the specified weapon', done => {
      chai
        .request(server)
        .delete('/weapons/Knife')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          Weapon.findOne({ name: 'Knife' })
            .then(weapon => assert.notExists(weapon))
            .catch(err => res.json(err));
          assert.equal(res.body.name, 'Knife');
          done();
        });
    });
    it('should send back the deleted weapon', done => {
      chai
        .request(server)
        .delete('/weapons/Knife')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.name, 'Knife');
          done();
        });
    });
  });
});
