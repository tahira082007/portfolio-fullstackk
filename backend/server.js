const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
// const mysql = require("mysql2");
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Correct frontend path
// Serve files from main folder
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

// ✅ MySQL connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tahira123",
  database: "project"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Submit route (with DEBUG)
app.post("/submit", (req, res) => {
  console.log("📩 Incoming Data:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("❌ DB ERROR:", err);
      return res.status(500).send("Database error ❌");
    }

    console.log("✅ Data inserted:", result);
    res.send("Message stored successfully ✅");
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});