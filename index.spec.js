/*  
use jest and supertest to write the tests.
Your API must be able to create and delete a resource of your choosing.
Write a minimum of two tests per route handler.
Add tests to verify that the endpoints return the correct HTTP status codes.
Write the tests BEFORE writing the route handlers.

*/


const server = require('./api/server.js');

const request = require('supertest');

describe('server', () => {
    describe('GET /api/cities', () => {
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/api/cities')

            expect(response.status).toBe(200);
            });
        
        it('should return JSON', async () => {
            const response = await request(server).get('/api/cities');
            // console.log(response.body);
            expect(response.type).toBe('application/json');
        })

        it('should return an object with all the states cities', async () => {
            const response = await request(server).get('/api/cities');

            const states = {
                'California': {
                    cities: ['Los Angeles', 'San Fransisco', 'Sacramento']
                },
                'Texas': {
                    cities: ['Houston', 'Austin', 'Dallas']
                },
                'New York': {
                    cities: ['New York', 'Albany', 'Buffalo']
                }
            }

            expect(response.body).toEqual(states)
        })
    })

    describe('POST /api/cities/:cityName', () => {
        it('should return the city name from URL and the passed state name from req.body', async () => {
            
            const cityName = 'Los Angeles';
            const stateName = 'California';
            const expected = {
                message: "Los Angeles, California"
            }
            const response = await request(server).post(`/api/cities/${cityName}`).send({stateName});
            expect(response.body).toEqual(expected)
            expect(response.status).toBe(200);
        })
    })
})