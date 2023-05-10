exports.getUsers = (req, res, next) => {
  res.status(200).json({
    name: "lior",
    pass: "123456",
  });
};
