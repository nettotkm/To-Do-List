module.exports = app => {
  const todos = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Create a new todo
  router.post("/", todos.create);

  // find all todos
  router.get("/", todos.findAll);

  // Update a todo with id
  router.put("/:id", todos.update);

  // Delete all todos
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};