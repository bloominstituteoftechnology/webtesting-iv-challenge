const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Dog = require('./Dog')

// describe('Dogs', () => {
//     let dogId;
//     beforeEach(done => {
//         const newDog = new Dog({
//             name: "Kenzie",
//             breed: "English Settler"
//         });
//     newDog
//         .save((err, savedDog) => {
//             if(err) {
//                 console.log(err);
//                 done();
//             }
//         dogId = savedDog._id;
//         done();
//         })
//     });

//     afterEach(done => {
//         Dog.remove({}, err => {
//             if (err) console.log(err);
//             return done();
//         });
//     });

describe('GET to /api/dogs', () => {
    it('should get a list of dog breeds', async() => {
        const savedDog = await Dog.create
            .request(server)
            .get('/api/dogs')
            .end((err, response) => {
                if (err) {
                    console.log(err);
                    return done();
                }
                expect(response.status).to.equal(200);
                return done();
            })
    });
});


describe('POST to /api/dogPost', () => {
    it('should add a new dog to DB', done => {
        Dog.find({})
        chai
            .request(server)
            .post('/api/dogPost')
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                // console.log(response);
                expect(response.status).to.equal(201);
                return done();
            })
    })
})

    
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/testingdb')
            .then(console.log('connected to test db'));
    });

    beforeEach(() => {
        // return Dog.remove();
    });

    afterEach(() => {
        return Dog.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    it('should hash the password before saving the dog', async () => {
        const dog = { breed: 'frodo', password: 'irrelevant' };

        const savedDog = await Dog.create(dog);

        expect(savedDog.password).not.toEqual(dog.password);
        expect(savedDog.password).toHaveLength(60);
    });
});