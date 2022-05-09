const express = require("express");
const fs = require("fs");
const multer = require("multer");

const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/upload",
  multer({
    dest: "tmp/",
    limits: { fieldSize: Infinity },
  }).single("file"),
  (req, res) => {
    const filename = req.body.filename;
    const content = fs.readFileSync(req.file.path, "utf-8");
    console.log(filename);
    res.send(filename + ": " + content);
  }
);

app.listen("3000", () => {
  console.log("Application started");
});
