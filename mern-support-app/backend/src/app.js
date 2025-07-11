const express = require('express');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issueRoutes');

require("dotenv").config();
// console.log("Loaded env:", process.env);

const app = express();
const PORT = process.env.PORT || 5001;

console.log("MongoDB URI:", process.env.MONGO_DB);

// Middleware
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/issues', issueRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});