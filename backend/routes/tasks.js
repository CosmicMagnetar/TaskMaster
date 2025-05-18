const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', (req, res) => {
  console.log("🛠️ GET /api/tasks endpoint hit!"); 
  taskController.getTasks(req, res);
});

router.post('/', (req, res) => {
  console.log("🆕 POST /api/tasks endpoint hit!", req.body); 
  taskController.createTask(req, res);
});

module.exports = router;
