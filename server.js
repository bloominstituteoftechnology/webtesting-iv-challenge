const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const server = require('http').Server(app);
const axios = require('axios');
const Character = require('./characters');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(logger('combined'));


app.get('/character-info/:id', async (req, res, next) => {
  try {
    let character = await axios.get(`https://swapi.co/api/people/${req.params.id}`);
    if (character) {
      res.status(200);
      res.json(character.data);
    }
  } catch (e) {
    console.log("ERRORED OUT BECAUSE: ", e);
    res.status(404);
    res.json({ err: e.message });
  }
});

app.post('/character', async (req, res, next) => {
  try {
    let characterInfo = await axios.get(`https://swapi.co/api/people/${req.body.id}`);
    console.log("AYYOYOYOYOOYOYOOYYO: ", req.body.id);
    let foundCharacter = await Character.findOne({ where: { name: characterInfo.data.name } });
    if (foundCharacter) {
      res.status(302);
      res.json(foundCharacter);
    } else {
      let newCharacter = await Character.create({ name: characterInfo.data.name, haircolor: characterInfo.data.hair_color });
      res.status(201);
      res.json(newCharacter);
    }
  } catch (e) {
    console.log("ERORRED OUT BECAUSE: ", e);
  }
});


app.put("/change-charater-haircolor", async (req, res, next) => {
  try {
    let character = await Character.findOne({ where: { name: req.query.name } });
    if (character) {
      let newHairColor = req.query.newHairColor;
      let updatedCharacter = await Character.update({
        haircolor: newHairColor
      }, {
        where: { id: character.id }
      });

      res.status(205);
      res.json(updatedCharacter);
    }
  } catch (e) {
    console.log("ERRORED OUT BECAUSE: ", e);
    res.status(418);
    res.json({ err: e.message });
  }
})

app.delete('/character/:name', async (req, res, next) => {
  try {
    let deletedCharacter = await Character.deleteOne({ name: req.params.name});
    if (deletedCharacter) {
      res.status(204);
      res.json(deletedCharacter);
    }
  } catch (e) {
    console.log("NO SUCH CHARACTER IN DB: ", e);
    res.status(422);
    res.json({ err: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
})

module.exports = server;