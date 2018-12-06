const express = require('express');

const server = express();
server.use(express.json());

let users = [];
let userId = 1;
server.get('/', (req, res) => {
  res.status(200).json({message: 'UP'})
})

server.get('/api/users', (req, res) => {
  res.json(users)
})
server.post('/api/users', (req, res) => {
  const {name} = req.body;
  const newUser = { name, id: userId }
  if(!name) {
    return res.send('Must provide a name', res)
  }
  users.push(newUser);
  userId++;
  res.json(users)
})

server.post('/api/users/:name', (req, res) => {
  const { name } = req.params;
  const newUser = {name, id: userId}
  res.status(200).json({ name: `${name}` });
  if (!name) {
    return res.send('name is required', res);
}
users.push(newUser);
userId++;
res.json(users)
});

server.delete("/api/users/:name", (req, res) => {
    const { name } = req.params;
    const foundUser = users.find(user => user.name === name);
        if (foundUser) {
            users = users.filter(user => user.name != name);
            res.status(200).json({ deleted: `${name}` });
        } else {
            res.status(200).json({ message: 'No user found by that name'});
        }
  });

module.exports = server;