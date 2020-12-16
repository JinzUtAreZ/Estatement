const express = require("express");
require("./connect/connectmongoose");
const profromaRouter = require("./routesmongoose/proformaRoutes");
const profUploadRouter = require("./routesmongoose/prouploadRoutes");
const usersRouter = require("./routesmongoose/usersRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/mongo/proforma", profromaRouter);
app.use("/mongo/profUpload", profUploadRouter);
app.use("/mongo/client", usersRouter);

app.listen(port, () => {
  var datenow = new Date();
  var message = "Mongo Server running " + port + " starting: " + datenow;
  console.log(message);
});
