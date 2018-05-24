const mongoose = require('mongoose');
const server = require('../server');

const request = require('supertest');

const routes = require('./routes');

const Game = require('../videogames/videogames');

describe('GET /api/videogames', () => {
    it('should get all voideogames on the db', async () => {
        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
    })
})

describe('POST /api/videogames', () => {
    it('should post a new game to the list of videogames', async () => {
        const game = new Game({
            game: 'dead island',
            description: 'survival'
        });
        const response = await request(server).post('/');

        expect(response.status).toEqual(404); // game not saved in db
    })
})

describe('PUT /api/videogames/:id', () => {
    it('Should update the game given an ID', done => {
        let game = new Game({
            game: 'tony hawk proskater',
            description: 'simulation'
        });
        game.save((err, game) => {
            request(server)
            .put('/api/game/' + game.id)
            .end((err, response) => {
              if (err) {
                console.log(err);
                done();
              }
              expect(response.status).toEqual(404); // GAME NOT IN DB
              done();
            });
        });
      });
    });

    describe('DELETE /api/videogames/:id', () => {
        it('should remove a given ids game', () => {
            let game = new Game({
                game: 'call of duty 3',
                description: 'first person shooter'
            });
            game.save((err, game) => {
                request(server)
                .delete('/api/videogames' + game.id)
                .end((er, response) => {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    expect(response.status).toEqual(404); // game not in db 
                })
            })
        })
    })