const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema({
  clientid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: Number,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  clientname: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 40,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});
