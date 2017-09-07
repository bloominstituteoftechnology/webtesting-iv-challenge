const mongoose = require('mongoose')
const server = require('./server')

mongoose.connect('mongodb://localhost/pokemon', {}, (err) => {
  if (err) return console.log(err)
  console.log('connected to Pokemon DB')
})

server.listen(8080, () => {
  console.log('server listening on port 8080')
})
