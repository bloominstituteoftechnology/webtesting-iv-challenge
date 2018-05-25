const supertest = require('supertest');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const server = require('./server');
const Dog = require('./Dog')

describe('Dog Model', () => {
    // let DogId;
    beforeAll(() => {
        return mongoose
          .connect('mongodb://localhost/testingdb')
          .then
            (console.log('connected to test db'));
    });
    
    // beforeEach(done => {
    //     const newDog = new Dog({
    //         breed: "Kenzie",
    //         password: "EnglishSettler"
    //     });
    // newDog
    //     .save((err, savedDog) => {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //           DogId = savedDog._id;
    //         }
    //         done();
    //     });
    // });

    afterEach(() => {
        return Dog.remove();
    });

    afterAll(() => {
        return Dog.remove().then(() => mongoose.disconnect());
    });

    it('should hash the password before saving the dog', async () => {
        const dog = { breed: 'Kenzie', password: 'EnglishSettler' };

        const savedDog = await Dog.create(dog);

        expect(savedDog.password).not.toEqual(dog.password);
        expect(savedDog.password).toHaveLength(60);
    });
});

    // it('should run Ok and a JSON Object from the index route', async () => {
    //     const expect = { API: 'Running' };

    //     const response = await request(server).get('/');

    //     expect(response.status).toEqual(200);
    //     expect(response.type).toEqual('application/json');
    //     expect(response.body).toEqual(expectBody);
    // });

    // it('should GET a list of dog breeds', async () => {
    //     const newDog = await request(server).get('/api/dogs');

    //     expect(newDog.status).toEqual(200);
    //     expect(newDog.type).toEqual('application/json');
    // })

describe('POST Dogs', () => {
    it('should POST a new dog to DB', async () => {
        const DogSchema = { breed: 'Kenzie', password: 'EnglishSettler' }

        const newDog = await Dog.create(DogSchema);
        
        // expect(newDog.status).toEqual(201);
        // expect(newDog.type).toEqual('application/json');
        // expect(newDog.body).toHaveProperty('_id');
        expect(newDog.breed).toEqual('Kenzie');
        // expect(newDog.body).toHaveProperty('password');
    })
});

describe('DELETE Dogs', () => {
    it('should DELETE dog from DB', async () => {
        const DogSchema = { breed: 'Kenzie', password: 'EnglishSettler' }

        const newDog = await Dog.create(DogSchema);
        const deleteDog = await Dog.remove(dogSchema);

        expect(deleteDog.breed).not.toEqual('Kenzie');
    });
});