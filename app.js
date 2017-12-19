const server = require('./server');

const port = 5001;

server.listen(port, () => {
  console.info(`Server on port ${port}!`);
});
