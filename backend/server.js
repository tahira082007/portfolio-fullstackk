const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",      // your MySQL username
    password: "",      // your MySQL password
    database: "portfolio",
    port: 3307
});

db.connect(err => {
    if (err) {
        console.log("Database error:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// Contact form endpoint
app.post("/submit", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.send("Please fill in all fields!");
    }

    const sql = "INSERT INTO contacts (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error saving data");
        }
        res.send("Data saved successfully!");
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
