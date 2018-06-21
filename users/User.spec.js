const User = require('./User');

describe('user model', async () => {
    const user = { username: 'bilbo', password: 'whatever'};

    const savedUser  = await User.create(user);

    expect(savedUser.password).not.toEqual(user.password);
});