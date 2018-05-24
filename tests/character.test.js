const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../dead/character.js')

describe('User', () => {
  let user

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost')
  })
  beforeEach(() => {
    const { userName, password } = faker.internet
    user = { username: userName(), password: password() }
  })
  afterEach(() => {
    return User.remove()
  })
  afterAll(() => {
    return mongoose.disconnect()
  })
  it('No duplicates', async () => {
    User.create(user)
      .then(() => {
        expect(() => User.create(user)).toThrow()
      })
  })

  it('Requires username and password', async () => {
    const user = new User()
    user.validate((err) => {
      expect(err.errors.username.kind).toBe('required')
      expect(err.errors.password.kind).toBe('required')
    })
  })
})