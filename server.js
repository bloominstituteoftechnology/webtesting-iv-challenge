const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {

    res.status(200).json({ success: true, data: { api: 'running' } });
});

server.get('/smurfs', (req, res) => {

    res.status(200).json({ smurfs: 'loads of smurfs' });
})

server.post('/smurfs', (req, res) => {
    const { smurf, age , id } = req.body;

    res.status(201).json({ smurf: smurf, id: id, age: age });

})

server.delete('/smurfs/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json({ deleted: id })

});

server.put('/smurfs/:id', (req, res) => {
    const { smurf, id, age } = req.body;

    res.status(200).json({ smurf: smurf, id: id , age: age})
})


module.exports = server;