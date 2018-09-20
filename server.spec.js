const request = require('supertest')
const server = require('./server.js')

describe('server.js', () => {
  it('should return status code 201 (created)', async () => {
    const response = await request(server)
      .post('/')
      .send({ Title: 'Loonys 2', Actors: '2Poor, Bruh, Head' })
    expect(response.status).toEqual(201)
  })
})

describe('server.js', () => {
  it('should return status code 201 (created)', async () => {
    const id = 5
    const response = await request(server).delete(`/api/delete/${id}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ msg: `Movie of ${id} deleted.` })
  })
})
