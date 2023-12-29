const mongoose = require('mongoose');

// database connection setup
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectDB;