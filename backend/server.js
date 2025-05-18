const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
connectDB();

// ✅ Fix CORS issue
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allows requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
