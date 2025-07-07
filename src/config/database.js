const mongoose = require('mongoose');
const connectDB = async () => {
  try {
   // console.log('Mongo URL:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = connectDB;
