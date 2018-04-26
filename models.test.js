const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const Band = require('./band');

const expect = chai.expect;

describe('Band', () => {
    let bandId;
    before(done => {
        mongoose.connect('mongoose://localhost/test', {}, err => {
            if(err) return console.log(error);
            console.log('Db connected')
        });
        done();
    });

    after(done => {
        console.log(mongoose.connection);
        mongoose.connection.close(err => {
            if (err) {
                return console.log(err);
            }
            done();
        });
    });

    describe('getGenre', () => {
        it('should return the genre of the band', done => {
            const band = new Band({name:'Mineral', genre:'Emo'});
            expect(band.getGenre()).to.equal('Emo');
            done();
        })
    })


})