const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../Models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expire: new Date(Date.now() + process.env.JWT_COOKIR_EXPIRE),
    httpOnly: true,
  };
  user.password = undefined;

  res.cookie("jwt", token, cookieOption);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  createSendToken(newUser, 200, res);

  next();
});

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   //check if the user insert password and email
//   if (!email || !password) {
//     return next(new AppError("please provide email and passworrrd"));
//   }

//   //Check if user exists
//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await User.correctPassword(password, user.password))) {
//     return next(new AppError("Incorrect email and password", 400));
//   }
//   createSendToken(User, 200, "user login", res);
// });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if the user insert password and email
  if (!email || !password) {
    return next(new AppError("please provide email and passworrrd"));
  }

  //Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await User.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 400));
  }
  createSendToken(User, 200, "user login", res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
