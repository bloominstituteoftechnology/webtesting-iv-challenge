// --- Import Server
const server = require('./api/server')

// --- Server Listen Port
const port = 4242;

// --- Server Listen Method
server.listen(port, () => { console.log(`
|--- Server is active on port ${port} ---|
`) })