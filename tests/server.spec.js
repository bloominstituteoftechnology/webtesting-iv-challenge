/* Dependencies */
// Test Dependencies
const superRequest = require('supertest');
// Test Subjects!
const server = require('../server');

/* Tests */
describe('server.js', () => {

  describe('API is up and running',  () => {
    
    it('Request to \'/\' results in status code 200', async () => {
      const response = await superRequest(server).get('/');
      const expectedStatusCode = 200;
      expect(response.status).toBe(200);
    });

    it('Request to \'/\' results in JSON response { api: "is running"}', async () => {
      const expectedBody = { api: "is running" };
      const response = await superRequest(server).get('/');
      expect(response.body).toEqual(expectedBody);
    });
  });


});

describe('Drink Endpoints:', () => {

  const testDrink = {
    name: "Foldgers",
    type: "coffee",
    alcoholic: false,
    description: "The best part of waking up is Foldgers in your cup!"
  };

  it('Makes a new drink with a 201 smile and JSON response.', async () => {
    const expectedStatusCode = 201;

    const response = await superRequest(server).post('/drinks',testDrink);
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body).toEqual(testDrink);
  });

  it('Gets drinks and serves them to you in a JSON cup holder and a 200 status code.', async () => {
    const expectedStatusCode = 200;

    const response = await superRequest(server).get('/drinks');
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body).toEqual([testDrink]);
  });

  it('Throws away the drink because it\'s not alcoholic', async () => {
    const expectedStatusCode = 200;

    const response = await superRequest(server).delete('/drinks');
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body).toEqual([testDrink]);
  })
});