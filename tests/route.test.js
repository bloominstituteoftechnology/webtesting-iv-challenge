const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Animal = require('../animalmodel');
const server = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/animal', () => {
  beforeEach((done) => {
    const animal = new Animal({
      name: 'Lion',
      type: 'carnivore',
      region: 'India'
    });
    animal.save((err, newAnimal) => {
      if (err) return console.log(err);
      done();
    });
  });
  afterEach((done) => {
    Animal.remove({}, (err) => {
      if (err) return console.log(err);
      done();
    });
  });

  describe('[Get] /list-animal' , () => {
    it('should get all the animal', (done) => {
      chai.request(server)
      .get('/list-animal')
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body.length).to.equal(1);
        done();
      });
    });
  });
  describe('[Post] /create-animal', () =>{
    it('should add animals to the list', (done) => {
      const animal = {
        name: 'Dragon',
        type: 'carnivore',
        region: 'India'
      }
      chai.request(server)
      .post('/create-animal')
      .send(animal)
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Dragon');
        done();
      });
    });
  });
  describe('[Put] /change-region', () => {
    it('should update region', (done) => {
      const animal = {
        name: 'Lion',
        type: 'carnivore',
        region: 'Savana'
      }
      chai.request(server)
      .put('/change-region')
      .send(animal)
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body.region).to.equal('Savana');
        done();
      });
    });
  });
  describe('[Delete] /remove-animal/:name', () => {
    it('should delete animal', (done) => {
      const name = 'Lion';
      chai.request(server)
      .delete('/remove-animal/'+ name)
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Lion');
        done();
      });
    });
  });

});
