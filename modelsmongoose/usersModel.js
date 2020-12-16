const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Proforma = require("./proformaModel");

const userSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    // age: {
    //   type: Number,
    //   default: 0,
    //   validate(value) {
    //     if (value < 0) {
    //       throw new Error("Age must be a postive number");
    //     }
    //   },
    // },
  },
  { timestamps: true }
);

//NOTE: remover of password and all issued token(s)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secretEstatement");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

/// FIX: hindi gumagana ung delete user dito at sa usermodel
// Delete user proforma when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  console.log(user._id);
  await Proforma.deleteMany({ owner: user._id });
  next();
});

//IMPORTANT: clientId is from proformaModel, while _id is from req.userid._id from db
userSchema.virtual("UserProformas", {
  ref: "Proforma",
  localField: "_id",
  foreignField: "owner",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
