const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const postRoutes = require("./routes/postsRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/posts", postRoutes);

// MongoDB connection and server start
const PORT = 3000;
mongoose
  .connect("mongodb://localhost:27017/blog-api")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB", err);
  });
