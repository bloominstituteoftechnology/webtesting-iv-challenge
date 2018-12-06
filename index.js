const server = require('./api/server.js')
require('dotenv').config();
const port = process.env.SERVER_PORT
server.listen(port, () => {
  console.log('\nServer is listening on port ${port}')
})