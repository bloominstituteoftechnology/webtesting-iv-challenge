const request = require('supertest')

const server = require('./api/server.js')

describe('server.js', () => {
  describe('POST /items', () => {
    it('should return 201 if good request is sent', async () => {
      const item = 'walrus'
      let response = await request(server)
        .post('/items')
        .send({ item })
      expect(response.status).toBe(201)
    })

    it('should return 400 if bad request is sent', async () => {
      const person = '45'
      let response = await request(server)
        .post('/items')
        .send({ person })

      expect(response.status).toBe(400)
    })
  })

  describe('DELETE /items', () => {
    it('should return 200 if good request is sent', async () => {
      const item = 'walrus'
      let response = await request(server).delete(`/items/${item}`)
      expect(response.status).toBe(200)
    })

    it('should return 400 if bad request is sent', async () => {
      let response = await request(server).delete('/items')
      expect(response.status).toBe(400)
    })
  })
})
