const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./config/db'); 
// Issue: CovidRoute is imported from Models folder which is incorrect
// Routes should be imported from routes folder, not Models
// Models folder should only contain data schemas/models
const covidroute = require('./routes/covid');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/covid', covidroute); 

// Connect to MongoDB
connectToMongoDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
