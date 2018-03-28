const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Record = require('./models');

describe('Records', () => {
  describe('getRecordByName', () => {
    it('should return the record with the given albumName', () => {
      const record = new Record({
        artistName: "The Beatles",
        albumName: 'The White Album',
        recordType: 'LP',
      });
      expect(record.getRecordByName()).to.equal('The White Album');
    });
  });
  describe('getAllRecords', () => {
    it('should return all the bands', () => {
      sinon.stub(Record, 'find');
      Record.find.yields(null, [
        {   artistName: "The Beatles", albumName: 'The White Album', recordType: 'LP' },
        {   artistName: "The Beatles", albumName: 'Abbey Road', recordType: 'LP' }
      ]);
      Record.getAllRecords((records) => {
        expect(records.length).to.equal(2);
        expect(records[0].albumName).to.equal('The White Album');
      });
    });
  });
});
