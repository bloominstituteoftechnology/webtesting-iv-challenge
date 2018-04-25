const mongoose = require('mongoose');
const server = require('./server');
const port = 5000;

mongoose.connect('mongodb://localhost/dbz-chars', {}, err => {
    if(err) return console.log(err);
    console.log("Connected to Kami's DB");
});

server.listen(port, err => {
    if(err) console.log(err);
    console.log(`The server is going super saiyan on ${port}`)
})