const request = require('supertest');

const db = require('./data/dbConfig.js');

const names = require('./data/namesModal.js');

const server = require('./server.js');


describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            
            expect(response.status).toBe(200);
        });
        
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            
            expect(response.type).toBe('application/json');
        });
        
        it('should return with a body like: { api: "alive" }', async () => {
            let response = await request(server).get('/');
            
            expect(response.body).toEqual({ api: 'alive' });
        });
    });

    describe('/api/names get route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/api/names');
            
            expect(response.status).toBe(200);
        });
        
        it('should return JSON', async () => {
            let response = await request(server).get('/api/names');
            
            expect(response.type).toBe('application/json');
        });
    });

    describe('/api/names/:id delete route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).delete('/api/names/:id');
            
            expect(response.status).toBe(200);
        });
        
        it('should return JSON', async () => {
            let response = await request(server).delete('/api/names/:id');
            
            expect(response.type).toBe('application/json');
        });
    });
    
    beforeEach(async () => {
        await db('names').truncate();
      });
      
  describe('create user', () => {
    it('should insert provided name', async () => {
        let rows = await db('names').where({ name: 'sam' });
        expect(rows).toHaveLength(0);

        await names.insert({ name: 'sam' });
        await names.insert({ name: 'frodo' });

        rows = await db('names').where({ name: 'sam' });
        expect(rows).toHaveLength(1);

        rows = await db('names');
        expect(rows).toHaveLength(2);
    });

    it('should return status code 200', async () => {
        let response = await request(server).post('/api/names').send({ name: 'steve' });
        expect(response.status).toBe(200);
      });
  });

  describe('delete name', () => {
    it('should delete specified name', async () => {
        let post = await request(server).post('/api/names').send({ name: 'steve' });
        let response = await request(server).delete('/api/names/1');
        expect(response.body).toBe(1);
    });
     it('should respond in JSON', async () => {
        let response = await request(server).delete('/api/names/1');
        expect(response.type).toBe('application/json');
    });
     it('should return correct status code', async () => {
        let response = await request(server).delete('/api/names/1');
        expect(response.status).toBe(200);
    });
  });
});
