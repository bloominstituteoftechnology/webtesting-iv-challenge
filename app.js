const server = require('./server.js');

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Express Server is running on http://localhost:${ PORT }`);
});