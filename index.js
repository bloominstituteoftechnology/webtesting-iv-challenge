const server = require('./server');
const port = 5000;

server.listen(port, () => {
  console.log(`Pizza server is listening on ${port}`)
});
