const server = require('./api/server.js');

const port = 4400;

server.listen(port, () => console.log(`server running on ${port}`));