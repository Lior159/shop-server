const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.fetchUser = (req, res) => {
  console.log(req.params.userId);
  console.log("get");
  res.json({
    name: "lior",
  });
};

exports.createUser = (req, res) => {
  console.log("post");
  console.log(req.body);

  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0].msg });
  }
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  User.findOne({ email })
    .then((u) => {
      if (u) {
        throw new Error("Email already exist");
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        password: hashedPassword,
        email,
      });

      return user.save();
    })
    .then((res) => {
      res.status(201).json({ userId: res._id.toString() });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
