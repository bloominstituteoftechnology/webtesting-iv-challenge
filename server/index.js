const server = require('./server')

// Start the server in a separate file to decouple server 
// implementation and usage
server.listen(3000)