const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors())

app.use(bodyParser.json());

let todos = [];
let nextId = 1;

// Create a new to-do item
app.post('/todos', (req, res) => {
    const todo = {
        id: nextId++,
        title: req.body.title,
        completed: false,
        date: req.body.date // Accept date from the request body
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// Get all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single to-do item by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

// Update a to-do item by ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    todo.date = req.body.date !== undefined ? req.body.date : todo.date; // Update date if provided
    res.json(todo);
});

// Delete a to-do item by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(204).json(deletedTodo);
});

app.listen(port, () => {
    console.log(`Todo API is running at http://localhost:${port}`);
});
