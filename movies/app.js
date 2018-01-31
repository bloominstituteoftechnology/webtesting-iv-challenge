const server = require('./server');
const PORT = 7570;

server.listen(PORT, () => {
  console.log(`server listening on ${PORT} now!`);
});
