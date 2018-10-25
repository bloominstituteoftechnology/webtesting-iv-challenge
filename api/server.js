const express = require("express");
const server = express();

server.use(express.json());

let users = [
    {   
        username: 'Lucas',
        id: 0
    },
]

// ===== SERVER RUNNING
server.get('/', (req, res) => {
    res.status(200).json({ message: 'server up' });
  });

// ===== GET LIST OF USERS
server.get('/users', (req, res) => {
    res.json(users);
 });
 let userId = 1;

// ===== POST A USER (JSON OBJECT)
 server.post('/users', (req, res) => {
    const {username} = req.body
    const newUser = {username, id: userId}
    if (!username) {
        return sendUserError('USERNAME REQUIRED', res);
    }
    users.push(newUser);
    userId++;
    res.json(users)
  });

// ===== POST A USER ('url')('/users/:username')
server.post("/users/:username", (req, res) => {
  const { username } = req.params;
  const newUser = {username, id: userId}
  res.status(200).json({ username: `${username}` });
  if (!username) {
    return sendUserError('USERNAME REQUIRED', res);
}
users.push(newUser);
userId++;
res.json(users)
});

module.exports = server;