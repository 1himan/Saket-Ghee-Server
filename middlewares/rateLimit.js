// Import the rate limit module
const rateLimit = require("express-rate-limit");

// Define rate limiter for login attempts
// This middleware limits the number of requests a user can make to the server
// within a specified time window to prevent brute force attacks on the login endpoint
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window (15 minutes)
  max: 5, // Max attempts allowed within the time window
  message: {
    message: "Too many request attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Export the rate limiter to be used in other parts of the application
module.exports = rateLimiter;