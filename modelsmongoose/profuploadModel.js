const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator"); //NOTE: for complex validating

const ProformaUpload = mongoose.model("ProfUpload", {
  docType: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 50,
  },
  fileSize: {
    type: Decimal128,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  fileUpload: {
    type: Buffer,
    required: true,
  },
});
