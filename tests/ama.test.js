const mongoose = require('mongoose');
const mongodAuth = require('../config').mongodAuth;
const Ama = require('../mvc/models/ama/ama');

const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const testAmas = [
  {
    question: 'What is your favorite thing about Lambda School?',
    answer:
      "I love the fact that I don't have to pay for anything until I get a job.",
    answered: true,
  },
  {
    question: 'Why do you live in Seattle?',
    answered: false,
  },
  {
    question: 'What made you go into the full-stack development?',
    answer: '$$$$',
    answered: true,
  },
  {
    question: 'What REALLY made you go into the full-stack development?',
    answer:
      'Okay you got me. I love computers. I also love science. Thus computer science.',
    answered: true,
  },
];

const notAnswered = 'Question not answered yet.';

describe('Amas', () => {
  before(done => {
    mongoose.connect(
      'mongodb://localhost/server-testing_model-test_db',
      mongodAuth,
    );

    const db = mongoose.connection;

    db.on('error', _ => console.log('Error connecting to db.'));
    db.once('open', _ => {
      // console.log('db connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(_ => {
      mongoose.connection.close(done);
    });
  });

  describe('getQuestion', () => {
    it('should return the expected question', () => {
      const test = testAmas[0];

      const ama = new Ama(test);

      expect(ama.getQuestion()).to.equal(test.question);
    });
  });

  describe('getAnswer', () => {
    it('should return `Not question answered yet` when not answered', () => {
      const test = testAmas[1];

      const ama = new Ama(test);

      expect(ama.getAnswer()).to.equal(notAnswered);
    });

    it('should return the expected answer when question is answered', () => {
      const test = testAmas[2];

      const ama = new Ama(test);

      expect(ama.getAnswer()).to.equal(test.answer);
    });
  });

  describe('getAllAmas', () => {
    it('should return all the amas', () => {
      sinon.stub(Ama, 'find');
      Ama.find.yields(null, testAmas);

      Ama.getAllAmas(amas => {
        expect(amas.length).to.equal(testAmas.length);
        expect(amas[0].question).to.equal(testAmas[0].question);
        expect(amas[1].question).to.equal(testAmas[1].question);
        expect(amas[2].question).to.equal(testAmas[2].question);
        expect(amas[3].question).to.equal(testAmas[3].question);

        expect(amas[0].answer).to.equal(testAmas[0].answer);
        expect(amas[1].answer).to.equal(testAmas[1].answer);
        expect(amas[2].answer).to.equal(testAmas[2].answer);
        expect(amas[3].answer).to.equal(testAmas[3].answer);

        expect(amas[0].answered).to.equal(testAmas[0].answered);
        expect(amas[1].answered).to.equal(testAmas[1].answered);
        expect(amas[2].answered).to.equal(testAmas[2].answered);
        expect(amas[3].answered).to.equal(testAmas[3].answered);

        Ama.find.restore();
      });
    });
  });
});
