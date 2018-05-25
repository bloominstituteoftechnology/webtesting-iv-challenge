const request = require('supertest')
const mongoose = require('mongoose')
const { userName, password } = require('faker').internet
const server = require('./server')
const User = require('../models/User')

describe('Server API', () => {
  beforeAll(() => {
    // Seed some data
    const users = []
    for (let i = 0; i < 5; i++) {
      users.push({ username: userName(), password: password() })
    }

    // Get a mongoose connection
    return mongoose.connect('mongodb://localhost/testingdb')
      .then(() => User.insertMany(users))
  })

  afterAll(() => {
    // Get rid of our users and disconnect from mongo
    return User.remove()  
      .then(() => mongoose.disconnect())
  })

  it('responds to request for / with API status', async () => {
    const response = await request(server).get('/')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toEqual({ api: 'Running' })
  })

  it('responds to a request for /api/users with a list of users', async () => {
    const response = await request(server).get('/api/users')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.users).toHaveLength(5)
  })

  it('responds to a post to /api/users with a newly created user', async () => {
    const user = { username: userName(), password: password() }
    const response = await request(server).post('/api/users').send(user)

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body.user).toMatchObject({ username: user.username })
  })

  it('responds to a request for /api/users/:id with the appropriate document', async () => {
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

  it('responds to a put to /api/users/:id with an updated document', async () => {
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

  it('responds to a delete to /api/users/:id with the deleted document', async () => {
    const user = { username: userName(), password: password() }
    const document = new User(user)
    const { _id } = document
    return document.save()
      .then(async () => {
        const response = await request(server).delete(`/api/users/${_id}`)

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.user).toMatchObject({ username: user.username })
      })
  })
})

