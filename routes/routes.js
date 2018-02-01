const express = require('express');
const router = express.Router();

const Todo = require('../models/TodoModel');
const { GetAllTodo, 
        CreateTodo,
        UpdateTodo,
        DeleteTodo }  = require('../controllers/Todo.Controller');

// Get all Todo
router.get('api/todo', GetAllTodo);

// Create new Todo
router.post('api/todo', CreateTodo);

// Delete a todo based on :id
router.delete('api/todo/:id', DeleteTodo);

// Update a todo based on :id
router.put('api/todo/:id', UpdateTodo);

module.exports = router;

