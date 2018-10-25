const express = require("express");

const server = express();

//apply middleware
server.use(express.json());

//in-memory db
let posts = [
  {
    id: 0,
    name: "This is a post",
    content: "This is the content of a post"
  },
  {
    id: 1,
    name: "This is also post",
    content: "This is the content of another post"
  }
];

//routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});

server.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

server.post("/posts", (req, res) => {
  const newPost = req.body;

  if (!newPost.name) {
    res.status(400).json({ error: "Bad Request" });
  } else {
    posts.push(newPost);

    res.status(201).json({ message: "New post added" });
  }
});

server.put("/posts", (req, res) => {
  const newPost = req.body;

  if (!newPost.name) {
    res.status(400).json({ error: "Bad Request" });
  } else {
    posts.push(newPost);
    res.status(201).json({ message: "New post added" });
  }
});

server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  posts = posts.filter(post => {
    console.log(post);
    console.log(id);
    if (post.id !== id) {
      console.log("will not delete: ");
      console.log(post);
      return post;
    }
  });

  res.status(202).json({ message: "Post has been deleted" });
});
module.exports = server;
