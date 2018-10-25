const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
res.status(200).json({message:'server running'});
})

server.post('/', (req,res) => {
const { name } = req.body;
if(name){
res.status(200).json({message:`${name} posted`});
}
else{res.status(400).json({message:'please fill in a name'});}
})

const port = 3333;

server.listen(port, () => console.log(`\n server listening on poet ${port} \n`));

module.exports = server;