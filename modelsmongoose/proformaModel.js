const mongoose = require("mongoose");
const validator = require("validator"); //NOTE: for complex validating
const User = require("./usersModel");

const profDetailSchema = new mongoose.Schema(
  {
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    // IMPORTANT: owner is reserved word in mongodb kaya d gumana ung sa taas
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    withOR: {
      type: Boolean,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    vessel: {
      type: String,
      required: true,
    },
    registry: {
      type: String,
      required: true,
    },
    blno: {
      type: String,
      required: true,
    },
    outBal: {
      type: mongoose.Decimal128,
      required: true,
    },
    profId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Proforma = mongoose.model("Proforma", profDetailSchema);

module.exports = Proforma;

// IMPORTANT: manual entry of data in ROBO3t, sa terminal execute node servermongoose.js in root folder

//NOTE: code below can be used to create mongo table quickly
//const profDetailSchema = mongoose.model("Proforma", { })

// const me = new ProformaDetails({
//   clientId: "953",
//   serviceType: "ARRASTRE",
//   vessel: "VESSEL-20002",
//   registry: "GERGER0002",
//   blno: "LBLBNo000002",
//   outBal: 321564009,
//   profId: "PFAX00002",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });
