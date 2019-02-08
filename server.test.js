const request = require('supertest');
const server = require('./server.js');
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);

// afterEach(async () => {
//     await db('cats').truncate();
// });
describe('/cats', () => {
    it('responds with 200', async () => {
        const response = await request(server).get('/cats');

        expect(response.status).toBe(200)
    })

    it('responds with json', async () => {
        const response = await request(server).get('/cats');

        expect(response.type).toMatch(/json/i)
    })

    it('sends the correct response object', async () => {
        const response = await request(server).get('/cats');

        expect(response.body).toEqual([])
    })
})
describe('post to /cats', () => {
    it('responds with 201 when body is correct', async () => {
        const body = { name: 'fluffy' }
        const response = await request(server).post('/cats').send(body);

        expect(response.status).toBe(201)
    })

    it('responds with 400 when body is missing data', async () => {
        const body = {}
        const response = await request(server).post('/cats').send(body);

        expect(response.status).toBe(400)
    })

})
describe('delete to /cats', () => {
    it('responds with id of deleted and responds with 201 when cat deleted', async () => {
        const response = await request(server).delete('/cats/1');
        expect(response.body).toBe(1);
        expect(response.status).toBe(201)
    })
  
    it('responds with 404 when cat cant be deleted', async () => {
            const response = await request(server).del('/cats').send();
        expect(response.status).toBe(404)
    })
})