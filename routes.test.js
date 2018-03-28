const server = require('./server');
const Marsupial = require('./models/marsupial');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
chai.use(chaiHTTP);

describe('Marsupial Server', () => {
    let marsupialId;
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/Marsupials');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Mongo DB connected');
            done();
        });
    });
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
    beforeEach((done) => {
        new Marsupial({

            name: 'Wombat',
            latinName: 'Vombatus ursinus',
            region: 'Southeastern Australia'

        }).save((err, savedMarsupial) => {
            if (err) {
                console.log(err);
                return done();
            }
            marsupialId = savedMarsupial.id;
            done();
        });
    });
    afterEach(done => {
        Marsupial.remove()
            .then(() => done())
            .catch(error => done(error));
    });
    describe('[POST] /api/marsupials', () => {
        it('Should add a marsupial to the database', (done) => {
            const newMarsupial = {
                name: 'Wombat',
                latinName: 'Vombatus ursinus',
                region: 'Southeastern Australia'
            };
            chai
                .request(server)
                .post('/api/marsupials')
                .send(newMarsupial)
                .then(res => {
                    expect(res.status).to.equal(201);
                    expect(res.body.marsupial.name).to.equal('Wombat');
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('[GET] /api/marsupials', () => {
        it('Should get all marsupials from the database', done => {
            chai
                .request(server)
                .get('/api/marsupials')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].name).to.equal('Wombat');
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('[GET] /api/marsupials/:id', () => {
        it('Should get a marsupial by a given id', done => {
            chai
                .request(server)
                .get(`/api/marsupials/${marsupialId}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('Wombat');
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('[PUT] /api/marsupials/:id', () => {
        it('Should update a marsupial by a given id', done => {
            const updateMarsupials = { name: 'Crest-tailed mulgara', latinName: 'Dasycercus cristicauda', region: 'South Australia' };
            chai
                .request(server)
                .put(`/api/marsupials/${marsupialId}`)
                .send(updateMarsupials)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('Crest-tailed mulgara');
                    expect(res.body.latinName).to.equal('Dasycercus cristicauda');
                    expect(res.body.region).to.equal('South Australia');
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('[DELETE] /api/marsupials/:id', () => {
        it('Should delete a marsupial by a given id', done => {
            chai
                .request(server)
                .delete(`/api/marsupials/${marsupialId}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch(err => done(err));
        });
    });
})