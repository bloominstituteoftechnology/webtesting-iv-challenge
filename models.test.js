const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
