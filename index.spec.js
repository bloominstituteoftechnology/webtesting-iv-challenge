const request = require('supertest');
let server = require('./api/server.js');
let db = require("./data/animalsDB");
const helpers = require("./data/animalsModel");

beforeEach(() => {
    db = []
});

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });

        it('should return with a body like: { api: "up" }', async () => {
            let response = await request(server).get('/');

            expect(response.body).toEqual({
                api: 'up'
            });
        });
    });

    describe('/animals POST route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });

            expect(response.type).toBe('application/json');
        });

        it('should return with a body showing the number of array elements', async () => {
            let response = await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });
            expect(response.body).toBe(3);
        });
    });

    describe('/animals DELETE route', () => {
        it('should return status code 202', async () => {
            await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });

            let response = await request(server).delete('/animals').send({ id: 1 });

            expect(response.status).toBe(202);
        });

        it('should return JSON', async () => {
            await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });
            let response = await request(server).delete('/animals').send({ id: 1 });

            expect(response.type).toBe('application/json');
        });

        it('should return with a body showing the number of array elementsv deleted', async () => {
            await request(server).post('/animals').send({
                id: 1,
                name: "Bear"
            });

            await request(server).post('/animals').send({
                id: 2,
                name: "Giraffe"
            });
            let response = await request(server).delete('/animals').send({ id: 2 });
            expect(response.body).toBe(2);
        });
    });
});