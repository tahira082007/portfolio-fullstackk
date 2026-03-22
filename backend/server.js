const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Form route
app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  console.log("Received:", name, email);

  res.send("Data received successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});