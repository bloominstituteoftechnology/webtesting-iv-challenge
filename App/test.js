const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Mod = require('./sm64mods');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const newMod = {
    title: 'Super Mario: Last Impact',
    creator: 'Kaze',
    description: 'Custom programming fun mod',
    uniqueLevels: true,
    difficulty: 6,
    reviews: [{
        userRating: 4,
        text: 'super fun and unique but the bugs suck'
    },
    {
        userRating: 1,
        text: 'no luigi in dis game :('
    }]
}

const newMod2 = {
    title: 'Super Portal 64',
    creator: 'Kaze',
    description: 'Use a portal gun in the normal game',
    uniqueLevels: false,
    difficulty: 0,
    reviews: [{
        userRating: 5,
        text: 'I have been waiting for this for a long time'
    },
    {
        userRating: 2,
        text: 'put luigi in dis game :('
    }]
}

const newMod3 = {
    title: 'Super Mario: Star Road',
    creator: 'Cole Ferguson',
    description: '130 stars, new levels and bosses',
    uniqueLevels: true,
    difficulty: 4,
    reviews: [{
        userRating: 5,
        text: 'feels like a real sequel'
    },
    {
        userRating: 1,
        text: 'no luigi in dis game either :('
    }]
}

describe('./server', () => {
    beforeEach((done) => {
        Mod.remove({}, (err) => {
            if (err) console.log(err);
            done();
        })
    })

    describe('[GET] /mods', () => {
        it('should get an empty array', (done) => {
            chai.request(server)
                .get('/mods')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(0);
                    done();
                })
        })
        it('should get 3 mods back after saving 3', (done) => {
            const mod = new Mod(newMod);
            mod.save()
                .then(() => {
                    const mod2 = new Mod(newMod2);
                    mod2.save()
                        .then(() => {
                            const mod3 = new Mod(newMod3);
                            mod3.save().then(() => {
                                chai.request(server)
                                    .get('/mods')
                                    .end((err, res) => {
                                        if (err) return console.log(err);
                                        expect(res.status).to.equal(200);
                                        expect(Array.isArray(res.body)).to.equal(true);
                                        expect(res.body.length).to.equal(3);
                                        done();
                                    })
                            })
                        })
                })
        })
    })
    describe('[POST] /mods', () => {
        it('should post a new mod', (done) => {
            chai.request(server)
                .post('/mods')
                .send({ title: 'cool mod 2', creator: 'unknown', uniqueLevels: true })
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal('cool mod 2');
                    done();
                })
        })
        it('should reject incomplete information', (done) => {
            chai.request(server)
            .post('/mods')
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(422);
                done();
            })  
        })
    })

    describe('[PUT] /mods/:id', () => {
        let idParam = '';
        beforeEach((done) => {
            const mod = new Mod(newMod);
            mod.save()
                .then((modThen) => {
                    idParam = modThen._id;
                    done();
                })
                .catch(() => {
                    console.log('failed to save initially before [PUT]')
                })
        })

        it('should add a comment', (done) => {
            chai.request(server)
                .put(`/mods/${idParam}`)
                .send({ userRating: 3, text: 'had fun but its way too hard' })
                .end((err, res) => {
                    if (err) return console.log('err');
                    expect(res.status).to.equal(200);
                    expect(res.body.reviews.length).to.equal(3);
                    expect(res.body.reviews[2].userRating).to.equal(3);
                    done();
                })
        })
        it('should reject incomplete comment information', (done) => {
            chai.request(server)
                .put(`/mods/${idParam}`)
                .send({})
                .end((err, res) => {
                    expect(res.status).to.equal(422);
                    done();
                })  
        })
    })

    describe('[DELETE] /mods/:id', () => {
        it('should remove a mod', (done) => {
            let idParam = '';
            const mod = new Mod(newMod);
            mod.save()
                .then((modThen) => {
                    idParam = modThen._id;
                    chai.request(server)
                        .delete(`/mods/${idParam}`)
                        .end((err, res) => {
                            if (err) return console.log('err');
                            expect(res.status).to.equal(200);
                            done();
                        })
                })
                .catch(() => {
                    console.log('failed to save initially before [DELETE]')
                })
            
        })
    })
})

describe('./sm64mods', () => {
    
    beforeEach((done) => {
        Mod.remove({}, (err) => {
            if (err) console.log(err);
        })
        done();
    })

    describe('Mod Schema', () => {
        it('should be able to be created with all options', (done) => {
            const mod = new Mod(newMod)
            mod.save()
                .then((savedMod) => {
                    expect(savedMod.title).to.equal('Super Mario: Last Impact');
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
        })
        it('should not save when `title` is a duplicate', (done) => {
            const mod = new Mod(newMod);
            mod.save()
            const mod2 = new Mod(newMod);
            mod2.save()
            chai.request(server)
                .get('/mods')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(1);
                    done();
                })
        })
        it('should error when `title` is not saved', (done) => {
            const mod = new Mod({
                creator: 'Kaze',
                uniqueLevels: false
            });
            mod.save()
            chai.request(server)
                .get('/mods')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(0);
                    done();
                })
        })
        it('should error when `creator` is not saved', (done) => {
            const mod = new Mod({
                title: 'Super Awesome 65',
                uniqueLevels: false
            });
            mod.save()
            chai.request(server)
                .get('/mods')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(0);
                    done();
                })
        })
        it('should error when `uniqueLevels` is not saved', (done) => {
            const mod = new Mod({
                title: 'Super Simpleflips 64',
                creator: 'Kaze'
            });
            mod.save()
            chai.request(server)
                .get('/mods')
                .end((err, res) => {
                    if (err) return console.log(err);
                    expect(res.status).to.equal(200);
                    expect(Array.isArray(res.body)).to.equal(true);
                    expect(res.body.length).to.equal(0);
                    done();
                })
        })
        it('should return the correct rating on the schema method', (done) => {
            const mod = new Mod(newMod3);
            const rating = mod.getAvgRating();
            expect(rating).to.equal(3);
            done();
        })
    })
})