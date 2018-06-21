const mongoose = require('mongoose');

const Friend = ('./friend');

describe('friend model', () => {
    
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/friend-db')
    });

    afterEach(() => {
        return Friend.savedFriend()
    });

    afterAll(() => {
        return mongoose.disconnect();
    });
   it('should send a 200 and post a new friend', async () => {
       const brandon = {name: 'Brandon', location: 'Cincinnati', profession: "Full Stack JS Dev", age: 27, comments: [{body: 'I love LS'}]}
    
       const savedFriend = await Friend.create(brandon).post('/friends');

       expect(savedFriend.name).toEqual(brandon.name);
    });
});