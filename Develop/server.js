// Import express package
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 4001;

// Initialize our app variable by setting it to the value of express()
const app = express();

function readNotes() {
  const noteData = fs.readFileSync(
    path.join(__dirname, "./db/db.json"),
    "utf-8"
  );

  return JSON.parse(noteData);
}

// return the notes saved in db.json
app.get("/api/notes", (req, res) => {
  res.json(readNotes());
});

app.get("/notes", (req, res) => {
  // `res.sendFile` is Express' way of sending a file
  // `__dirname` is a variable that always returns the directory that your server is running in
  res.sendFile(__dirname + "/public/notes.html");
});

// deliver static assets
app.use("/assets", express.static(__dirname + "/public/assets"));

// Add a default route for index.html
app.get("*", (req, res) => {
  // `res.sendFile` is Express' way of sending a file
  // `__dirname` is a variable that always returns the directory that your server is running in
  res.sendFile(__dirname + "/public/index.html");
});

// Launch the express app
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
