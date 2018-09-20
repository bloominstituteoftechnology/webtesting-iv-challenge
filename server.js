const express = require("express");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();
server.use(express.json());

server.post('/', (req, res) => {
    const friend = req.body;
    db.insert(friend)
    .into('friends')
    .then(ids => {
        res.status(201).json(ids[0]);
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/:id', (req, res) => {
    db('friends').where({ id: req.params.id }).del().then(count => {
        if (count) {
            res.status(200).json({ message: `${count} friends have been deleted.`});
        } else {
            res.status(404).json({ message: 'No friend with this ID was found' });
        }
    })
    .catch(err => res.status(500).json(err))
})

const port = 3300;
// server.listen(port, function() {
//     console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
// })

module.exports = server;