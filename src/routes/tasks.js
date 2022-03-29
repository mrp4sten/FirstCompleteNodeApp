const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Task = require("../models/Task");
const { isAuthenticated } = require("../helpers/auth");

router.get("/tasks/add", isAuthenticated, (req, res) => {
  res.render("tasks/new-task");
});

router.post(
  "/tasks/new-task",
  isAuthenticated,
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
      newTask.user = req.user.id;
      await newTask.save();
      req.flash("success_msg", "Task added successfully");
      res.redirect("/tasks");
    }
  }
);

router.get("/tasks", isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).lean();
  res.render("tasks/allTasks", { tasks });
});

router.get("/tasks/edit/:id", isAuthenticated, async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  res.render("../views/tasks/edit-task", { task });
});

router.put("/tasks/edit-task/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Task updated successfully");
  res.redirect("/tasks");
});

router.delete("/tasks/delete/:id", isAuthenticated, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Task removed successfully");
  res.redirect("/tasks");
});

module.exports = router;
