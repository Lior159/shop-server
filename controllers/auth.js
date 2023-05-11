const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

///POST - SIGN-IN
exports.signIn = (req, res) => {
  //gets validation errors
  const errors = validationResult(req).array();

  //if there's some validation errors
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid field",
      errors: errors.map((err) => {
        return { field: err.path, message: err.msg };
      }),
    });
  }

  //fetch user from DB
  User.findOne({ email: req.body.email })
    .then((user) => {
      //if user not exist
      if (!user) {
        return res.status(400).json({ message: "Email not exist" });
      }

      //validate password
      bcrypt.compare(req.body.password, user.password).then((isMatched) => {
        if (!isMatched) {
          //wrong password
          return res.status(400).json({ message: "Wrong password" });
        } else {
          //correct password
          return res
            .status(200)
            .json({ message: "Valid user and password", userId: user._id });
        }
      });
    })
    .catch((err) => {
      //db error
      res.status(502).json({ message: err.message });
    });
};

///POST - SIGN-UP
exports.signUp = async (req, res) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid field",
      errors: errors.map((err) => {
        return { field: err.path, message: err.msg };
      }),
    });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    user = await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId: user._id.toString(),
    });
  } catch (err) {
    res.status(502).json({ message: err.message });
  }
};
