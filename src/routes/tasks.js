const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Task = require("../models/Task");

router.get("/tasks/add", (req, res) => {
  res.render("tasks/new-task");
});

router.post(
  "/tasks/new-task",
  body("title", "Title is required").trim().notEmpty(),
  body("description", "Description is required").trim().notEmpty(),
  async (req, res) => {
    const { title, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("tasks/new-task", {
        errors: errors.array(),
        title,
        description,
      });
    } else {
      const newTask = new Task({ title, description });
      await newTask.save();
      req.flash("success_msg", "Task added successfully")
      res.redirect("/tasks");
    }
  }
);

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find().lean();
  res.render("tasks/allTasks", { tasks });
});

router.get("/tasks/edit/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  res.render("../views/tasks/edit-task", { task });
});

router.put("/tasks/edit-task/:id", async (req, res) => {
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Task updated successfully")
  res.redirect("/tasks");
});

router.delete("/tasks/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Task removed successfully")
  res.redirect("/tasks");
});

module.exports = router;
