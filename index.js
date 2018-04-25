const mongoose = require('mongoose')
const server = require('./server')
const port = 5000;

mongoose.connect('mongodb://localhost/bands', {}, err => {
    if (err) return console.log(err);
    console.log('DB Connection Achieved');
});

server.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server doesn't deserve a tip of ${port} pennies!`);
});