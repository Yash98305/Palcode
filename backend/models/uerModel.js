const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { timeStamp } = require("console");

const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String, 
  },
  otpExpiresAt: {
    type: Date, 
  },
  
},
{timeStamp : true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) {
    next();
  }

  this.otp = await bcrypt.hash(this.otp, 10);
});


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {});
};
userSchema.methods.compareOTP = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};
module.exports = mongoose.model("User", userSchema);