const express = require('express');
const server = express();

server.use(express.json());

const food = [
    { id: 0, name: 'Pasta'},
    { id: 1, name: 'Pizza'},
    { id: 2, name: 'Soup'}
]

server.get('/food', (req, res) => {
    res.status(200).json(food);
});

server.post('/food', (req, res) => {
    const { name } = req.body;
    const id = food.length;
    food.push({ id, name });
    res.status(201).json(food);
});

server.delete(`/food/:id`, (req, res) => {
    const { id } = req.params;
    if ( id ){
        res.status(200).json({
        message: `Food item id ${id} is deleted.`
    });
    } else {
        res.status(404).json({
            message: `Food item with id ${id} is not found.`
        })
    }
});

module.exports = server;