const mongoose = require('mongoose');

const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);


describe("Server", () => {
    before(done => {
      mongoose.connect("mongodb://localhost/users");
      const db = mongoose.connection;
      db.on("error", () => {
        console.error("Error, failed connection to database");
      });
      db.once("open", () => {
        console.log("It's connected");
        done();
      });
    });
    after(done => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
      });
    });
    describe(`[POST] /users`, () => {
        it("should add a new user", done => {
          const User = {
            name: "Max",
            location: "youcantcme"
          };
          chai
            .request(server)
            .post(`/users`)
            .send(User)
            .end((err, res) => {
              if (err) {
                console.error(err);
                done();
              }
              expect(res.status).to.equal(200);
              expect(res.body.name).to.equal("Max");
              done();
            });
        });
    });
    describe('[GET] /users', () => {
      it('should retrieve all of the users', (done) => {
        chai.request(server)
          .get('/users')
          .end((err, res) => {
            if (err) return console.log(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(1);
            done();
          });
      });
    });
    describe('[POST] /users', () => {
      it('should add a new user', (done) => {
        const user = {
          name: 'Jeff'
        };
        chai.request(server)
          .post('/users')
          .send(user)
          .end((err, res) => {
            if (err) return console.log(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Jeff');
            done();
          });
      });
    });
    describe('[DELETE] /users/:id', () => {
      it('should delete a user', (done) => {
          const user = {
              name: 'Anders',
              location: 'Hawaiiii'
          }
          chai.request(server)
          .get('/users')
          .end((err, res) => {
              chai.request(server)
              .delete('/jobs/'  + res.body[0]._id)
              .end((err, res) => {
                  if(err) console.log(err);
                  expect(res.status).to.equal(200);
                  expect(res.body).to.be.a('object');
                  expect(res.body.value).to.equal('undefined');
              });
              done();
          })
      })
  })
});