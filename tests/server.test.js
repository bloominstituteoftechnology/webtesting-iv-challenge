const mongoose = require('mongoose');
const chaihttp = require('chai-http');
const chai = require('chai');
const { assert, expect } = chai;
const sinon = require('sinon');

const server = require('../server');
const Weapon = require('../models/WeaponsModel');

chai.use(chaihttp);

describe('server.js', () => {
  
  before(done => {
    console.log('before');
    mongoose.connect('mongodb://localhost/test');
    const dbase = mongoose.connection; 
    dbase.on('error', () => {
      console.error('connection error');
    });
    dbase.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    console.log('after');
    mongoose.connection.db.dropDatabase(() => {
      console.log('inside .dropDatabase()');
      mongoose.connection.close(done);
    });
  });

  describe('[Post] /weapons', () => {
    it('should add a new weapon', done => {
      const knife = {
        name: 'Knife',
        description: 'Stabs the flesh',
      };
      //const newWeapon = new Weapon(knife);
      chai
        .request(server)
        .post('/weapons')
        .send(knife)
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done();
          }
          expect(res.status).to.equal(200);
         /* expect.equal(res.status, 200);*/
         expect(res.body.name).to.equal('Knife');
         // expect.equal(res.body.name, 'Knife');
          done();
        });
     // done();
    });
  });
  // describe('[PUT] /weapons', () => {
  //   it('should edit an existing weapon', done => {
  //     const knife = {
  //       name: 'Knife',
  //       description: 'Stabs the flesh',
  //     };
  //     const newWeapon = new Weapon(knife);
  //     chai
  //       .request(server)
  //       .post('/weapons')
  //       .send(newWeapon)
  //       .end((err, res) => {
  //         if (err) {
  //           console.error(err);
  //           done();
  //         }
  //         assert.equal(res.status, 200);
  //         assert.equal(res.body.name, 'Knife');
  //       });
  //     done();
  //   });
  // });
  // describe('[DELETE] /weapons/:name', () => {
  //   it('should add a new weapon', done => {
  //     const knife = {
  //       name: 'Knife',
  //       description: 'Stabs the flesh',
  //     };
  //     const newWeapon = new Weapon(knife);
  //     chai
  //       .request(server)
  //       .post('/weapons')
  //       .send(newWeapon)
  //       .delete('/weapons/:name')
  //       .send(weapon)
  //       .end((err, res) => {
  //         if (err) {
  //           console.error(err);
  //           done();
  //         }
  //         assert.equal(res.status, 200);
  //         assert.equal(res.body.name, 'Knife');
  //       });
  //     done();
  //   });
  // });
});
