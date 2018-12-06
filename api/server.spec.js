const request = require('supertest')
const server = require('./server')
describe('Server endpoints', () => {

  describe('/ Routes', () => {

    it('/ should return a message', async () => {
      const response = await request(server).get('/')

      expect(response.body).toEqual({message: 'eh'});
      
    });
    
  });
  
});