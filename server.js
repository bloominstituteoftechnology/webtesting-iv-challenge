const express = require('express');



const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.status(200).json({message: "Hi :)"});
});


server.post('/dinner/:entree', (req, res)=> {
    const { entree } = req.params;
    const side = req.body.side || 'green salad';
  res.status(200).json({ dinner: `${entree} and ${side}` });
});

server.delete('/dinner/:entree', (req, res)=> {
    const {entree} = req.params;
    res.status(200).json({message: "Dinner is canceled"});
});

module.exports = server;
