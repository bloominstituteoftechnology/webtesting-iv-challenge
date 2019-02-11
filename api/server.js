const express = require('express');
const server = express();
const users = require('../users/usersModel');
server.use(express.json());

server.get('/', (req,res) => {
   res.status(200).json({Running: `Server is up and running`});
});

server.get('/users', (req,res) => {
   res.status(200).json({name:'venky', age:39, married:true});
});

server.post('/users', (req,res) => {
   const user = req.body;
   const name = user.name;
   const age = user.age;
   const married = user.married;
   if(!name) res.status(422).json({msg:`name is missing`});
   if(!age) res.status(422).json({msg:`name is missing`});
   if(!married) res.status(422).json({msg:`name is missing`});
   users.insert(user)
        .then( ids => {
           console.log(ids);
           res.status(201).json(ids);
        })
        .catch(err => {
           res.status(500).json({err:`Cannot add a user at this time`});
        })
});

server.delete('/users/:id', (req,res) => {
     const {id} = req.params;
     if(!id) res.status(404).json({msg:`There is no id`});
     users.findById(id)
          .then( userId => {
            //  console.log(`userId`, userId);
                 if(userId[0]) {
                  users.remove(userId[0])
                        .then( ids => {
                           res.status(200).json({msg: `user with id ${id} is deleted`});
                        })
                        .catch(err => {
                           res.status(500).json({msg:`Something went wrong`});
                        });
                  } else {
                     res.status(404).json({msg:`There is no user with this ${userId}`});
                  }      
          })
          .catch(error => {
              res.status(500).json({error: `There is something wrong the server`});
          });
     
});

module.exports = server;