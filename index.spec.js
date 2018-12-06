const request = require('supertest')

const server = require('./index.js')


describe('server.js', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200)
    })

    it('should return a json object', async () => {
      let response = await request(server).get('/')
      expect(response.type).toBe('application/json')
    })
  })

  describe('/hello route', () =>{
    it('should return with a body like this {message: hello}', async ()=> {
      let response = await request(server).get('/hello')
      expect(response.body).toEqual({message: 'hello'})

    })

    it('should return status code 200', async () => {
      let response = await request(server).get('/hello');
      expect(response.status).toBe(200)
    })

  })

  describe('the POST /hello route', () => {
    it('should return status code 201', async () => {
      let response = await request(server).post('/hello');
      expect(response.status).toBe(201)
    })

    it('should return a message', async () =>{
      let response = await request(server)
        .post('/hello')
        .send({firstName: 'chad', lastName: 'jemmett'});
      expect(response.body).toEqual({hello: 'chad jemmett'})
    })

    it('should return 400 if there is no info in the body', async () =>{
      let response = await request(server)
        .post('/hello')
        .send({firstName: '', lastName: ''});
      expect(response.status).toBe(400)
    })
  })

  describe('the DELETE /hello route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).delete('/hello/1')
      expect(response.status).toBe(200)
    })

    it('should return the number of items deleted', async () => {
      let response = await request(server).delete('/hello/1')
      expect(response.body).toEqual(1)
    })
  })


})
