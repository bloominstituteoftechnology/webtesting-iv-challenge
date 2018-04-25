const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const server = require('./server');

const expect = chai.expect;

chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/test', {}, err => {
  if (err) return console.log(err);
  console.log('DB Connection Achieved');
});

describe('Woofs', () => {
    beforeEach(() => {
        const newWoof = new newWoof({
            user: 'ronnie',
            message: 'hey'
        });
        newWoof.save((err, savedWoof) => {
            if(err) {
                console.log(err);
                done();
            }
            bandId = savedWoof._id;
            done()
        });
    });
    afterEach(done => {
        Woof.remove({}, err => {
            if (err) console.log(err);
            done();
        });
    });
});

describe(`[GET] /api/woofs`, () => {
    it('should get a list of all of the woofs', done => {
        chai
            .request(server)
            .get('/api/woofs')
            .end((err, response) => {
                if (err) console.log(err);
                expect(response.status).to.equal(200);
                done();
            })
    })
})