const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const config = require('../api/config');
const server = require('../server');
const UserModel = require('../users/userModel');

chai.use(chaiHTTP);

describe('User', () => {
  let userId;
  before(done => {
    mongoose
      .connect(config.testdb)
      .then(() => {
        console.log('Test DB connection Achieved!!');
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
  after(done => {
    mongoose.connection.close();
    done();
  });
  beforeEach(done => {
    const newUser = new UserModel({
      username: 'awesome',
      password: 'secret',
      firstname: 'awesome',
      lastname: 'dude',
    });

    console.log(newUser.save(), '++++++');
    //newUser
    // .save()
    // .then(saveUser => {
    //   //console.log(saveUser, '+++++++');
    //   userId = saveUser._id.toString();
    //   //console.log(saveUser);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    done();
  });
  afterEach(done => {
    UserModel.remove({})
      .then(() => console.log('DB emptied'))
      .catch(err => console.log(err));
    done();
  });
  describe(`[GET] /api/users`, () => {
    it('should get a list of all the users in the db', done => {
      chai
        .request(server)
        .get('/api/users')
        .then(response => {
          // console.log(response, 'here  lies the response');
          const { _id, username, firstname, lastname } = response.body;
          console.log('hello', username);
        });
      done();
    });
  });
});
