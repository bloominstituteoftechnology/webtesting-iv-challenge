const server = require('./server');
const request = require('supertest');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
  
      it('should return status code 200 OK', async () => {
        const expected = 200;
        const response = await request(server).get('/');
        expect(response.status).toEqual(expected);
      });
  
      it('should return JSON', async () => {
        const response = await request(server).get('/');
        expect(response.type).toEqual('application/json');
      });
  
      it('should return object  {api:running} ', async () => {
        const expected = { api: 'running' };
        const response = await request(server).get('/');
        expect(response.body).toEqual(expected);
      });
    });
  
    describe('GET endpoint(/students)', () => {
  
      it('should return status code 200 OK', async () => {
        const expected = 200;
        const response = await request(server).get('/students');
        expect(response.status).toEqual(expected);
      });
  
      it('should return JSON', async () => {
        const response = await request(server).get('/students');
        expect(response.type).toEqual('application/json');
      });
  
      it('should return object that looks like expected ', async () => {
        const expected = { students: 'List of students' };
        const response = await request(server).get('/students');
        expect(response.body).toEqual(expected);
      });
    });
  
    describe('POST endpoint (/students)', () => {
  
      it('should return status code 201 created', async () => {
        const expected = 201;
        const response = await request(server)
          .post('/students')
          .send({ student: 'Das' });
        expect(response.status).toEqual(expected);
      });
  
      it('should return JSON', async () => {
          const response = await request(server).get('/students');
          expect(response.type).toEqual('application/json');
        });
  
      it('should return created student', async () => {
        const expected = { student: 'Das' };
        const response = await request(server)
          .post('/students')
          .send({ student: 'Das' });
        expect(response.body).toEqual(expected);
      });
    });
  
    describe('DELETE (/students/:student)', () => {
      
      it('should return status code 200 OK', async () => {
        const expected = 200;
        const response = await request(server).delete('/students/:student');
        expect(response.status).toEqual(expected);
      });
  
      it('should return JSON', async () => {
          const response = await request(server).delete('/students/Das');
          expect(response.type).toEqual('application/json');
        });
  
      it('should return message that says `Success in deleting {student}`', async () => {
        const expected = { Message: `Deleted Das` };
  
        const response = await request(server).delete('/students/Das');
  
        expect(response.body).toEqual(expected);
      });
    });
  });