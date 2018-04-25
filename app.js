const server = require('./server');


const port = 5000;

server.listen(port, () => {
  console.log(` Sever is listening on port ${port}`);
});