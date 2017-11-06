const mongoose = require('mongoose');
const VideoGame = require('./models');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const server = require('./server');

chai.use(chaiHTTP);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

describe('/games', () => {
  let id;
  beforeEach((done) => {
    const game1 = new VideoGame({
      "title" : "Portal 2",
      "developer" : "Valve",
      "yearReleased" : 2012
    });
    const game2 = new VideoGame({
      "title" : "Witcher 3",
      "developer" : "CD Projekt Red",
      "yearReleased" : 2015
    });
    game1.save()
      .then((game) => {
        id = game.id;
        game2.save()
          .then(() => {
            done();
          })
      })
  });

  afterEach((done) => {
    VideoGame.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });
  
  describe('[GET] /games', () => {
    it('should return all of the games', (done) => {
      chai.request(server)
        .get('/games')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  describe('[GET] /games/:id', () => {
    it('should return the game with the specified id', (done) => {
      chai.request(server)
        .get(`/games/${id}`)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Portal 2');
          expect(res.body.developer).to.equal('Valve');
          expect(res.body.yearReleased).to.equal(2012); 
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('[POST] /games', () => {
    it('should not add a game if a required parameter is missing', (done) => {
      const game = {
        "title" : "Diablo III",
        "yearReleased" : 2012
      }
      chai.request(server)
        .post('/games')
        .send(game)
        .end((err, res) => {
          expect(res.status).to.equal(422); 
          expect(res.body.error).to.equal('you must provide a title, developer, and yearReleased');    
          done();
        });
    });

    it('should add a new game', (done) => {
      const game = {
        "title" : "Diablo III",
        "developer" : "Blizzard",
        "yearReleased" : 2012
      }
      chai.request(server)
        .post('/games')
        .send(game)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Diablo III');
          expect(res.body.developer).to.equal('Blizzard');
          expect(res.body.yearReleased).to.equal(2012); 
          expect(res.body).to.be.an('object');          
          done();
        });
    });
  });

  describe('[PUT] /games/:id', () => {
    it('should update the game with the specified id', (done) => {
      const game = {
        "title" : "Portal 3",
        "developer" : "Valve",
        "yearReleased" : 2019
      }
      chai.request(server)
        .put(`/games/${id}`)
        .send(game)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Portal 3');
          expect(res.body.developer).to.equal('Valve');
          expect(res.body.yearReleased).to.equal(2019);          
          expect(res.body).to.be.an('object');   
          done();
        });
    });
  });

  describe('[DELETE] /games/:id', () => {
    it('should delete the game with the specified id', (done) => {
      chai.request(server)
        .delete(`/games/${id}`)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Portal 2');
          expect(res.body.developer).to.equal('Valve');
          expect(res.body.yearReleased).to.equal(2012); 
          expect(res.body).to.be.an('object');
          VideoGame.findById(id)
            .exec()
            .then((game) => {
              expect(game).to.equal(null);
              done();
            })
            .catch((error) => {
              console.log(error);  
            });
        });
    });
  });
});

