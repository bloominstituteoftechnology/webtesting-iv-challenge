const { server } = require('./server');

server.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log('Server listening on port 3000');
});
