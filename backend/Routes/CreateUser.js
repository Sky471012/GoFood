const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return all validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // 🔥 Hash the password before saving
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash password


      await User.create({
        name: req.body.name,
        password: hashedPassword, // Save hashed password
        email: req.body.email,
        address: req.body.address,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let email = req.body.email;
    let password = req.body.password;

try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct email!" });
      }

      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect password!" }] });
      }

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;