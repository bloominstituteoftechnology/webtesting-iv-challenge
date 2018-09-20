const express = require('express');

const server = express();

server.use(express.json());

const users = {
    user_1 : {
        id:  '1',
        name: 'name_1',
        contact: 'contact_1'
    },
    user_2 : {
        id:  '2',
        name: 'name_2',
        contact: 'contact_2'
    },
    user_3 : {
        id:  '3',
        name: 'name_3',
        contact: 'contact_3'
    },
    user_4 : {
        id:  '4',
        name: 'name_4',
        contact: 'contact_4'
    },
    user_5 : {
        id:  '5',
        name: 'name_5',
        contact: 'contact_5'
    },
}

server.get('/', (req,res)=> {
    res.status(200).json({api: 'running'});
});

server.get('/users', (req,res) => {
    res.status(200).json({users});
});

server.delete('/users/:id', (req,res) => {
    const id = req.params.id;
    users.remove(id);
    res.status(200);
})

server.post('/greet/:name', (req,res) => {
    const first = req.params.name; //notice first name comes from params (part of url)
    const last = req.body.last; //notice that last name comes from body (part of request body)
    res.status(200).json({ hello: `${first} ${last}` });
});

module.exports = server;