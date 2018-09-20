const express = require('express');

const app = express();

app.use(express.json());

let phones = [{ id: 0, name: 'iPhone' }, { id: 1, name: 'Samsung S9' }];

app.get('/', (req, res) => {
  res.status(200).json({ message: 'running!' });
});

app.get('/phones', (req, res) => {
  res.status(200).json(phones);
});

app.post('/phones', (req, res) => {
  const { name } = req.body;
  const id = phones.length;
  phones.push({ id, name });
  res.status(201).json(phones);
});

app.delete('/phones/:id', (req, res) => {
  const { id } = req.params;
  if (phones.find(phone => Number(phone.id) === Number(id))) {
    phones = phones.filter(phone => {
      return Number(phone.id) !== Number(id);
    });
    res.status(200).json(phones);
  } else {
    res.status(404).json({ message: 'invalid phone id' });
  }
});

module.exports = app;
