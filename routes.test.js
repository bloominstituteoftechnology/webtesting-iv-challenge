const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP =require('chai-http');

mongoose.connect('mongodb://localhost/testingMini',{})
    .then(() => console.log('\n=== connected to mongo ===\n'))
    .catch(error => console.log('There was an error connecting to mongo.'));

const expect = chai.expect;
const server =require('./server');
const Battlefield = require('./battlefield');

chai.use(chaiHTTP);

describe('Battlefield', () => {
    let battlefieldId;
    beforeEach(done => {
        const newBattlefield = new Battlefield({
            name: 'agentt732',
            kills:'100',
            deaths:'1'
        });
        newBattlefield
            .save( (error, savedBF) => {
                if (error) {
                    console.log(error);
                    return done();
                }
                battlefieldId = savedBF._id;
                return done();
            });
    });
    afterEach(done => {
        Battlefield.remove({}, error => {
            if (error) console.log(error);
            return done();
        });
    });
    describe(` [GET] /api/battlefield`, () => {
        it('should get a list of battlefield users', (done) => {
            chai
                .request(server)
                .get('/api/battlefield')
                .end((error, response) => {
                    if (error){
                        console.log(error);
                        return done();
                    }
                    expect(response.status).to.equal(200);
                    return done();
                });
        });
    });
});