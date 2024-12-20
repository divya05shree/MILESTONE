const express = require('express');
const mongoose = require('mongoose');
const rsvpDivya = require('./route/userRoute');
const rsvpPuvith = require('./route/rsvpPuvithRoute')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
mongoose
  .connect('mongodb+srv://mileStone:mileStone123@cluster0.pepk5.mongodb.net/milestone')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.use('/divya/api/rsvp', rsvpDivya);
app.use('/puvith/api/rsvp' , rsvpPuvith)
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
