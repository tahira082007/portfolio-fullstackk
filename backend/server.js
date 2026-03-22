const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Correct frontend path
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ MySQL connection
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
  try {
    console.log("📩 Incoming Data:", req.body); // 👈 IMPORTANT DEBUG

    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.error("❌ DB Error FULL:", err); // 👈 FULL ERROR
        return res.status(500).send("Error saving message");
      }

      console.log("✅ Message Saved:", name, email);
      res.send("Message saved successfully ✅");
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    res.status(500).send("Something went wrong");
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});