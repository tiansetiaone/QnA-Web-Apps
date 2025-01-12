const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../config/db");
const i18n = require("i18next");

// Middleware untuk memverifikasi token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired at:", err.expiredAt);
        return res.status(401).json({ error: "Token has expired" });
      }
      console.log("Token verification error:", err);
      return res.status(403).json({ error: "Invalid token" });
    }
    console.log("Token is valid:", decoded);
    req.user = decoded;
    next();
  });
};

// Middleware untuk memverifikasi role admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }
  next();
};

// Middleware untuk melindungi rute dengan token JWT
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Query database untuk memastikan pengguna ada
    const sql = `
    SELECT u.id, u.username, u.role, s.language 
    FROM users u 
    LEFT JOIN settings s ON u.id = s.user_id 
    WHERE u.id = ?`;

    db.query(sql, [decoded.id], (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.user = {
        id: results[0].id,
        username: results[0].username,
        role: results[0].role,
        language: results[0].language || "id", // Default ke bahasa Inggris
      };
      console.log("User role from protect middleware:", req.user.role);
      // Ubah bahasa sesuai dengan pengaturan user
      i18n.changeLanguage(req.user.language); // Memastikan bahasa sesuai user
      console.log("User language set to:", req.user.language);
      next();
    
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid token" });
  }
};
