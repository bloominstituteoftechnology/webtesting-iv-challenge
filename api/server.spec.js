const request = require('supertest')
const server = require('./server')

describe('Server endpoints', () => {

  describe('/ route', () => {

    it('should return status code 200', async () => {
      const response = await request(server).get('/')

      expect(response.status).toBe(200);
    });
    it('/ should return a message', async () => {
      const response = await request(server).get('/')

      expect(response.body).toEqual({message: 'eh'});
      
    });
    
  });

  describe('/api route', () => {
    const url = '/api'
    
    describe('/api/users', () => {
      const url = '/api/users'
      it('should return status code 500 for users not in database', async () => {
        const response = await request(server).get(url+'/51')
        
        expect(response.status).toBe(500)
      });

      const userObj =  {
        name: 'bob',
        age: '35'
      }

      it('should return status code 201 for adding a user', async () => {
        const response = await request(server).post(url)
        
        expect(response.status).toBe(201);

      });
      it('should return 200 for users that exist', async () => {
        const response = await request(server).get(url+'/51')

        expect(response.body).toEqual({
          id: 51,
          ...userObj
        });
        
      });
    });
  });
  
});