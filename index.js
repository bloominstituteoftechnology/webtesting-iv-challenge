
const { server, PORT } = require('./server');

server.listen(PORT, () => {
    console.log(`alive on port ${PORT}`);
})