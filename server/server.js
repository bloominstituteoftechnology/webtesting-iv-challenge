const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');
const server = express();
server.use(express.json());

//logging, TBD: create morganOptions and pass it in, instead
server.use(morgan(`dev`));

// security
server.use(helmet());

// cross origin request sharing permissions
const corsOptions = {
  origin: `*`,
  methods: `GET, HEAD, PUT, PATCH, POST, DELETE`,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
server.use(cors(corsOptions));

server.use('/api/users', userRouter);

module.exports = server;
