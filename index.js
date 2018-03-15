const server = require('./server');
const port = 3333;

server.listen(port, () => {
    console.log(`This app will explode in .... ${port} nanoseconds`)
})