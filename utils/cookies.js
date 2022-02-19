//--------------------
// Helper Functions
//--------------------
// Get token from model, create cookie and send response
const attachCookiesToResponse = (user, statusCode, res) => {
  // Create Token
  const token = user.getSignedJwtToken();

  // cookie options
  const options = {
    // To prevent Cross-Site Scripting Attacks: to ensure that the Browser cannot modify the cookie in any condition
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    // this code ensures, the cookie will be sent only through https:// while in production
    // thus, we can still send cookies in development with http:// for testing
    secure: process.env.NODE_ENV === "production",
  };

  // Sending Cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// Export
module.exports = { attachCookiesToResponse };
