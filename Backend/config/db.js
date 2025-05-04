const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/Covid';

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

module.exports = connectToMongoDB;
