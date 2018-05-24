const mongoose = require('mongoose');

const Commentary = require('./Commentary');

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

describe('Commentary model', () => {
  beforeAll(() => {
    //connect to the database before all testing
    return mongoose.connect('mongodb://localhost/testingdb')
      .then(console.log('connected to test db'));
  });

  beforeEach(() => {

  });

  afterEach(() => {
    return Commentary.remove();
  })
  
  afterAll(() => {
    //disconnect from the database to close the connection.
    return mongoose.disconnect();
  })

  it('Should contain an author, verse association, and commentary title and body', async () => {
    const commentary = {
      authorFirstName: 'J. Vernon',
      authorLastName: 'McGee',
      commentaryTitle: 'Thru The Bible, Vol. 5',
      quoteBody: '"I know thy works."  We need to understand that He is speaking to believers.  The Lord Jesus does not ask the lost world for good works.',
      scripture: 'Revelation 2:2',
    };

    const savedCommentary = await Commentary.create(commentary);

    expect(savedCommentary.authorFirstName).toEqual(commentary.authorFirstName);
    expect(savedCommentary.authorLastName).toEqual(commentary.authorLastName);
    expect(savedCommentary.commentaryTitle).toEqual(commentary.commentaryTitle);
    expect(savedCommentary.quoteBody).toBeLongerThan(50);
    expect(savedCommentary.scripture).toContain(':');
  })

  it('', () => {
    
  })
})