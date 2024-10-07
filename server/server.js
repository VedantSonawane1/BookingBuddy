const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomRoutes = require('./routes/roomRoutes');
const connectDB = require('./config/db');
const key = require('./rooms-client.json');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/rooms', roomRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
