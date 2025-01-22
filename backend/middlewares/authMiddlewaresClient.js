const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("./catchAsyncError.js");
const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel.js");

exports.isAuthenticatedClient = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.client = await Client.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.client.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.client.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
