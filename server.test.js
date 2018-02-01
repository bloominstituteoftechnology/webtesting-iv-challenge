const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('sinon-mongoose');
const Todo =  require('./models');
const assert = reqquire('assert');
chai.use(chaiHTTP);

//  this first block can be commented out since using sinon-mongoose
describe('TodoList', () => {
  beforeEach((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
    console.log('we are connected');
    done();
  });
});

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
  mongoose.connection.close(done);
 });
});

// test for todoList
describe('Get all todos', () => {
  it('should return a todo list', (done) => {
    const mock = sinon.mock(Todo);
    const expected = {
      status: true,
      todo: []
    };
    mock.expects('find').yields(null, expected);
    Todo.find((err, result) => {
      mock.verify();
      mock.restore();
      assert.equal(result.status, true);
      done();
    });
  });
  // test that we CANT get a todo
  it ('should throw an error if it fails to get a todo', (done) => {
    const mock = sinon.mock(Todo);
    const expected = {
      status: false,
      error: 'failed to get a todo'
    };
    mock.expects('find').yields(expected, null);
    Todo.find((err, result) => {
      mock.verify();
      mock.restore();
      expect(err.status).to.not.be(true);
      done();
      //assert.equal(err.status, false);
    });
  });
});

// test if can save a todo
describe('Create a new todo', () => {
  it('should create a new post', (done) => {
    const mock = sinon.mock(new Todo(
      {todo: 'Successfully saved new todo from mock'}));
    const todo = mock.object;
    const expected = {status: true};
    mock.expects('save').yields(expected, null);
    todo.save = (err, result) => {
      mock.verify();
      mock.restore();
      expect(err.status).to.be.true;
      done();
    };
  });


// Test will pass if the todo CANNOT be saved
it("should return error, if todo not saved", (done) => {
  const mock = sinon.mock(new Todo(
    { todo: 'Save new todo from mock'}));
  const todo = mock.object;
  const expected = {status: false};
  mock.expects('save').yields(expected, null);
  todo.save((err, result) => {
    mock.verify();
    mock.restore();
    expect(err.status).to.not.be.true;
    done();
  });
 });

  // Test will pass if the todo is updated by ID
  describe("Update a new todo by id", () => {
    it("should updated a todo by id", (done) => {
      var mock = sinon.mock(new Todo({ completed: true}));
      var todo = mock.object;
      var expected = { status: true };
      mock.expects('save').withArgs({_id: 123456789}).yields(null, expected);
      todo.save(function (err, result) {
       mock.verify();
        mock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the todo is not updated based on an ID
    it("should return error if update action is failed", function(done){
      var mock = sinon.mock(new Todo({ completed: true}));
      var todo = mock.object;
      var expectedResult = { status: false };
      mock.expects('save').withArgs({_id: 123456789}).yields(expected, null);
      todo.save(function (err, result) {
        mock.verify();
        mock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });  
  // Test will pass if todo is deleted by id
  describe("Delete a todo by id", () => {
    it("should delete a todo by id", (done) => {
      var mock = sinon.mock(new Todo({ completed: true}));
      var todo = mock.object;
      var expected = { status: true };
      mock.expects('remove').withArgs({_id: 123456789}).yields(null, expected);
      todo.save(function (err, result) {
       mock.verify();
        mock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the todo is not updated based on an ID
    it("should return error if deletion  failed", function(done){
      var mock = sinon.mock(new Todo({ completed: true}));
      var todo = mock.object;
      var expectedResult = { status: false };
      mock.expects('remove').withArgs({_id: 123456789}).yields(expected, null);
      todo.save(function (err, result) {
        mock.verify();
        mock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });   