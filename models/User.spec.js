const mongoose = require('mongoose')
const faker = require('faker')
const User = require('./User')

describe('User model', () => {
  let user

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/testingdb')
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

  it('Hashes the password before saving', async () => {
    const savedUser = await User.create(user)
    expect(savedUser.password).not.toBe(user.password)
  })

  it('Does not allow duplicate usernames', async () => {
    User.create(user)
      .then(() => {
        expect(() => User.create(user)).toThrow()
      })
  })

  it('Requires a username and a password', async () => {
    const user = new User()
    user.validate((err) => {
      expect(err.errors.username.kind).toBe('required')
      expect(err.errors.password.kind).toBe('required')
    })
  })
})