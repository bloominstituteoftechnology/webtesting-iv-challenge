const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    it('can run test', () => {
        expect(true).toBeTruthy();
    });

    it('can respond with status code 200 (ok)', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });

    it('can return JSON', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({ message: `server is up` });
    });

    describe('POST /user', async () => {
        it('should create the user', async () => {
            let response = await request(server)
                .post('/user')
                .send({ firstName: 'Mike', lastName: 'Smith', password: 'fdsaa' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Mike Smith' });

            response = await request(server)
                .post('/user')
                .send({ firstName: 'jim', lastName: 'Smith', password: 'fdsaa' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'jim Smith' });
        });
    });
});