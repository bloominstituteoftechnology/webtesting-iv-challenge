const server = require('./server.js');
const port = 3000;

server.listen(port, () => {`Listening on port ${port}`});