const server = require('./server');
const port = 3030;

server.listen(port, () => {
  console.log(`Magic is happening on port ${port}`);
});