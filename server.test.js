const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('./server');

const Artist = require('./artist');

const expect = chai.expect;
chai.use(chaiHTTP);

mongoose.connect('mongodb://localhost/test', {}, err => {
    if (err) return console.log(err);
    console.log('Test DB Connection Succesful');
});

describe('Artists', () => {
    beforeEach(done => {
        const newArtist = new Artist({
            name: 'Radiohead',
            genre: 'Alt-rock'
        });
        newArtist.save((err, savedArtist) => {
            if (err) {
                console.log(err);
                done();
            }
            artistId = savedArtist._id;
            done();
        })
    });

    afterEach(done => {
        Artist.remove({}, err => {
            if (err) console.log(err);
            done();
        })
    })

    describe(`[GET] /api/artists`, () => {
        it('should get a list of all the bands in db', done => {
            chai
            .request(server)
            .get('/api/artists')
            .end((err, response) => {
                if (err) {
                    console.log(err);
                    done();
                }
                expect(response.status).to.equal(200);
                done();
                console.log(response);
                })
        })
    })
});