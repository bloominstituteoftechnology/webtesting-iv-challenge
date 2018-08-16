const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
  describe('POST /api/users failure response', () => {
    it('should return status code 400 if username or password is not provided', async () => {
      const user1 = { username: 'Cesar' }
      const expected = 400

      const res1 = await request(server).post('/api/users').send(user1)
      expect(res1.status).toEqual(expected)

      const user2 = { password: 'letmein' }
      const res2 = await request(server).post('/api/users').send(user2)
      expect(res2.status).toEqual(expected)
    })

    describe('POST /api/users success response', () => {
      let user, res
      beforeEach(async () => {
        user = { username: 'Cesar', password: 'letmein' }
        res = await request(server).post('/api/users').send(user)
      })
      it('should return status code 201 upon user creation', () => {
        const expected = 201
        expect(res.status).toEqual(expected)
      })

      it('should return JSON type response upon user creation', () => {
        const expected = 'application/json'
        expect(res.type).toEqual(expected)
      })

      it('should return {msg: user account ([username]) created.} upon user creation', () => {
        const expected = { msg: `user account (${user.username}) created.` }
        expect(res.body).toEqual(expected)
      })
    })
  })

  describe('DELETE /api/users/:id', () => {
    let res, id
    beforeEach(async () => {
      id = 1
      res = await request(server).delete(`/api/users/${id}`)
    })

    it('should return status code 200 when deleting a user', () => {
      const expected = 200
      expect(res.status).toEqual(expected)
    })

    it('should return JSON type response upon deletion', () => {
      const expected = 'application/json'
      expect(res.type).toEqual(expected)
    })
    it('should return { msg: user with id [id] successfully deleted. } in response body', () => {
      const expected = { msg: `user with id ${id} successfully deleted.` }
      expect(res.body).toEqual(expected)
    })
  })
})
