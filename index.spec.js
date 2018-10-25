const server = require('./api/server.js');
const request = require('supertest');

describe('server POST', () => {
    it('should return a name', async () => {
        const name = 'clint';
        const response = await request(server)
            .post('/create')
            .send({ name });

        expect(response.body).toEqual({name: 'clint'});
    })

    it('should return the data in an array', async () => {
        const response = await request (server)
            .get('/get')
        expect(response.text).toContain('[' && ']');
    })

    it('should return a status of 201', async () => {
        const response = await request(server).post('/create')

        expect(response.status).toBe(201);
    })

    it('should return JSON', async () => {
        const response = await request(server).post('/create')

        expect(response.type).toBe('application/json');
    })

    it('should return an error of 422 if no name is included', async () => {
        const response = await request(server).post('/make')

        expect(response.status).toBe(422);
    })
})

describe('server DELETE', () => {
    it('should return a true', async () => {
        const name = 'clint';
        const response = await request(server).delete('/delete').send({ name })

        expect(response.body).toEqual(true);
    })

    it('should return a status of 200', async () => {
        const name = 'clint';
        const response = await request(server).delete('/delete').send({ name })

        expect(response.status).toBe(200);
    })

    it('should return JSON', async () => {
        const response = await request(server).delete('/delete')

        expect(response.type).toBe('application/json');
    })
})