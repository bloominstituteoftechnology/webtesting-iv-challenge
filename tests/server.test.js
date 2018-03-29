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

  describe('[GET] /weapons', () => {
    it('should get all weapons', done => {
      const karambit = {
        name: 'Karambit',
        description: 'Flays the flesh',
      };
      chai
        .request(server)
        .post('/weapons')
        .send(karambit)
        .get('/weapons')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          assert.isArray(res);
          assert.lengthOf(res, 2);
          assert.equal(res.length, 2);
          assert.equal(res[0].name, 'Knife');
          assert.equal(res[1].name, 'Karambit');
          done();
        });
    });
  });

  describe('[POST] /weapons', () => {
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
          assert.equal(res.body.name, 'Pencil');
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  describe('[DELETE] /weapons/:name', () => {
    it('should delete the specified weapon', done => {
      chai
        .request(server)
        .delete('/weapons/Knife')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.name, 'Knife');
          Weapon.findOne({ name: 'Knife' }, (err, weapon) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(weapon);
            done();
          });
        });
    });
  });

  describe('[PUT] /weapons/:name', () => {
    it('should update the specified weapon', done => {
      const updatedWeapon = {
        name: 'Beak',
        description: 'Bites the flesh',
      };

      chai
        .request(server)
        .put('/weapons/Knife')
        .send(updatedWeapon)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          assert.equal(res.body.name, 'Beak');
          Weapon.findOne({ name: 'Knife' }, (err, weapon) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(weapon);
            done();
          });
        });
    });
  });
});
