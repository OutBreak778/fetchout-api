import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 7 * 60 * 1000,
  max: 5,
  message: "Too many attempts, try again later.",
});
