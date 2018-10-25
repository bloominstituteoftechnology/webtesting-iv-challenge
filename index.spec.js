const server = require('./server.js');
const req = require('supertest');

describe('server', () => {
    describe('GET /', () => {
        it('Should get the sanity check.', async () => {
            const res = await req(server).get('/');
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({message: "server running"});
        });
    });

    describe('create', () => {
        it('Should create a character in the API.', async () => {
            const character = {name:'Coach K',race:'gorilla', age:25, height:'6ft'};
            const res = await req(server)
                .post('/create-character')
                .send(character);
            const expected = {hello: `${character.name}`, the:`${character.race}`};
            expect(res.body).toEqual(expected);
        });
    })
});