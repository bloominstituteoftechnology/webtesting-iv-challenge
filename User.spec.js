const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('./User');

describe('Post /user', () => {
    beforeAll(() => {
        return mongoose.
        connect('mongodb://localhost/testingdb')
        .then(console.log('Connected to test DB'))
        .catch(err => res.send(err));
    })
    beforeEach(() => {
       
    })
    afterEach(() => {
        return User.remove();
    })
    
    afterAll(() => {
        return mongoose.disconnect();
    })
    
    it('should hash the password before saving the user', async () => {
        const user = { username: 'frodo', password: 'blahblah' };
        
        const savedUser = await User.create(user)
        expect((savedUser.password)).not.toEqual(user.password);
        expect(savedUser.password).toHaveLength(60);
    })
})