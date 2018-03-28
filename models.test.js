const mongoose = require('mongoose');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Record = require('./models');

describe('Records', () => {
  it('should return the record with the given name', () => {
    const record = new Record({
      name: "The White Album",
      recordType: "LP",
    });
    expect(record.getRecordByName()).to.equal('The White Album');
  });
})