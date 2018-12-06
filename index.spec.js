const request = require('supertest');
const server = require('./api/server.js');
const db = require('./data/dbConfig.js');

beforeEach(async () => {
    await db('Dune').truncate();
})
describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return a response in JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        it('should return Up and Running Captain', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ message: 'Up and Running Captain' });
        });
    }) //end '/ route' describe


    describe('Dune routes', () => {
        describe('POST /chars route', () => {
            it('should return a status code of 201', async () => {
                let response = await request(server).post('/chars').send({ name: 'Paul Atreides' });
                expect(response.status).toBe(201);
            });
            it('should return the character id and name', async () => {
                let response = await request(server).post('/chars').send({ name: 'Paul Atreides' });
                expect(response.body).toEqual({ id: 1, name: 'Paul Atreides' });
            });
        }) //end Dune post describe

        describe('DELETE /:id route', () => {
            it('should return a status code of 200', async () => {
                //add a record to delete
                let add = await request(server).post('/chars').send({ name: 'Paul Atreides' });
                //make sure the record was added
                expect(add.body.id).toEqual(1);
                //request to delete the record
                let response = await request(server).delete('/chars/1').send();
                //check status code
                expect(response.status).toBe(200);
            });
            it('should return the number of records deleted', async () => {
                //add a record to delete
                let add = await request(server).post('/chars').send({ name: 'Leto Atreides' });
                //make sure the record was added
                expect(add.body.id).toEqual(1);
                //request to delete the record
                let response = await request(server).delete('/chars/1').send();
                //check status code
                expect(response.body).toBe(1);
            })
        }) //end delete route describe
    }) //end Dune routes describe
}) //end server.js describe