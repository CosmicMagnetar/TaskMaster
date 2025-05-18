require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("🔍 Checking MONGO_URI:", process.env.MONGO_URI); // ✅ Debugging log

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("❌ Missing MONGO_URI in .env file!");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
