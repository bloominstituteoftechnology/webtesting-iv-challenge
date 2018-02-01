const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = Schema({
  id: {
    type: Number,
    required: yes,
  },
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_on: {
    type: Date,
    default: Date.now,
  }
 },{versionKey: false}
);
TodoSchema.methods.getTodo = function() {
  return this.todo;
};

TodoSchema.statics.getAllTodo = function(cb) {
  Todo.find({}, (err, todos) => {
    if (err) return cb(err);
  cb(todos);
 });
};

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;