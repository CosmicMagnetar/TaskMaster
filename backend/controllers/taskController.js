const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    console.log("📡 Fetching tasks from MongoDB..."); 
    const tasks = await Task.find();
    console.log("📂 Retrieved Tasks:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    console.log("🆕 Creating task:", req.body); 
    const newTask = new Task(req.body);
    await newTask.save();
    console.log("✅ Task Added Successfully:", newTask); 
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
