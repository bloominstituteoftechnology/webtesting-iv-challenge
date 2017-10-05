const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./post');
const mongoose = require('mongoose');
const server = express();

mongoose.connect('mongodb://localhost/food')

server.use(bodyParser.json());

const errorHandler = (err) => {
  res.status(422).json({ error: err });
  return;
}

server.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return errorHandler(err);
    res.send(posts);
  });
});

server.post('/posts', (req, res) => {
  const { title, author, content } = req.body;
  const post = new Post({ title, author, content });
  post.save((err, p) => {
    if (err) return errorHandler(err);
    res.send(p);
  });
});

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  Post.findByIdAndUpdate(id, { title, author, content }, { new: true }, (err, post) => {
    if (err) return errorHandler(err);
    res.send(post);
  });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id, (err) => {
    if (err) return errorHandler(err);
    res.send({ "success": "Post was removed" });
  });
});

server.listen(8080);

module.exports = server;