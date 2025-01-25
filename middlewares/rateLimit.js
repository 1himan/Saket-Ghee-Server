// rateLimit.js is a middleware that limits the number of requests a user can make to the server
// within a specified time window. This middleware is used to prevent brute force attacks on 
// the login endpoint. The rate limit is set to 5 requests per 15 minutes. If a user exceeds 
// the rate limit, they will receive an error message indicating that they have made too many 
// requests and should try again after 15 minutes.
const rateLimit = require("express-rate-limit");

// Define rate limiter for login attempts
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window (15 minutes)
  max: 5, // Max attempts allowed within the time window
  message: {
    message: "Too many request attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

module.exports = rateLimiter;