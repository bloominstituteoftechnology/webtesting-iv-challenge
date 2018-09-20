const express = require('express'); 
const server = express(); 
server.use(express.json())

server.get('/', (req, res)=>{
    
    res.status(200).json({api: "running"});  
});
server.get('/hello', (req, res)=>{
    
    res.status(200).json({hello: "FSW12"});  
});
server.post('/movies/:title', (req, res)=>{
    res.status(200).json({movie:"hereditary horror"}); 
})
module.exports = server; 
