const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const Pokemon = require('./pokemon')
const server = require('./server')

const chai = require('chai')
const expect = chai.expect
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP);

describe('/pokemon', () => {
  beforeEach((done) => {
    Pokemon.remove({}, (err) => {
      if (err) console.log(err)
      done()
    })
  })

  describe('[GET] /pokemon', () => {
    it('should get all of the pokemon', (done) => {
      chai.request(server)
        .get('/pokemon')
        .end((err, res) => {
          if (err) return console.log(err)
          expect(res.status).to.equal(200)
          expect(Array.isArray(res.body)).to.equal(true)
          expect(res.body.length).to.equal(0)
          done()
        })
    })
  })

  describe('[POST] /pokemon', () => {
    it('should post a new Pokemon', (done) => {
      const pokemon = {
        name: 'Pikachu'
      }
      chai.request(server)
        .post('/pokemon')
        .send(pokemon)
        .end((err, res) => {
          if (err) return console.log(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('Pikachu')
          done()
        })
    })
  })

  describe('[PUT] /pokemon/:id', () => {
    it('should update an existing Pokemon', (done) => {
      let pokemon = new Pokemon({ name: 'Pikachu' })
      pokemon.save((err, pokemon) => {
        chai.request(server)
        .put('/pokemon/' + pokemon.id)
        .send({ name: 'Squirtle' })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(typeof res.body).to.equal('object')
          expect(res.body.name).to.equal('Squirtle')
          done()
        })
      })
    })
  })

  describe('[DELETE] /pokemon/:id', () => {
    it('should delete an existing Pokemon', (done) => {
      let pokemon = new Pokemon({ name: 'Pikachu' })
      pokemon.save((err, pokemon) => {
        chai.request(server)
          .delete('/pokemon/' + pokemon.id)
          .end((error, res) => {
            expect(res.status).to.equal(200)
            expect(typeof res.body).to.equal('object')
            expect(res.body.name).to.equal('Pikachu')
            done()
          })
      })
    })
  })
})
