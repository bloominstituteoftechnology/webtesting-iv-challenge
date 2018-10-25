const server = require('./api/server.js');

const port = 3300;
server.listen(port, () => console.log(`\nserver running on port ${port}\n`));
