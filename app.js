const mongoose = require('mongoose');
const server = require('./server');

const port = 3333;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/countries', {}, err => {
    if (err) throw new Error(err);
    console.log('DB up and running');
});

server.listen(port, () => {
    console.log(`Using port ${port}`);
});