const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const Card = require("../models/cardModel.js");
const fs = require("fs");
const sendMail = require("../utils/nodemailer.js");
 const bcrypt = require("bcryptjs")
const sendToken = require("../jwtToken/jwtToken.js");
const  List  = require("../models/listModel");


function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}
  
exports.userOTPController = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const otp = generateOTP(); 
  let user = await User.findOne({ email });

  if (user) {
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; 
    await user.save();
  } else {
    user = new User({
      email,
      otp,
      otpExpiresAt: Date.now() + 10 * 60 * 1000, 
    });
    await user.save();
  }

  await sendMail(email, otp, "OTP");

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});
exports.loginController = catchAsyncErrors(async(req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP has expired" });
  }

  const isOtpValid = await user.compareOTP(otp);
  if (!isOtpValid) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
  sendToken(user, 200, res);
});

exports.cardController = catchAsyncErrors(async (req, res) => {
  try {
    const cards = await Card.find().sort({ position: 1 }); 
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cards", error });
  }
});

exports.saveLayoutController = catchAsyncErrors(async (req, res) => {

    const { layout  } = req.body;
    console.log(layout)
    if (layout && Array.isArray(layout)) {
      console.log("Saving layout to database...");
      const savePromises = layout.map((card, index) =>
        Card.findByIdAndUpdate(card._id, { position: index + 1 })
      );
  
      await Promise.all(savePromises);
  
      return res.status(200).json({ message: "Layout saved successfully" });
    }
  
    res.status(400).json({ message: "Invalid layout data" });
  });
exports.listController = catchAsyncErrors(async (req,res)=>{
  const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    const listIds = card.lists;
    const lists = await List.find({ _id: { $in: listIds } });
    return res.status(200).json({ lists });
  
  })