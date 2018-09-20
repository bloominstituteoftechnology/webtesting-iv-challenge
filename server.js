const express=require('express');
const server=express();
server.use(express.json());

const cars=[{id:0,model:'Toyota Camry'},{id:1,model:'Honda Civic'}];
server.get('/cars',(req,res)=>{
    res.status(200).json({cars:cars});
})
server.post('/cars',(req,res)=>{
    const id=cars[cars.length-1].id+1;
    cars.push({
        'id':id,
        'model':req.body.model
    })
    res.status(201).json({'id':id});
})
server.delete('/cars/:id',(req,res)=>{
    const id=req.params.id;
    let removedItem;
    for (let i=0; i<cars.length; i++) {
        if (cars[i].id==id) {
            removedItem=cars.splice(i,1);
            break;
        }
    }
    removedItem?res.status(200).json(1):
    res.status(404).json(err);
});
module.exports=server;