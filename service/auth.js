const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "change-me";

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = { setUser, getUser };
