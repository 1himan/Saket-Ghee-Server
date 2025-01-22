const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authCheck = (req, res, next) => {
  console.log("The cookie is here mothafucka", req.cookies);
  const token = req.cookies.authToken; // Read the cookie

  if (!token) {
    console.log("There isn't any fucking token here sent by frontend pal.");
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Not authenticated" });
  }

  try {
    console.log("This fucking runs - the token is here mothafucka");
    const decoded = jwt.verify(token, JWT_SECRET); // Validate the token
    req.user = decoded; // Attach user information to the request object
    console.log("And this is the fucking user", req.user);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res
      .status(403)
      .json({ isAuthenticated: false, message: "Invalid or expired token" });
  }
};

module.exports = authCheck;
