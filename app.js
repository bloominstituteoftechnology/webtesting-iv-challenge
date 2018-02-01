const server = require('./server');
const port = 3000;

server.listen(port, () => {
  console.log(`Broken App on My Server${port}`);
});