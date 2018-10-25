const express = require('express')
const server = express()
const userRoutes = require('./user/userRoutes')
const userRoutesTest = require('./user/testUserRoutes')
server.use(express.json())

server.use('/', userRoutesTest)

module.exports = server