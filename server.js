const express = require('express')

const server = express()

server.use(express.json())

//In Memory Database of Users:
let userDB = [
  {id:1, username: "user1", password:"pass1"},
  {id:2, username: "user2", password:"pass2"},
  {id:3, username: "user3", password:"pass3"},
  {id:4, username: "user4", password:"pass4"},
  {id:5, username: "user5", password:"pass5"},
  {id:6, username: "user6", password:"pass6"},
]


server.get('/', (req,res) => {
  res.status(200).json({msg:'Endpoint running'})
})

server.get('/users', (req,res) => {
  res.status(200).json(userDB)
})

server.post('/users', (req,res) => {
  const {body} = req
  console.log(body, "req body")

  let maxID = Math.max(...[...userDB.map(cv => cv.id)])

  userDB.push({ 
    id:maxID+1,
    username: body.username,
    password: body.password
  })

  res.status(200).json(userDB)
  
})
module.exports = server