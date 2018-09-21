const express = require('express'); 
const server = express(); 
server.use(express.json())
 server.get('/', (req, res)=>{
    
    res.status(200).json({api: "testing"});  
});
server.get('/hello', (req, res)=>{
    
    res.status(200).json({hello: "CS12"});  
});
server.post('/restaurant /:title', (req, res)=>{
    res.status(200).json({restaurant:"Burger King"}); 
})
module.exports = server; 