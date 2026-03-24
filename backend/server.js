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
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

// ✅ MySQL connection
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "tahira123",
//   database: "project"
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ DB connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL");
//   }
// });

// ✅ Submit route (with DEBUG)
app.post("/submit", (req, res) => {
  try {
    console.log("📩 Incoming Data:", req.body); // 👈 IMPORTANT DEBUG

    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    console.log("Message received:", name, email, message);
res.send("Message received ✅");

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