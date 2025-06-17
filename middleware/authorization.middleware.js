import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const RAISE_JWT_SECRET = process.env.RAISE_JWT_SECRET || "your_raise_jwt_secret";

// Original token verification (keep as is)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Invalid or expired token please login again" });
  }
};

// New middleware for raise-specific routes
export const verifyRaiseToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false,
      error: "Access denied. No token provided." 
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, RAISE_JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: "Invalid or expired token. Please authenticate again." 
    });
  }
};

// Function to generate raise-specific JWT
export const generateRaiseToken = (payload, expiresIn = '24h') => {
  return jwt.sign(payload, RAISE_JWT_SECRET, { expiresIn });
};

// Function to generate regular JWT (keep existing functionality)
export const generateToken = (payload, expiresIn = '24h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};