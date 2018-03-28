
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Team = require('./models');

describe('Server', () => {
    describe('[POST] /team', () => {
        it('should add a new team', () => {
            const newTeam = {
                name: 'Arsenal',
                sport: 'Soccer',
            };
            chai.request(server)
            .post('/team')
            .send(newTeam)
            .end((err, res) => {
                if (err) console.error(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('Arsenal');
            });
        });
    });

    describe('[GET] /teams', () => {
        it('should return `Gonna get ready for some FootBall`', () => {
            chai.request(server)
            .get('/teams')
            .end((err, res) => {
                if (err) console.error(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.equal('Gonna get ready for some FootBall');
            });
        });
    });
});