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
      const first = 'Casey';
      const last = 'Baker';
      const house = 'Slytherin';
      
      const student = { first: `${first}`, last: `${last}`, house: `${house}` }

      const response = await request(server)
        .post('/students')
        .send(student);

      expect(response.status).toBe(201);
    })

    it('should return error 400 if missing a field', async () => {
      const response = await request(server)
        .post('/students')
        .send({ first: 'Casey' });

        expect(response.status).toBe(400);

    })

    it('should return the created resource', async () => {
      const first = 'Casey';
      const last = 'Baker';
      const house = 'Slytherin';
      
      const student = { first: `${first}`, last: `${last}`, house: `${house}` }

      const response = await request(server)
        .post('/students')
        .send(student);

        expect(response.body).toEqual(student);
    })
  })

  describe('DELETE /students/:id', async () => {
    it('should return status code 200(OK) when successful', async () => {
      const id = 3;

      const response = await request(server)
        .delete(`/students/:${id}`)

      expect(response.status).toBe(200);

    })

    it('should return farewell message when successful', async () => {
      const id = 5;
     
      const response = await request(server)
        .delete(`/students/:${id}`)

      expect(response.body).toEqual({message: `Farewell!`});
    })
  })
});