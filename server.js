const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('Combined'));
server.use(express.json());

const User = require('./Users');

erver.get('/users', (req, res) => {
    User.find({})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(422).json({ err: err }));
  });
  
  
  server.post('/users', (req, res) => {
      User.create(req.body)
          .then(user => res.status(200).json(user))
          .catch(err => res.json({ msg:'Could not create User', err}))
  });
  
  server.put('/users/:id', (req, res) => {
      const { name } = req.body;
      const { id } = req.params;
      User.findByIdAndUpdate(id, {'name': name }, () => {
         User.findById(id)
         .exec((err, userUpdated) => {
             if (err) {
                 res.status(422);
                 res.json({'Error Updating': err.message});
                 return;
             }
             res.json({ success: 'Successfully updated User', userUpdated})
         }) 
      });
  });
    
  server.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, deletedUser) => {
      if (!deletedUser) {
        res.status(422);
        res.json({'User not found': err.message});
        return;
      }
      res.json({ success:'Successfully deleted User', deletedUser})
    });
  });

module.exports = server;
