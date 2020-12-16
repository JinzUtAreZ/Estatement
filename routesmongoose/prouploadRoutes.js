const express = require("express");
const Task = require("../modelsmongoose/profuploadModel");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    const express = require("express");
    const User = require("../models/user");
    const router = new express.Router();

    router.post("/users", async (req, res) => {
      const user = new User(req.body);

      try {
        await user.save();
        res.status(201).send(user);
      } catch (e) {
        res.status(400).send(e);
      }
    });

    router.get("/users", async (req, res) => {
      try {
        const users = await User.find({});
        res.send(users);
      } catch (e) {
        res.status(500).send();
      }
    });

    router.get("/users/:id", async (req, res) => {
      const _id = req.params.id;

      try {
        const user = await User.findById(_id);

        if (!user) {
          return res.status(404).send();
        }

        res.send(user);
      } catch (e) {
        res.status(500).send();
      }
    });

    router.patch("/users/:id", async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = ["name", "email", "password", "age"];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(404).send();
        }

        res.send(user);
      } catch (e) {
        res.status(400).send(e);
      }
    });

    router.delete("/users/:id", async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
          return res.status(404).send();
        }

        res.send(user);
      } catch (e) {
        res.status(500).send();
      }
    });

    module.exports = router;
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
