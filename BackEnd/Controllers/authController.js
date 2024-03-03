const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await UserActivation.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    roles: req.body.roles,
  });
  createSendToken(newUser, 200, res);
});
