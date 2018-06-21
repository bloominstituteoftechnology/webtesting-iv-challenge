const server = require('./server');
const request = require('supertest');
const db = require('./data/db');

beforeAll(() => {
  /**
   * db.connect(): if the connection is on server.js it is nor neccesary to connect here in the server.test.js
   */
  //   db.connectTo('server_testing')
  //     .then(() => console.log('\n... SERVER TEST Connected to Database ...\n'))
  //     .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));
});
afterAll(() => {
  return db.disconnect();
});

describe('GET', () => {
  const endpoint = '/';
  let response;
  beforeAll(async () => {
    response = await request(server).get('/');
  });
  test('Return a 200 code', async () => {
    expect(response.status).toEqual(200);
  });
  test('Response`s body is of type JSON', () => {
    expect(response.type).toBe('application/json');
  });
});
describe('POST', () => {
  const endpoint = '/';
  const newData = { field1: 'Hola Caracola', field2: 'qué pasa calbaza', password: 'no te lo vas a creer' };
  let response;
  beforeAll(async () => {
    response = await request(server).post(newData);
  });
  test.only('Request`s body must be of type JSON', () => {});
  test('Collection.create( newDocument ) -> must return the newy created Document', () => {});
  test('If Document to create contains a password -> Encrypt password', () => {});
});
describe('DELETE', () => {
  const endpoint = '/:id';
  test('Does the Document to delete exist?', () => {});
  test('MongoDB must confirm the deletion form the database.', () => {});
  test('The Response must confirm the deletion form the database.', () => {});
});
