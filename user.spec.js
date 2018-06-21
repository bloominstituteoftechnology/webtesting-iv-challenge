const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const User = require('./user');

describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect(`mongodb://localhost/testdb`)
    })

    afterEach(() => {
        return User.remove();
    });

    afterAll(() => {
        return server.disconnect();
    })
    describe('Post user', () => {
            it('should create a resource', async (done) => {
                const userSchema = { username: "Test", password: "12345" }

                //do a post request to our API server(server.js)

                const savedUser = await User.create(userSchema)
                
                expect(savedUser.username).toEqual('Test');
                done();
            })
        it('should hash password', async () => {
            const userSchema = { username: "Test", password: "12345" }
            const savedUser = await User.create(userSchema)

            expect(savedUser.password).toEqual(savedUser.password);
        })
    })
    describe('Delete user', () => {
        it('should delete a resource', async (done) => {
            const userSchema = { username: "Test", password: "12345" }

            //do a post request to our API server(server.js)
            const deleteUser = await User.remove(userSchema)


            expect(deleteUser.username).not.toEqual('Test');
            done();
        })
    }) 
})

