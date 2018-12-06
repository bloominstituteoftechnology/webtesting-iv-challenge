const server = require('./api/server.js');

const port = process.env.PORT || 7500; // need process.env.PORT

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));