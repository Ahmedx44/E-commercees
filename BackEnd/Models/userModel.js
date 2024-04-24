const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  sex: {
    type: String,
    enum: ["male", "female"],
  },
  image: String,
  role: {
    type: String,
    enum: ["admin", "customer", "retailer", "customer assistance"],
    default: "customer",
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    validator: [validator.isMobilePhone, "Please provide a valid phone number"],
    required: [true, "Please provide a phone number"],
  },
  chatId: { type: String },
  location: {
    type: [Number],
    index: "2dsphere",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

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
