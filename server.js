const express = require('express');
const server = express();

server.use(express.json());
server.get('/', (req, res) => { res.status(200).json({ api: 'API is running' }) })
server.get('/parishes', (req, res) => {
    const parishes = { name: 'Westmoreland', capital: 'Savanna-la-Mar' }
    res.status(200).json(parishes);
})
server.post('/parishes', (req, res) => {
    const { name, capital } = req.body;
    if (!name || !capital) {
        res.status(422).json({ msg: 'You need a name and capital.'})
    }
    res.status(201).json({ name, capital });
})
server.delete('/parishes/:parish', (req, res) => {
    const { parish } = req.params;
    res.status(200).json({ msg: `${parish} has been deleted.` });
})

module.exports = server;