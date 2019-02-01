const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

afterEach(async () => {
   await db('tasks').truncate();
});

describe('server.js', () => {
   describe('GET/endpoint', () => {
      it('should respond with status code 200 ok', async () => {
         let res = await request(server).get('/');

         expect(res.status).toBe(200);
      });
      it('should respond with JSON', async () => {
         let res = await request(server).get('/');
         expect(res.type).toMatch(/json/i);
      });
   });

   describe('GET/tasks endpoint', () => {
      it('should respond with status code 200 ok', async () => {
         let res = await request(server).get('/tasks');
         expect(res.status).toBe(200);
      });
      it('should respond with JSON', async () => {
         let res = await request(server).get('/tasks');
         expect(res.type).toMatch(/json/i);
      });
      it('should respond with an array', async () => {
         let expected = [
            { id: 1, task: 'random task1' },
            { id: 2, task: 'random task2' },
         ];
         let res = await request(server)
            .post('/tasks')
            .send({ task: 'random task1' });
         res = await request(server)
            .post('/tasks')
            .send({ task: 'random task2' });
         res = await request(server).get('/tasks');
         expect(res.body).toEqual(expected);
      });
   });

   describe('POST/tasks endpoint', () => {
      it('should respond with status code 201 created', async () => {
         let body = { task: 'random dwarf' };
         let res = await request(server)
            .post('/tasks')
            .send(body);
         expect(res.status).toBe(201);
      });
      it('should return the id of the item created', async () => {
         let body = { task: 'random dwarf' };
         let res = await request(server)
            .post('/tasks')
            .send(body);
         // k
         expect(res.body).toEqual([1]);
      });
   });

   describe('DELETE/tasks/:id endpoint', () => {
      it('should return the number of item deleted', async () => {
         let res = await request(server)
            .post('/tasks')
            .send({ task: 'random task' });
         res = await request(server).delete('/tasks/1');
         expect(res.body).toBe(1);
      });
   });
});
