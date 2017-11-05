const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/cards', { useMongoClient: true }, () => {
    console.log('connected to cards DB');
});

server.listen(8080, () => {
    console.log('server listening on port 8080');
});