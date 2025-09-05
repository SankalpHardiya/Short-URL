// controllers/user.js
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function signup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/login");           // user still needs to log in
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid email or password" });

  const token = setUser(user);
  res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

  return res.redirect("/dashboard");       // ⇐ go to dashboard
}

module.exports = { signup, login };
