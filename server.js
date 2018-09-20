const express = require('express');

const server = express();

// middleware
server.use(express.json());

server.get('/', (req, res) => {
    const returnBody = {
        users: [
            {id: 1, name: 'Mike', email: 'mike@test.com'},
            {id: 2, name: 'Katia', email: 'katia@test.com'},
            {id: 3, name: 'Grant', email: 'grant@test.com'}
        ]
    };
    res.status(200).json(returnBody);
})

module.exports = server;