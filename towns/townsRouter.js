const server = require('../server.js')
const townDB = require('./townsDb.js');


server.post('/towns', async (req,res) => {
    townDB.create(req.body)
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(400).json(err)
    })

})

server.delete('/towns', async (req,res) => {
    const {name} = req.body;
    townDB.remove(name)
    .then(num => {
        res.status(200).json(num)
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

module.exports = server;