const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Submit route (SAFE VERSION)
app.post("/submit", (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("Received:", name, email);

    res.send("Data received successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});