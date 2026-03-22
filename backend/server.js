const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const https = require("https");
const fs = require("fs");

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

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tahira123",
  database: "project"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// Submit route
app.post("/submit", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving message");
      }

      res.send("Message saved successfully ✅");
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

// 🔐 HTTPS server
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS Server running at https://localhost:3000");
});