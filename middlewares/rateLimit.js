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