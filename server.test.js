const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
  describe('POST /users', () => {
    it('should return status code 400 if username or password is not provided', async () => {
      const user1 = { username: 'Cesar' }
      const expected = 400

      const res1 = await request(server).post('/api/users').send(user1)
      expect(res1.status).toEqual(expected)

      const user2 = { password: 'letmein' }
      const res2 = await request(server).post('/api/users').send(user2)
      expect(res2.status).toEqual(expected)
    })

    it('should return status code 201 upon user creation', async () => {
      const user = { username: 'Cesar', password: 'letmein' }
      const expected = 201

      const res = await request(server).post('/api/users').send(user)

      expect(res.status).toEqual(expected)
    })

    it('should return {msg: user account ([username]) created.} upon user creation', async () => {
      const user = { username: 'Cesar', password: 'letmein' }
      const expected = { msg: `user account (${user.username}) created.` }

      const res = await request(server).post('/api/users').send(user)

      expect(res.body).toEqual(expected)
    })
  })

  describe('DELETE /users', () => {})
})
