const mongoose = require('mongoose');
const Game = require('./videogames');
jest.setTimeout(4000);

describe('Game model', () => {

    beforeAll(() => {
        return mongoose
        .connect('mongodb://localhost/servertest')
        .then(console.log('Connected to test db'));
    })
    it('should provide a layout for each game', async () => {
        const game = { game: 'battlefield 3', description: 'first person shooter'};

        const newGame = await Game.create(game);
    })
});