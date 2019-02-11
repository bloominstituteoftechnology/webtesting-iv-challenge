const server = require('./api/server.js');
const PORT = 3400;

server.listen(PORT, () => {
   console.log(`Server is up and running at localhost:${PORT}`);
})