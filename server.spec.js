const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should run the tests', () => {
        expect(true).toBeTruthy();
    })

    describe('GET /', () => {
        it('returns a 200 status code (OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });

    describe('POST /roster', () => {
        it('should add a player to roster', async () => {
            let player = 'Alvin Kamara';
            let position = 'RB';
            let response = await request(server)
                .post(`/roster`)
                .send({ player, position })
                // .send({ name: 'Alvin Kamara', position: 'RB' });
            expect(response.body).toEqual({ id: 1, name: 'Alvin Kamara', position: 'RB' });
        });

        it('should return JSON', async () => {
            let player = 'Alvin Kamara';
            let position = 'RB';
            const response = await request(server)
                .post('/roster')
                .send({ player, position })
            expect(response.type).toEqual('application/json');
        });
    });

    describe('DELETE /roster:id', () => {
        it('should return status 200 (OK)', async () => {
            const response = await request(server).delete('/roster/1');

            expect(response.status).toBe(200);
        });

        it('should return the id of the deleted player upon successful deletion', async () => {
            const response = await request(server)
                .delete('/roster/1')
                .send({ id: '1' });

            expect(response.body).toEqual({ id: '1' });
        });
    });
});