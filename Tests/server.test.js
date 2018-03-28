const chai = require('chai');
const { expect } = chai;
const server = require('../server');

describe('Server', () => {
  describe('[POST] /signup', () => {
    it('Should return the new User', () => {
      const newUser = {
        name: 'Jimmy',
        age: 45,
        eyeColor: 'blue'
      };
      chai
        .request(server)
        .post('/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(201);
          expect(res.send).to.equal({
            name: 'Jimmy',
            age: 45,
            eyeColor: 'blue'
          });
        });
    });
  });
});
