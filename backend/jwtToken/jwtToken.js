const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + 15 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message: "OTP verified successfully",
    });
  };
  
  module.exports = sendToken;
  