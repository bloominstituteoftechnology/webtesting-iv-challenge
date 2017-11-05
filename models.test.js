const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const Card = require('./card');


const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('/cards', () => {
    beforeEach(() => {
        sinon.stub(Card, 'find');
    })
    afterEach(() => {
        Card.find.restore();
    })
    describe('#getName', () => {
        it('should get the cards name', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R'
            });
            expect(card.getName()).to.equal('shock');
            done();
        });
        it('should return a string', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R'
            });
            expect(typeof card.getName()).to.equal('string');
            done();
        })
    })
    describe('#getManaCost', () => {
        it('should get the cards ManaCost', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R'
            });
            expect(card.getManaCost()).to.equal('1R');
            done();
        });
        it('should return a string', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R'
            });
            expect(typeof card.getManaCost()).to.equal('string');
            done();
        })
    });

    describe('#getTags', () => {
        it('should get the cards Tags', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R',
                tags: ['burn']
            });
            expect(card.getTags()[0]).to.equal('burn');
            done();
        });
        it('should return an array', (done) => {
            const card = new Card({
                name: 'shock',
                manaCost: '1R',
                tags: ['burn']
            });
            expect(Array.isArray(card.getTags())).to.equal(true);
            done();
        })
    })
    describe('#getAllCards', () => {
        it('should return all the cards', () => {
            Card.find.yields(null, [{ name: 'shock', manaCost: '1R'}]);
            Card.getAllCards((cards) => {
                expect(cards.length).to.equal(1);
                expect(cards[0].name).to.equal('shock');
            });
        });
    })
});
