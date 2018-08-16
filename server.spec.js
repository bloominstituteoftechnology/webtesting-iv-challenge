const req = require('supertest');

const server = require('./server.js')

describe('Test of server.js', ()=> {

  describe ('The of endpoint /', () => {
    it('returns 200 from GET / ', async () => {
      const statusCode = 200;
      const res = await req(server).get('/')
      expect(res.status).toEqual(statusCode)
    })

    it('returns a json body', async () => {
      res = await req(server).get('/')
      expect(res.body).toEqual({msg:'Endpoint running'})
    })
  })

  describe('Test of endpoint: /users', () => {
    it('should GET a list of users', async () => {
      res = await req(server).get('/users')
      expect(res.body).toEqual([
        {id:1, username: "user1", password:"pass1"},
        {id:2, username: "user2", password:"pass2"},
        {id:3, username: "user3", password:"pass3"},
        {id:4, username: "user4", password:"pass4"},
        {id:5, username: "user5", password:"pass5"},
        {id:6, username: "user6", password:"pass6"},
      ])
    })


    it('should POST a new user', async () => {
      res = await req(server).post('/users').send({
        username:'newpost',
        password:'postpass'
      })
      
      expect(res.body).toEqual([
        {id:1, username: "user1", password:"pass1"},
        {id:2, username: "user2", password:"pass2"},
        {id:3, username: "user3", password:"pass3"},
        {id:4, username: "user4", password:"pass4"},
        {id:5, username: "user5", password:"pass5"},
        {id:6, username: "user6", password:"pass6"},
        {id:7, username:'newpost',password:'postpass'}
      ])
    })
  })
})