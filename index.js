require('dotenv').config();
const express = require('express');
const parser = express.json();
const server = express();
const server = require('./api/server.js');
const PORT = 5050;
//const projectRouter = require('./routers/projectRouter');
server.use(express.json());
server.use(parser);
//server.use('/api/projects', projectRouter);



const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
};

// add your server code starting here





/* server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
}); */



const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
