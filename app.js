const mongoose = require('mongoose');
const server = require('./server.js');
const port = 5550;

mongoose.connect('mongodb://localhost/battlefield',{}, ( error ) => {
    if (error) {
        return console.log(error);
    }
    console.log('\n\n--Connected to the Database Successfully--\n\n')
})

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`\n\n--Server rolling and chillin on port ${port} with yall--\n\n`);
})