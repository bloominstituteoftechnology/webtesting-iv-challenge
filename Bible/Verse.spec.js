const mongoose = require('mongoose');

const Verse = require('./Verse');

expect.extend({
  toBeLongerThan(received, argument) {
    const pass = received.length >= argument;
    if (pass) {
      return {
        message: () => `expected quote to be longer than ${argument}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected quote to be longer than ${argument}, and was only ${received.length}`,
        pass: false,
      };
    }
  },
});

describe('Verse model', () => {
  beforeAll(() => {
    //connect to the database before all testing
    return mongoose.connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'));
  });

  beforeEach(() => {

  });

  afterEach(() => {
    return Verse.remove();
  })
  
  afterAll(() => {
    //disconnect from the database to close the connection.
    return mongoose.disconnect();
  })

  it('Should contain bibleVersion, scriptureBody, passage, and commentary title', async () => {
    const verse = {
      bibleVersion: 'King James Version',
      scriptureBody: 'I know thy works, and thy labour, and thy patience, and how thou canst not bear them which are evil: and thou hast tried them which say they are apostles, and are not, and hast found them liars:',
      passage: 'Revelation 2:2',
    };

    const savedVerse = await Verse.create(verse);

    expect(savedVerse.bibleVersion).toEqual(verse.bibleVersion);
    expect(savedVerse.scriptureBody).toBeLongerThan(50);
    expect(savedVerse.passage).toContain(':');
  })

  // Test to see if a commentary is being searched for, and if found, listed.
  it('', () => {
    
  })
})