const mongoose = require("mongoose");

const chai = require("chai");
const chaihttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;

const server = require("./server");
const User = require("./users");
chai.use(chaihttp);

describe("Server", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/test");
    const db = mongoose.connection;
    db.on("error", () => {
      console.error("Wow! Really? What an idiot. WRONG!");
    });
    db.once("open", () => {
      console.log("It's connected like a bawwss");
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
      const newUser = {
        name: "Romeo",
        location: "Paris"
      };
      chai
        .request(server)
        .post(`/users`)
        .send(newUser)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal("Romeo");
          done();
        });
    });
  });
  describe(`[GET] /users`, () => {
    it("should return the users", done => {
      chai
        .request(server)
        .get(`/users`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].name).to.equal("Romeo");
        });
      done();
    });
  });
  describe(`[PUT] /users`, () => {
    it("should update a user", done => {
      // sinon.stub(User, "find");
      // User.find.yields(null, [
      //   {name: 'Deeno', location: 'Bed with Ben'}
      // ]);
      // const updatedUser = { location: 'Dog house' };
      // sinon.stub(User, 'updateUser');
      // User.updatedUser.yields(null, [
      //   {name: 'Deeno', location: 'Dog house'}
      // ]);
      // User.updateUser(users => {
      //   expect(users[1].name).to.equal('Deeno');
      // })
      const updatedUser = {
        name: "Romeo",
        location: "Dog House"
      };
      chai
        .request(server)
        .put("/users")
        .send(updatedUser)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(201);
          expect(res.body[0].location).to.equal("Dog House");
        });
      done();
    });
  });
  describe(`[DELETE] /users`, () => {
    it("should delete a user", done => {
      // sinon.stub(User, 'find');
      // User.find.yields(null, [
      //   { name: 'Romeo', location: 'Paris' }
      // ]);
      const delUser = {
        name: "Romeo"
      };
      chai
        .request(server)
        .delete("/users")
        .send(delUser)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.ok).to.be.true;
        });
      done();
    });
  });
});
