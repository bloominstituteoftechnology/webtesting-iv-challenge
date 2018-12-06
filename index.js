
const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('hello')

})

server.get('/hello', (req, res) => {
  res.status(200).json({message: 'hello'})
})

server.post('/hello', (req, res) => {
  const name = req.body
    console.log(name)
    if(name.firstName.length > 0  || name.lastName.length > 0) {
      res.status(201).json({hello: `${name.firstName} ${name.lastName}`})
    } else {
      res.status(400).json({hello: 'No data'})
    }

})

server.delete('/hello/:id', (req, res) => {
  res.status(200).json(1)

})




const port = process.env.PORT || 5000;

// server.listen(port, ()=> console.log('server on port 5000'))

module.exports = server;
