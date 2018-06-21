const request = require('supertest')
const mongoose = require('mongoose')
const { userName, password } = require('faker').internet
const server = require('../server.js')
const User = require('../dead/character.js')

describe('Server API', () => {
  beforeAll(() => {
    const users = []
    for (let i = 0; i < 1; i++) {
      users.push({ username: userName(), password: password() })
    }
    return mongoose.connect('mongodb://localhost')
      .then(() => User.insertMany(users))
  })

  afterAll(() => {
    return User.remove()  
      .then(() => mongoose.disconnect())
  })

  it('should respond to request for API', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual({ api: 'API Is Running...' })
  })

  it('should respond to a request for /api/users', async () => {
    const response = await request(server).get('/api/users')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.users).toHaveLength(5)
  })

  it('should respond to a post to /api/users', async () => {
    const user = { username: userName(), password: password() }
    const response = await request(server).post('/api/users').send(user)

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body.user).toMatchObject({ username: user.username })
  })

  it('should respond to a request for /api/users/:id', async () => {
    const user = { username: userName(), password: password() }
    
    const document = new User(user)
    const { _id } = document
    return document.save()
      .then(async () => {
        const response = await request(server).get(`/api/users/${_id}`)
        
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.user).toMatchObject({ username: user.username })
      })
  })

  it('should respond to a put to /api/users/:id', async () => {
    const user = { username: userName(), password: password() }
    const updatedUser = { username: userName() }
    const document = new User(user)
    const { _id } = document
    return document.save()
      .then(async () => {
        const response = await request(server).put(`/api/users/${_id}`).send(updatedUser)

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.user).toMatchObject(updatedUser)
      })
  })
})

