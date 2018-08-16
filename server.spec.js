const request = require('supertest');

const server = require('./server.js');


describe('server get requests', () => {
    it('returns status code 200', async () => {
        const OK = 200;

        const response = await request(server).get('/');
        expect(response.status).toEqual(OK);
    })

    it("returns status code 400", async () => {
        const NOT_FOUND = 404;

        const response = await request(server).get('/lime');
        expect(response.status).toEqual(NOT_FOUND);
    })

    describe('species endpoints and functionality', () => {
        it('returns a status code of 200', async () => {
            const OK = 200;

            const response = await request(server).get('/species');
            expect(response.status).toEqual(OK);
        })

        it('returns  a status code for creation', async () => {
            const response = await request(server).post('/species').send({ animal: 'liger'})
            expect(response.status).toEqual(200);
        })

        it('creates a species', async () => {
            const species = { species: 'Jaguar' };

            const response = await request(server).post('/species').send({ animal: 'Jaguar' });
            expect(response.body).toEqual(species);
        })

        it('deletes a species', async () => {
            const species = {};

            const response = await request(server).delete('/species/1');
            expect(response.body).toEqual(species);
        })
    })
})