const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/create-pdf", (req, res) => {
  console.log();
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${__dirname}/documents/result.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/documents/result.pdf`);
  //res.sendFile(`${__dirname}/result.pdf`);
});

module.exports = router;
