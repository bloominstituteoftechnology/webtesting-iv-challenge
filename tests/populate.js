const Ama = require('../mvc/models/ama/ama');

const serverTestAmas = [
  { question: 'Are you in love with Lambda School?' },
  { question: 'What are your plans after you graduate from Lambda School?' },
];

const populateServerTestDb = _ => {
  return Promise.all(serverTestAmas.map(ama => Ama(ama).save()));
};

const getTestAmasLength = _ => {
  return serverTestAmas.length;
};

module.exports = { populateServerTestDb, getTestAmasLength };
