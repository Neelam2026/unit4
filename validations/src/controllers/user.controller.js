const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post(
  "/",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 characters"),
  body("last_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Last Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Last Name must be at least 3 characters"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .bail()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .bail()
    .withMessage("pincode can not be empty")
    .isNumeric()
    .bail()
    .withMessage("Pincode must be a number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Provide correct pincode"),
  body("gender")
    .not()
    .isEmpty()
    .bail()
    .withMessage("fill gender")
    .custom((value) => {
      if (value === "female" || value === "male" || value === "others") {
        return true;
      }
      throw new Error("gender should be male/female/others");
    }),

  async (req, res) => {
    try {
      // console.log(body("first_name"));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;
