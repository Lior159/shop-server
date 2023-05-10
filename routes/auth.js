const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/users",
  [
    body(
      ["firstName", "lastName", "password", "passwordConfirm", "email"],
      "Empty fields are not allowd"
    )
      .trim()
      .not()
      .isEmpty(),
    body("email", "Invalid email adress").isEmail(),
    body("password", "password allowd only 8 characters - asci")
      .isAscii()
      .isLength({ min: 8 }),
    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be matched");
      }
      return true;
    }),
  ],
  authController.createUser
);

router.get("/users/:userId", authController.fetchUser);

module.exports = router;
