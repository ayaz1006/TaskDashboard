const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({ user: req.user.id, title, description, dueDate });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Server error:", err); // Log the error details
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
