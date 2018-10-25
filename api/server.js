const express = require("express");
const server = express();

server.use(express.json());

let users = [];

// ===== GET SERVER UP
server.get('/', (req, res) => {
    res.status(200).json({ message: 'server up' });
  });



// ===== GET LIST OF USERS
server.get('/api/users', (req, res) => {
    res.json(users);
 });
 let userId = 1;



// ===== POST A USER (JSON OBJECT)
 server.post('/api/users', (req, res) => {
    const {username} = req.body
    const newUser = {username, id: userId}
    if (!username) {
        return res.send('username is required', res);
    }
    users.push(newUser);
    userId++;
    res.json(users)
  });



// ===== POST A USER (url)('/users/:username')
server.post('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const newUser = {username, id: userId}
  res.status(200).json({ username: `${username}` });
  if (!username) {
    return res.send('username is required', res);
}
users.push(newUser);
userId++;
res.json(users)
});


// ===== DELETE A USER
server.delete("/api/users/:username", (req, res) => {
    const { username } = req.params;
    res.status(200).json({ deleted: `${username}` });
  });

module.exports = server;