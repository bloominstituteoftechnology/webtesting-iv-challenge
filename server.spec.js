const request = require('supertest');
const server = require('./server');
const faker = require('faker');
const mongoose = require('mongoose');

const User = require('./models/User');

describe('users API', () => {
    beforeAll(() => {
        const { userName, password } = faker.internet;
        const usersData = [];
        for(let i = 0; i < 10; i++){
            usersData.push({ username: userName(), password: password() })
        }
        return mongoose
            .connect('mongodb://localhost/testingdb')
            .then(() => User.insertMany(usersData));
    });

    afterAll(() => {
        return User.remove().then(() => mongoose.disconnect());
    });

    // beforeEach(() => {
    //     const { userName, password } = faker.internet;
    //     user = { username: userName(), password: password() }
    // });

    it('should return 200 status code and a json object from the index route', async () => {
        const expectedBody = { api: 'running!' };

        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })

    it('should get all users', async () => {
        const response = await request(server).get('/api/users');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).not.toBeUndefined();
        expect(response.body.users).toHaveLength(10);
    })

    it('should get an individual user', async () => {
        const { userName, password } = faker.internet;
        const user = { username: userName(), password: password() }
        const newUser = await User.create(user);
        const response = await request(server).get(`/api/users/${newUser._id}`);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).not.toBeUndefined();
        expect(response.body.user).toMatchObject({username: user.username});
    })

    it('should create a new user', async () => {
        const { userName, password } = faker.internet;
        const user = { username: userName(), password: password() }
        const response = await request(server).post(`/api/users`).send(user);

        expect(response.status).toEqual(201);
        expect(response.type).toEqual('application/json');
        expect(response.body.user).toMatchObject({ username: user.username });
        expect(response.body.user).toHaveProperty('_id');
        expect(response.body.user).toHaveProperty('username');
        expect(response.body.user).toHaveProperty('password');
    })

    it('should delete a user', async () => {
        const { userName, password } = faker.internet;
        const user = { username: userName(), password: password() };

        const newUser = await User.create(user);
        const response = await request(server).delete(`/api/users/${newUser._id}`);
        const users = await User.find();
        expect(response.status).toEqual(200);
        expect(response.body.msg).toEqual('successfully deleted user');        
    })
})