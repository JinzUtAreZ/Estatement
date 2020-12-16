const express = require("express");
const app = express();
const config = require("./connect/connect");

// IMPORTANT: ayaw sa ibang routes ng fileupload kaya dito ko muna nilagay dahil req.files = undefined
// NOTE: file-upload syntax
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.post("/uploadfiles", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  //console.log(req.files);
  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// NOTE: initialize middleware for saving, update
app.use(express.json({ extended: false }));

// NOTE: initialize routers for database //

app.use("/api/soa/pdf", require("./routes/pdfsoa"));
app.use("/api/soa", require("./routes/soa"));
// FIX: Pending yung code sa baba
//app.use("/api/proforma", require("./routes/proformahttp"));

app.listen(config.port(), function () {
  var datenow = new Date();
  var message = "Server running " + config.port() + " starting: " + datenow;
  console.log(message);
});
