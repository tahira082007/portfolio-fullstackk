const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
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

app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO contacts (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error saving data");
      return;
    }
    res.send("Data saved successfully!");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});