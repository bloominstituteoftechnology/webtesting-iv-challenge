const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");

mongoose.connect("mongodb://localhost/test", {}, err => {
    if (err) console.log(err);
    console.log(`\n=== Connected to mongo test ===\n`);
});

const expect = chai.expect;
const server = require("../server");

chai.use(chaiHTTP);

const Band = require("./models/band"); //schema
