const express = require("express");
const router = express.Router();
const client = require("../config/redis");
const Todo = require("../model/product.model");

router.post("", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    const todos = await Todo.find().lean().exec();

    client.set("todos", JSON.stringify(todos));

    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    // pagination
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const skip = (page - 1) * size;
    
    client.get(`todos.${page}.${size}`, async function (err, fetchedTodos) {
      if (fetchedTodos) {
        const todos = JSON.parse(fetchedTodos);

        return res.status(200).send({ todos, redis: true });
      } else {
        try {
          const todos = await Todo.find()
           .skip(skip).limit(size)
           .lean().exec();

          client.set("todos", JSON.stringify(todos));

          return res.status(200).send({ todos, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    client.get(`todos.${req.params.id}`, async function (err, fetchedTodo) {
      if (fetchedTodo) {
        const todo = JSON.parse(fetchedTodo);

        return res.status(200).send({ todo, redis: true });
      } else {
        try {
          const todo = await Todo.findById(req.params.id).lean().exec();

          client.set(`todos.${req.params.id}`, JSON.stringify(todo));

          return res.status(200).send({ todo, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    const todos = await Todo.find().lean().exec();

    client.set(`todos.${req.params.id}`, JSON.stringify(todo));
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

    const todos = await Todo.find().lean().exec();

    client.del(`todos.${req.params.id}`);
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;