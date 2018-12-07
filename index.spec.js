const request = require('supertest')
const server = require('./api/server.js')

describe('server', () => {
  describe('get to /', () => {
    it('should return status code 200', async () => {
      let res = await request(server).get('/')
      expect(res.status).toBe(200)
    })
    it('should return JSON', async () => {
      let res = await request(server).get('/')
      expect(res.type).toBe('application/json')
    })
    it('should return sanity check', async () => {
      let res = await request(server).get('/')
      expect(res.body).toEqual({ api: 'runnin' })
    })
  })

  describe('post to /menu', () => {
    it('should add a dish', async () => {
      let res = await request(server)
        .post('/menu')
        .send({ dish: 'ravioli' })
      expect(res.body).toEqual({ message: 'dish prepared' })
    })
    it('should return JSON', async () => {
      let res = await request(server)
        .post('/menu')
        .send({ dish: 'ravioli' })
      expect(res.type).toBe('application/json')
    })
  })

  describe('delete to /menu', () => {
    it('should delete a dish', async () => {
      let res = await request(server).delete('/menu/1')
      expect(res.body).toEqual({ message: 'dish eaten' })
    })
    it('should return JSON', async () => {
      let res = await request(server)
        .post('/menu')
        .send({ dish: 'ravioli' })
      expect(res.type).toBe('application/json')
    })
  })
})
