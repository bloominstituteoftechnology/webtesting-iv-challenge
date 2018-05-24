const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Pet = require('./pet');

describe('/pets', () => {
    beforeAll(() => {
       return mongoose
        .connect(`mongodb://localhost/testpetdb`)
        .then(connected => {
            console.log('Server Connected')
        })
        .catch(err => {
            console.log('Server Error - Not Connected')
        });
    });
    
    //clears db after each test run
    afterEach(() => {
       return Pet.remove()
    });

    //disconnect from db after test run
    afterAll(() => {
        return mongoose.disconnected()
    });

//POST PET
    describe('POST pets', () => {
        it('Checks if pet was posted successfully', async (done) => {
            // arrange
            const petSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }

            // act
            const newPet = await Pet.create(petSchema);

            // assert
            expect(newPet.name).toEqual('Comrade');
            // expect(newPet.status).toEqual(200);
            done();
        });

        it('Checks if password is hashed', async (done) => {
            // arrange
            const petSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }

            // act
            const newPet = await Pet.create(petSchema);

            // assert
            expect(newPet.password).not.toEqual(petSchema.password);
            done();
        });
    });

//DELETE PET
    describe('DELETE pets', () => {
        it('Checks if pet was deleted successfully', async (done) => {
            // arrange
            const petSchema = { name: 'Comrade', species: 'Pug', password: 'woof' }

            // act
            const newPet = await Pet.create(petSchema);
            const deletePet = await Pet.remove(petSchema);

            // assert
            expect(deletePet.name).not.toEqual('Comrade');
            done();
        });
    });
});