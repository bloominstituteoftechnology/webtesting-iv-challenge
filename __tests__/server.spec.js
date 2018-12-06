const request = require('supertest')
const server = require('../api/server.js')

describe('server', () => {
  describe("GET '/'", () => {
    it('should respond with a status code of 200(OK) when requested', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
    it('should return a JSON response', async () => {
      const response = await request(server).get('/')
      expect(response.type).toBe('application/json')
    })
    it('should return the following object as a response {message: success}', async () => {
      const response = await request(server).get('/')
      expect(response.body).toEqual({ message: 'success' })
    })
  })
})

describe('POST /api/library', () => {
  it('should return a status of 201(Added) if the post is successful', async () => {
    const artist = 'Janis Joplin'
    const album = 'Pearl'
    const description = 'One of the best albums of all time.'
    const songs = {
      sideOne : [ 'Move Over', 'Cry Baby', 'A Woman Left Lonely', 'Half Moon', 'Buried Alive in the Blues' ],
      sideTwo : [ 'My Baby', 'Me and Bobby McGee', 'Mercedes Benz', 'Trust Me', 'Get It While You Can' ],
    }
    const entry = { artist: `${artist}`, album: `${album}`, description: `${description}`, songs: `${songs}` }
    const response = await request(server).post('/api/library').send(entry)
    expect(response.status).toBe(201)
  })
  it('should return error 400 if missing required properties', async () => {
    const response = await request(server).post('/api/library').send({ artist: 'Janis' })
    expect(response.status).toBe(400)
  })
  it('should return the newly created entry object', async () => {
    const artist = 'Janis Joplin'
    const album = 'Pearl'
    const description = 'One of the best albums of all time.'
    const songs = {
      sideOne : [ 'Move Over', 'Cry Baby', 'A Woman Left Lonely', 'Half Moon', 'Buried Alive in the Blues' ],
      sideTwo : [ 'My Baby', 'Me and Bobby McGee', 'Mercedes Benz', 'Trust Me', 'Get It While You Can' ],
    }
    const entry = { artist: `${artist}`, album: `${album}`, description: `${description}`, songs: `${songs}` }
    const response = await request(server).post('/api/library').send(entry)
    expect(response.body).toEqual(entry)
  })
})
describe('DELETE /api/library/:id', async () => {
  it('should return 200(OK) if the entry is successfully deleted', async () => {
    const id = 2
    const response = await request(server).delete(`/api/library/:${id}`)
    expect(response.status).toBe(200)
  })
  it('should return a message to the client when deleted', async () => {
    const id = 7

    const response = await request(server).delete(`/api/library/:${id}`)
    expect(response.body).toEqual({ message: `The entry was successfully deleted` })
  })
})
