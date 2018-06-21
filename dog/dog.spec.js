const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Dog = require('./dog');

describe('/dogs', () => {
    beforeAll(() => {
       return mongoose
        .connect(`mongodb://localhost/testdogdb`)
        .then(connected => {
            console.log('Server Connected')
        })
        .catch(err => {
            console.log('Server Error - Not Connected')
        });
    });
    
    //clears db after each test run
    afterEach(() => {
       return Dog.remove()
    });

    //disconnect from db after test run
    afterAll(() => {
        return mongoose.disconnected()
    });

//POST DOG
    describe('POST dogs', () => {
        it('Checks if dog was posted successfully', async (done) => {
            // arrange
            const dogSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }

            // act
            const newDog = await Dog.create(dogSchema);

            // assert
            expect(newDog.name).toEqual('Comrade');            
            //expect(newDog.status).toEqual(201);
            done();
        });
        
        it('Checks if password is hashed', async (done) => {
            // arrange
            const dogSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }
            
            // act
            const newDog = await Dog.create(dogSchema);
            
            // assert
            expect(newDog.password).not.toEqual(dogSchema.password);
            expect(newDog.password).toHaveLength(60);                       
            done();
        });
    });

//DELETE DOG
    describe('DELETE dogs', () => {
        it('Checks if dog was deleted successfully', async (done) => {
            // arrange
            const dogSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }

            // act
            const newDog = await Dog.create(dogSchema);
            const deleteDog = await Dog.remove(dogSchema);

            // assert
            expect(deleteDog.name).not.toEqual('Comrade');
            done();
        });
    });
});