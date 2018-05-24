const request = require('supertest');

const server = require('../server');
const User = require('../friends/friendModel');


describe('server', () => {
    test('should return 200 and a response', async (done) => {
        const expected ={ api: 'running' };
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expected);
        done();
    });
    test('post should return 201', async (done) => {
        const user = {firstName: 'bob', lastName: 'wow', age: 30, id: 2};
        const createdUser = await User.create(user);
        const error = await request(server).post('/');
        expect(error.status).toBe(404);
        expect(createdUser.age).toEqual(user.age);
        done();
    });
    test('delete should return', async (done) => {
        const user = {firstName: 'bob', lastName: 'wow', age: 30, id: 2};
        const deletedUser = await User.remove(user);
        const error = await request(server).delete('/:id');
        expect(error.status).toBe(404);
        expect(deletedUser.id).not.toEqual(user.id);
        done();
    })
});