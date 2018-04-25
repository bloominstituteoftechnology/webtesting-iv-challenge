const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

mongoose.connect("mongodb://localhost/test", {}, err => {
  if (err) return console.log(err);
  console.log("\n=== Connect to TEST database === \n");
});

const expect = chai.expect;
const server = require("./server");
