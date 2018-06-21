const server = require('./server');
const Request = require('supertest');
const db = require('./data/db');

beforeAll(() => {
  db.connectTo('server_testing')
    .then(() => console.log('\n... SERVER TEST Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));
});
afterAll(() => {
  return db.disconnect();
});

describe('GET', () => {
  const endpoint = '/';
  test('Return a 200 code', () => {});
  test('Response`s body is of type JSON', () => {});
});
describe('POST', () => {
  const endpoint = '/';
  test('Request`s body must be of type JSON', () => {});
  test('Collection.create( newDocument ) -> must return the newy created Document', () => {});
  test('If Document to create contains a password -> Encrypt password', () => {});
});
describe('DELETE', () => {
  const endpoint = '/:id';
  test('Does the Document to delete exist?', () => {});
  test('MongoDB must confirm the deletion form the database.', () => {});
  test('The Response must confirm the deletion form the database.', () => {});
});
