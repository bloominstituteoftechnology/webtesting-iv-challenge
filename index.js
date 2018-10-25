const server = require('./api/server.js');

const port = 3333
server.listen(port, () => console.log(`\nserver up on port ${port}\n`));
