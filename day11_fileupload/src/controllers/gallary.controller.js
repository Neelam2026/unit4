const express = require("express");
const router = express.Router();
const Gallary = require("../models/gallary.model");
const upload = require("../middleware/upload");
const fs = require('fs');

router.get("", async (req, res) => {
  try {
    const gallary = await Gallary.find()
      .populate({
        path: "user_id",
      })
      .lean()
      .exec();

    return res.status(200).send(gallary);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/:user_id", upload.any("profile_pic", 5), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });

    const gallary = await Gallary.create({
      profile_pic: filePaths,
      user_id: req.params.user_id,
    });

    return res.status(200).send(gallary);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//not working properly

router.patch("/:user_id", upload.any("profile_pic", 5), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });

    let data = {
      profile_pic: filePaths,
      user_id: req.params.user_id,
    };
    let gallary = await Gallary.findById(req.params.user_id);
    let file = gallary.profile_pic;

    for (let i in file) {
      fs.unlink(file[i], (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    }
    let gly = await Gallary.findByIdAndUpdate(req.params.user_id, data, {
      new: true,
    });
    return res.status(200).send(gly);
  } catch (error) {
    return res.status(500).send({ mesage: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let gallary = await Gallary.findById(req.params.id);

    let images = gallary.profile_pic;
    console.log(images);
    for (let i in images) {
      console.log("pagal", i);
      console.log("pagal oart", images[i]);
      fs.unlink(images[i], (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    }
    await Gallary.findByIdAndDelete(req.params.id);
    return res.status(200).send(gallary);
  } catch (error) {
    return res.status(500).send({ message: error.mesage });
  }
});

module.exports = router;
