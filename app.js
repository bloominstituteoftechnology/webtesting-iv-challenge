const server = require('./server');
const port = 3333;

server.listen(process.env.PORT || port, _ => {
  console.log(`Listening on port: ${port}`);
});
