const express = require('express');

const server = express();
server.use(express.json());

let amazon = [];
let nextId = 1;

server.post('/posts', (req, res) => {
    const { userId, content, title } = req.body;
    if(!(content && title && userId )) {
        return res.status(401).json({message: 'Please include all required fields'})
    }
    amazon.push({ content, userId, title, nextId })
    res.status(201).json({ id: nextId})
    return nextId++;

})
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = amazon.length;
    amazon = amazon.filter(item => item.id !== Number(id));
    const deletedNumber = initialLength - amazon.length;
    if (deletedNumber > 0) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'did not find resource to delete'})
    }
})

server.use((err, req, res, next) => {
    if (err instanceof 'notFound') {
        res.status(404).json({message: 'could not find path'})
    } else {
        next(err)
    }
})