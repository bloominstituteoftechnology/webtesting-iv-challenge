const Todo = require('../models/TodoModel');


    // Get all todos from the Database
    exports.Todo.GetAllTodo(function(req, res) {
          if(err) {
            res.json({status: false, error: "Something went wrong"});
            return;
          }
          res.json({status: true, todo: todos});
        });
    //Post a todo into Database
    exports.CreateTodo = function(req, res){
        const todo = new Todo(req.body);
        todo.save(function(err, todo){
          if(err) {
            res.json({status: false, error: "Something went wrong"});
            return;
          }
          res.json({status: true, message: "Todo Saved!!"});
        });
    },
    //Updating a todo status based on an ID
    exports.UpdateTodo =function(req, res) {
        const completed = req.body.completed;
        Todo.findById(req.params.id, function(err, todo){
        todo.completed = completed;
        todo.save(function(err, todo){
          if(err) {
            res.json({status: false, error: "Status not updated"});
          }
          res.json({status: true, message: "Status updated successfully"});
        });
      });
    },
    // Deleting a todo baed on an ID
    exports.DeleteTodo = function(req, res){
      const { id } = req.params;
      Todo.remove((id), function(err, todos){
        if(err) {
          res.json({status: false, error: "Deleting todo is not successfull"});
          return;
        }
        res.json({status: true, message: "Todo deleted successfully!!"});
      });
    }

