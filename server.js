const express = require('express')
const mongoose = require('mongoose')
const User = require('./user')
const server = express();


mongoose
.connect('mongodb://localhost/user-serverdb')
.then(response=>{
    console.log('server up')
})
.catch(err=>{
    console.log('server busted',err)
})
server.use(express.json())
server.get ('/',(req,res)=>{
    res.status(200).json({server:"up!"})

})
server
.post('/',(req,res)=>{
    const user = new User(req.body)
    user.save()
    .then(response=>{
        res.status(201).json(response)
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})
server
.delete('/:id',(req,res)=>{
    const {id}= req.params
    User
    .findByIdAndRemove(id)
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
server
.put('/:id',(req,res)=>{
    const{id}= req.params
    const update = req.body
    const options={
        new:true,
    }
    User
    .findByIdAndUpdate(id)
    .then(id,update,options)
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})
})
if(process.env.NODE_ENV !== 'test'){
    server.listen(5000)
}
module.exports =server;