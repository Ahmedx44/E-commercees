const mongoose = require("mongoose");
const validator = require("validator"); //npm install validator
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "name is required"],
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required "],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "please provide valid Email"],
  },
  sex: {
    type: String,
    required: [true, "sex is required"],
    enum: ["male", "female"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["admin", "customer", "retailer", "customer assitance"],
    default: "customer",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  phoneNumber: {
    type: String,
    minlength: 10,
    validator: [validator.isMobilePhone, "please provide valid phone number"],
    required: [true, "please provide phone number"],
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    if (this.password !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Passwords do not match");
    }
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
