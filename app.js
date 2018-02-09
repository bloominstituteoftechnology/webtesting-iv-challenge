const server = require('./server');
const port = 5001;

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
