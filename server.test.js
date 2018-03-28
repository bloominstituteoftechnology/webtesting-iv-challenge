const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');

chai.use(chaihttp);

const Anime = require('./model');

describe('Server', () => {
  describe('[POST] /anime', () => {
    it('should add a new anime', () => {
      const newAnime = {
        name: 'One Piece',
        genre: 'Adventure Fantasy'
      };
      chai.request(server)
        .post('/anime')
        .send(newAnime)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('One Piece');
        });
    });
  });
  // describe('[GET] /anime', () => {
  
  // });
  // describe('[PUT] /anime', () => {
  
  // });
  // describe('[DELETE] /anime', () => {
  
  // });
});