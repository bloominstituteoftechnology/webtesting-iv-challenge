const express = require('express')

const server = express();


server.get ('/',(req,res)=>{
    res.status(200).json({server:"up!"})

})
if(process.env.NODE_ENV !== 'test'){
    server.listen(5000)
}
module.exports =server;