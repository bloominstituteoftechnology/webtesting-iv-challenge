const server = require('./api/server.js');

port = 9000;
server.listen(port, () => console.log(`\n== SERVER RUNNING ON PORT ${port} ==\n`));
