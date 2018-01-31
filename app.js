const port = 4000;
const server = require('./server');

server.listen(port, () => {
  console.log('server running on port', port);
});

