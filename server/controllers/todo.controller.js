const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new Todo
exports.create = (req, res) => {

  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a todo
  const todo = {
    description: req.body.description,
    owner: req.body.owner,
    email: req.body.email,

  }

  // Save todo in the database
  Todo.create(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });

};

// find all todos from the database.
exports.findAll = (req, res) => {
  Todo.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });

};

// Find a single todo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving todo with id=" + id
      });
    });

};

// Update a todo by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });


};


// Delete all todos from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    });
};
