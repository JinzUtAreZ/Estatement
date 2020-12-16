const express = require("express");
const Proforma = require("../modelsmongoose/proformaModel");
const auth = require("../middleware/auth");
const { update } = require("../modelsmongoose/proformaModel");
const router = new express.Router();

router.post("/create", auth, async (req, res) => {
  //const task = new Task(req.body);

  const proforma = new Proforma({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await proforma.save();
    res.status(201).send(proforma);
  } catch (e) {
    res.status(400).send(e);
  }
});

//NOTE: filter withOR = true
router.get("/lists", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.withOR) {
    match.withOR = req.query.withOR === "true";
  }

  if (req.query.sortBy) {
    const query = req.query.sortBy.split(":");
    sort[query[0]] = query[1] === "desc" ? -1 : 1;
  }

  //console.log(req.query.withOR, match);
  //console.log(req.query.limit); // NOTE: number of data to show
  //console.log(req.query.skip); // NOTE: number of pages to skip

  try {
    await req.user
      .populate({
        path: "UserProformas",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.UserProformas);
    //console.log(req.user.UserProformas);
  } catch (e) {
    res.status(500).send();
  }
});

/// FIX: sa taas pa din dadaan dahil sa same routes sila for reference to kapag walang filter
router.get("/lists", auth, async (req, res) => {
  try {
    await req.user.populate("UserProformas").execPopulate();
    //NOTE: UserProformas is in virtual in userModel.js
    res.send(req.user.UserProformas);
    //console.log(req.user.UserProformas);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/perId/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const proforma = await Proforma.findOne({ _id, owner: req.user._id });
    //NOTE: (findOne) id of proforma, id of user owning the proforma
    if (!proforma) {
      return res.status(404).send();
    }

    res.send(proforma);
  } catch (e) {
    res.status(500).send();
  }
});

//FIX: double check ung updates at update
router.patch("/perId/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "serviceType",
    "vessel",
    "registry",
    "blno",
    "outBal",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const proforma = await Proforma.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    //NOTE: (findOne) id of proforma, id of user owning the proforma

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!proforma) {
      return res.status(404).send();
    }

    updates.forEach((update) => (proforma[update] = req.body[update]));
    await proforma.save();

    res.send(proforma);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/perId/:id", auth, async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const proforma = await Proforma.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!proforma) {
      res.status(404).send();
    }

    res.send(proforma);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
