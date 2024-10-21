const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // Get token after "Bearer"

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Set user data in the request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
