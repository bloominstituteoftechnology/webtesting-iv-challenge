const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
const Artist = require('../models/artistModel');
const Client = require('../models/clientModel');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

chai.use(chaiHttp);

const artistObj = {
  name:'Artist Name',
  age: 27,
  specialty: 'Black & Grey',
}

describe('Artist API {CRUD}', () => {
  beforeEach((done) => {
    Artist.remove({}, err => err ? console.log(err) : done());
  });
  describe('C-Create {POST} /add-artist', () => {
    it('should add a new artist', (done) => {
      chai.request(server)
      .post('/add-artist')
      .send(artistObj)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(artistObj.name);
        done();
      });
    });
  });
  describe('R-Read {GET} /artists', () => {
    it('should receive all artists', (done) => {
      chai.request(server)
      .get('/artists')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.a.lengthOf(0);
        done();
      });
    });
  });
  describe('U-Update {PUT} /update-artist/:id', () => {
    it('should update artist info by id and return the updated artist obj with: name, age, specialty', (done) => {
      const updatedInfo = { name: 'updated', age: 77, specialty: 'updated'};
      const artist = new Artist(artistObj);
      artist.save();
      chai.request(server)
      .put(`/update-artist/${artist._id}`)
      .send(updatedInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('updated');
        expect(res.body.age).to.equal(77);
        expect(res.body.specialty).to.equal('updated');
        expect(res).to.be.json;
        expect(err).to.be.null;
        done();
      });
    });
  });
  describe('{PUT} /artist/:id/add-client', () => {
    it('should add a new client to the artist', (done) => {
      const artist = new Artist(artistObj);
      const newClient = { name: 'New Client' };
      artist.save();
        chai.request(server)
        .put(`/artist/${artist._id}/add-client`)
        .send(newClient)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.clients).to.have.a.lengthOf(1);
          expect(err).to.be.null;
          done();
        });
    });
  });
  describe('D-Delete {DELETE} /remove-artist/:id', () => {
    it('should delete the artist from the db and return an Object with: data: (artist list) , success: true', (done) => {
      const artist = new Artist(artistObj);
      artist.save();
      chai.request(server)
      .del(`/remove-artist/${artist._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.be.a.lengthOf(0);
        expect(res.body.success).to.equal(true);
        expect(res).to.be.json;
        expect(err).to.be.null;
        done();
      });
    });
  });
  describe('{Schema Methods}', () => {
    it('artist.changeName() should change the name of the Artist Scehma and return the new name', (done) => {
      const artist = new Artist(artistObj);
      artist.changeName('Changed Name');
      expect(artist.changeName).to.be.a('function');
      artist.save((err, artist) => {
        expect(err).to.be.null;
        expect(artist.name).to.be.equal('Changed Name');
        done();
      });
    });
    it('artist.info() should return an Object With The Artist Info: name, age, specialty', (done) => {      
      const artist = new Artist(artistObj);
      artist.save((err) => {
        expect(err).to.be.null;
        expect(artist.info).to.be.a('function');
        expect(artist.info()).to.be.an('object');
        expect(artist.info()).to.deep.equal(artistObj);
        done();
      });
    });
    it('artist.addToRank() should add points to the artist\'s rank', (done) => {
      const artist = new Artist(artistObj);
      artist.save((err) => {
        expect(err).to.be.null;
        expect(artist.addToRank).to.be.a('function');
        artist.addToRank(20);
        expect(artist.rank).to.equal(20);
        expect(artist.addToRank(20)).to.equal('added 20 to rank, rank is now 40');
        done();
      });
    });
    it('artist.addClient() should add the new client object id to the clients array associated to the artist', (done) => {
      Client.remove({}).exec();
        const artist = new Artist(artistObj);
        artist.save();
        const newClient = { name: 'New Client' };
        artist.addClient(newClient,(updated) => {
          expect(updated.clients).to.be.an('array');
          expect(updated.clients[0]).to.be.an('object');
          done();
        }); 
    });
    it('Artist.findArtist() should return an Object With The Artist Info: name, age, specialty', (done) => {
      const artist = new Artist(artistObj);
      artist.save((err, artist) => {
        Artist.findArtist(artist.name, (found) => {
          expect(found.name).to.equal(artistObj.name);
          expect(found.age).to.equal(artistObj.age);
          expect(found.specialty).to.equal(artistObj.specialty);
          done();
        });
      });      
    });
    it('Artist.findAll() should return an array of all the artists in the db', (done) => {
      const artist = new Artist(artistObj);
      artist.save((err, artist) => {
        Artist.findAll((artists) => {
          expect(artists).to.be.an('array');
          expect(artists).to.be.a.lengthOf(1);
          expect(artists[0].name).to.equal(artistObj.name);
          expect(artists[0].age).to.equal(artistObj.age);
          expect(artists[0].specialty).to.equal(artistObj.specialty);
          done();
        });
      });
    });
  });
});