const express = require('express');
const server = express();

server.use(express.json());

let food = [
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

server.delete('/food/:id', (req, res) => {
    const { id } = req.params;
    if ( food.find( item => Number(item.id) === Number(id) )) {
        food = food.filter( item => {
            return Number(item.id) !== Number(id) ;
        });
        res.status(200).json(food);
    } else {
        res.status(404).json({
            message: `Food item with id ${id} is not found.`  
    });
    }
});

server.listen( 8000, () => console.log('Server is listening on port 8000'))

module.exports = server;