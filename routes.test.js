const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const Card = require('./card');
const server = require('./server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

mongoose.Promise = global.Promise;

describe('/card/:name', () => {
    beforeEach((done) => {
        Card.remove((err) => {
            if (err) console.log(err);
        }).exec()
        .then(() => {
            const card = {
                name: 'lightning bolt',
                manaCost: '1R',
                tags: ['burn']
            }
            chai.request(server)
                .post('/cards')
                .send(card)
                .end((err, res) => {
                    if (err) console.log(err);
                    done();
                });
        })
    });

    describe('[GET] /card/:name', () => {
        it('should return the desired card', (done) => {
            chai.request(server)
            .get('/card/lightning+bolt')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('lightning bolt');
                expect(res.body.manaCost).to.equal('1R')
                done();
            });
        });
    });

    describe('[PUT] /card/:name', () => {
        it('should update the desired card', (done) => {
            chai.request(server)
            .put('/card/lightning+bolt')
            .send({ tag: 'one drop'})
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('lightning bolt');
                expect(res.body.manaCost).to.equal('1R')
                expect(res.body.tags.length).to.equal(2);
                expect(res.body.tags[1]).to.equal('one drop')
                done();
            });
        });
    });

    describe('[DELETE] /card/:name', () => {
        it('should delete the desired card', (done) => {
            chai.request(server)
            .delete('/card/lightning+bolt')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true)
            });
            chai.request(server)
            .get('/cards')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                expect(Array.isArray(res.body)).to.equal(true);
                expect(res.body.length).to.equal(0);
                done();
            })
        });
    });
});

describe('/cards', () => {
    beforeEach((done) => {
        Card.remove((err) => {
            if (err) console.log(err);
            done();
        });
    });

    describe('[GET] /cards', () => {
        it('should get all the cards', (done) => {
            chai.request(server)
                .get('/cards')
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(0);

                    done();
                });
        });
    });

    describe('[POST] /cards', () => {
        it('should add a new card', (done) => {
            const card = {
                name: 'shock',
                manaCost: '1R',
                tags: ['burn']
            }
            chai.request(server)
                .post('/cards')
                .send(card)
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('shock');
                    expect(res.body.manaCost).to.equal('1R');
                    expect(res.body.tags[0]).to.equal('burn');
                    expect(res.body.tags.length).to.equal(1);
                    done();
                });
        });
    });
});
