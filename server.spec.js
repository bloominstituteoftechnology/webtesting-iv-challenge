const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
  describe('root endpoint (/)', () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;

      const res = await request(server).get('/')

      expect(res.status).toEqual(expected)
    })

    it('should return JSON', async () => {

      const res = await request(server).get('/')

      expect(res.type).toEqual('application/json')
    })

    it('should return api running', async () => {
      const expected = {"data": {
         "monks": [
           "Xifu",
           "Kal Ahl",
           "Tripitaka",
        ]
       } }

      const res = await request(server).get('/')

      expect(res.body).toEqual(expected)
    })

    it('should return hello and the returned name on post', async () => {
      const expected = { hello: 'Xixi' };

      const res = await request(server)
        .post('/')
        .send({ name: 'Xixi' })

      expect(res.body).toEqual(expected)

    })

    it('should add name to list of monks', async () => {
      const expected = { hello: 'Xixi' };

      const res = await request(server)
        .post('/')
        .send({ name: 'Xixi' })


      expect(res.body).toEqual(expected)

    })

    it('should return deleted name', async () => {
      const expected = { name: 'Tripitaka' };

      const res = await request(server)
        .delete('/', )
        .send({ name: 'Tripitaka' })

      expect(res.body).toEqual(expected)

    })

    it('should remove name from list of monks', async () => {
      const expected = { hello: 'Tripitaka' };

      const res = await request(server)
        .delete('/')
        .send({ name: 'Tripitaka' })

      expect(res.body).toEqual(expected)

    })

    it('should remove name from list of monks', async () => {
      const expected = { hello: 'Tripitaka' };

      const res = await request(server)
        .delete('/')
        .send({ name: 'Tripitaka' })

      expect(res.body).toEqual(expected)

    })

  })
})
