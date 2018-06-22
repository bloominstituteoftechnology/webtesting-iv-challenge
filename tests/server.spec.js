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

  describe('Drink Endpoints:', () => {

    const testDrink = {
      name: "Green Tea",
      type: "tea",
      alcoholic: false,
      description: "Tea:liciously yours"
    };
  
    it('POST: Makes a new drink with a 201 smile and JSON response.', async () => {
      const expectedStatusCode = 201;
  
      const response = await superRequest(server)
        .post('/drinks')
        .send(testDrink);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual(expect.objectContaining(testDrink));
    });

    it('POST: Rejects your drink order because you can\'t speak Italian', async () => {
      const expectedStatusCode = 400;

      const badTestDrink = {
        name: false,
        type: "yellow",
        alcoholic: "i wish",
        description: 21
      };

      const response = await superRequest(server).post('/drinks',badTestDrink);
      expect(response.status).toBe(expectedStatusCode);
    })
  
    it('GET: Gets drinks and serves them to you in an array cup carrier and a 200 status code.', async () => {
      const expectedStatusCode = 200;
  
      const response = await superRequest(server).get('/drinks');
      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual([expect.objectContaining(testDrink)]);
    });

    it('DOES NOT GET: no coffee for you, bruh', async () => {
      const expectedStatusCode = 418;

      const response = await superRequest(server)
        .get('/drinks')
        .send({type: "coffee"});
      expect(response.status).toBe(expectedStatusCode);
    });
  
    
    it('DELETE: Throws away the drink because it\'s not alcoholic', async () => {
      const expectedStatusCode = 200;
      const { name } = testDrink;
      
      const response = await superRequest(server)
        .delete('/drinks')
        .send({ name });
      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual(expect.objectContaining(testDrink));
    });
    
    it('DELETE: Cannot throw away what hasn\'t been made', async () => {
      const expectedStatusCode = 404;
    
      const response = await superRequest(server)
        .delete('/drinks')
        .send({ name: "Orion" });

      expect(response.status).toBe(expectedStatusCode);
    });
  });
});

