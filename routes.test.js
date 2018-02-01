const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app-test');

const chai =require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const expect =chai.expect();
const server =  require('server');

describe('greet api', () => {

    describe(`[GET] '/greet`, () => {
        it('it should return a message', done => {
        
            chai.request(server)
            .get('/greet')
            .end((err,res) => {
                if (err) console.log(err);
                expect(res.status).to.equal(200);
                done();
            });
        });

    });
});

