const server = require('./server');
const port = 3030;

server.listen(port, () => {
  console.log(`Anime magic is happening on port ${port}`);
});
