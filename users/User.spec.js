const mongoose = require('mongoose');
const User = require('./User');


describe('user model', () => {
    beforeAll(() => {
        return mongoose.connect('mongodb://localhost/testsdb');
    });

    afterEach(() => {
        return User.remove();
    })

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the user', async () => {
        const medusa = { username: 'medusa', password: 'password' };

        const savedUser = await User.create(medusa);
    
        expect(savedUser.username).toEqual(medusa.username);
        expect(savedUser.password).not.toEqual(medusa.password);
        expect(savedUser.password).toHaveLength(60);
    });
    //--testing stuff--
    const userName = {
        string: true,
        number: false,
    };
    describe('username should be a string', () => {
        it('is a string named medusa', () => {
            expect(userName.string).toBeTruthy();
        });
    });
 

    //1st create test
    describe('/api/post', () => {
        it('should add a user with status code 201 , created', () => {
            const statusCode = 201;
            const addUser = {username:'medusa', password: 'password'};

            expect(addUser).toEqual(addUser);
        });
    });

     //2nd create test
     describe('/api/post', () => {
        it('should add a user that contains a password status code 201, created', () => {
            const statusCode = 201;
            const userDetails = {password: 'password'};

            expect(addUser).toEqual(addUser);
        });
    });

        //1st delete test
        describe('/api/delete', () => {
            it('should delete a user with status code 204 , no content', () => {
                const statusCode = 204;
                const deleteUser = {username:'medusa', password: 'password'};
    
                expect(deleteUser).toBeNull();
            });
        });

        //2nd delete test
        describe('/api/delete', () => {
            it('should render a button', () => {
                const button = header.find('.toggle');
        
                expect(button.length).toEqual(1);
            });
        });

});