const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  describe('GET /', () => {
    
    it('should return status code 200(OK) when successful', async () => {
      const response = await request(server).get('/');
  
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });

    it('should return { message: "Server check" }', async  () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'Server check' });
    })
  });
  
  describe('POST /students', () => {

    it('should return status code 201(Created) when successful', async () => {
      const firstName = 'Casey';
      const lastName = 'Baker';
      const house = 'Slytherin';
      
      const student = { firstName: `${firstName}`, lastName: `${lastName}`, house: `${house}` }

      const response = await request(server)
        .post('/students')
        .send(student);

      expect(response.status).toBe(201);
    })

    it('should return error if missing a field', async () => {
      const response = await request(server)
        .post('students')
        .send({ firstName: 'Casey' });

        expect(response.status).toBe(400);

    })

    it('should return the created resource', async () => {
      const firstName = 'Casey';
      const lastName = 'Baker';
      const house = 'Slytherin';
      const student = { firstName: `${firstName}`, lastName: `${lastName}`, house: `${house}` }

      const response = await request(server)
        .post('/students')
        .send(student);

        expect(response.body).toEqual(student);
    })
  })

  describe('DELETE /students/:id', () => {
    it('should return status code 200(OK) when successful', async () => {
      //return correct status code
    })

    it('should return deleted item', async () => {
      //return deleted item
    })
  })
});