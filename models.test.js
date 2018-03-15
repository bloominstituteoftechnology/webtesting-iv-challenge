const mongoose = require('mongoose');
const Marsupial = require('./models/marsupial');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Marsupials', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/Marsupial');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Connected');
            done();
        });
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    describe('getMarsupialName', () => {
        it('Should provide the standard name of the Marsupial', () => {
            const newMarsupial = new Marsupial({

                name: 'Wombat',
                latinName: 'Vombatus ursinus',
                region: 'Southeastern Australia'

            });
            expect(newMarsupial.getName()).to.equal('Wombat');
        });
    });

    describe('getMarsupialLatinName', () => {
        it('Should provide the latin name of the Marsupial', () => {
            const newMarsupial = new Marsupial({

                name: 'Wombat',
                latinName: 'Vombatus ursinus',
                region: 'Southeastern Australia'

            });
            expect(newMarsupial.getLatinName()).to.equal('Vombatus ursinus');
        });
    });

    describe('getMarsupialRegion', () => {
        it('Should provide the regional habitat of the Marsupial', () => {
            const newMarsupial = new Marsupial({

                name: 'Wombat',
                latinName: 'Vombatus ursinus',
                region: 'Southeastern Australia'

            });
            expect(newMarsupial.getRegion()).to.equal('Southeastern Australia');
        });
    });
    
    describe('getAllMarsupials', () => {
        it('Should return all of the marsupials', () => {
            sinon.stub(Marsupial, 'find');
            Marsupial.find.yields(null, [{

                name: 'Wombat',
                latinName: 'Vombatus ursinus',
                region: 'Southeastern Australia'

            }]);
            Marsupial.getAllMarsupials(returnObject => {
                expect(returnObject.length).to.equal(1);
                expect(returnObject[0].name).to.equal('Wombat');
                Marsupial.find.restore();
            });
        });
    });
});