const {server} = require('./server');
const port = process.env.PORT || 3333;
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test_sodas',(err) => {
    if(err){console.log(err)}
    console.log(`Mongo is up and running`);
});

server.listen(port,(req,res) =>{
    console.log(`Magic is happening at ${port}`)
});