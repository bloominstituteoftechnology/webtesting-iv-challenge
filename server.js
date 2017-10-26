const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const Pokemon = require('./pokemon');

server.use(bodyParser.json())

server.get('/pokemon', (req, res) => {
  Pokemon.find({}, (err, pokemon) => {
    if (err) return res.json(err)
    res.json(pokemon)
  })
})

server.post('/pokemon', (req, res) => {
  const pokemon = new Pokemon(req.body)
  pokemon.save((err, newPokemon) => {
    if (err) return res.json(err)
    res.json(newPokemon)
  })
})

server.put('/pokemon/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  Pokemon.findByIdAndUpdate(id, { name }, { new: true }, (err, pokemon) => {
    if (err) return res.json(err)
    res.json(pokemon)
  })
})

server.delete('/pokemon/:id', (req, res) => {
  const { id } = req.params;
  Pokemon.findByIdAndRemove(id, (err, pokemon) => {
    if (err) return res.json(err)
    res.json(pokemon)
  })
})

module.exports = server;
