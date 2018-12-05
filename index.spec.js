const request = require("supertest");
const server = require("./api/server.js");

describe('Server', () => {
    describe('GET /', () => {
        it('returns status code 200(OK)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('returns JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('returns {message: "Server is up"', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({message: 'Server is up'});
        });
    });

    describe('POST /users', () => {
        it('posts a user to the database', async () => {
        const user = {
            "id": 4,
                "username": "May",
                "password": "pass"
        }

        const expected = [
            {
                "id": 1,
                "username": "Hunter",
                "password": "1234"
            },
            {
                "id": 2,
                "username": "Sandwich",
                "password": "1234"
            },
            {
                "id": 3,
                "username": "Yogurt",
                "password": "1234"
            },
        ]
        const res = await request(server).post('/users').send({user});
        expect(res.body.users).toEqual(expected);
        });

        it('returns status code 201(CREATED)', async () => {
            const user = {
                "id": 4,
                 "username": "Steve",
                 "password": "1234"
            }

            const res = await request(server).post('/users').send({user});
            expect(res.status).toBe(201);
        });

        it('returns JSON', async () => {
            const user = {
                "id": 4,
                 "username": "Steve",
                 "password": "1234"
            }

            const res = await request(server).post('/users').send({user});
            expect(res.type).toBe('application/json');
        });
    });
});