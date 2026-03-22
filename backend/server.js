const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // change if needed
  password: "tahira123",          // put your password if any
  database: "project" // your DB name
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// ✅ Submit route (STORE DATA)
app.post("/submit", (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("Error saving message");
      }

      console.log("Saved:", name, email);
      res.send("Message saved successfully ✅");
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});