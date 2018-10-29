const express = require('express');

const app = express();

app.use(express.json());

let clubs = [{ id: 0, name: 'Manchester United' }, { id: 1, name: 'Chelsea FC' }];

app.get('/', (req, res) => {
  res.status(200).json({ message: 'It is alive!' });
});

app.get('/club', (req, res) => {
    res.status(200).json(clubs);
});

app.post('/club', (req, res) => {
    const { name } = req.body;
    const id = clubs.length;
    clubs.push({ id, name });
    res.status(201).json(clubs);
});

app.delete('/clubs/:id', (req, res) => {
    const { id } = req.params;
    if (clubs.find(club => Number(club.id) === Number(id))) {
      clubs = clubs.filter(club => {
        return Number(club.id) !== Number(id);
      });
      res.status(200).json(clubs);
    } else {
      res.status(404).json({ message: 'invalid club id' });
    }
});

module.exports = app;