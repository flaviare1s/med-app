import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log("Auth middleware - Token received:", token ? "Yes" : "No");

  if (!token) {
    console.log("Auth middleware - No token provided");
    return res.status(401).json({ error: "Access Denied!" });
  }

  try {
    const decoded = jwt.verify(token, "you-secret-key");
    req.doctorId = decoded.doctorId;
    console.log("Auth middleware - Token valid, doctorId:", decoded.doctorId);
    next();
  } catch (error) {
    console.log("Auth middleware - Invalid token:", error.message);
    res.status(401).json({ error: "Invalid token!" });
  }
}

export default verifyToken;
