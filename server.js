const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors({}));

server.get('/', async (req, res) => {
  try{
    const posts = await db('posts');
    res.status(200).json(posts);
  } catch (e){
    console.log(e);
  }
});

server.post('/', async (req, res) => {
  const { text } = req.body;
  if(!text) return res.status(422).json({ error: 'Invalid data' });

  try{
    const id = await db('posts').insert({ text });
    const post = await db('posts').where('id', Number(id));
    res.status(201).json(post[0]);
  }catch(e) {
    console.log(e);
  }
  // db('posts')
  //   .then(id => {
  //     db('posts')
  //       .where({ id })
  //       .then(post => res.status(201).json(post[0]));
  //   })
  //   .catch(err => console.log(err));
});

server.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try{
    const deleted = await db('posts').where({ id }).del();
    if(deleted){
      res.status(200).json({ id });
    }else{
      res.status(404).json({ error: 'Post not found' });
    }
  }catch(e){
    console.log(e);
  }
});

module.exports = server;
