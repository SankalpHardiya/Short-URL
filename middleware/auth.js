const { getUser } = require("../service/auth");

function checkAuth(req, _res, next) {
  const token = req.cookies?.token;
  req.user = token ? getUser(token) : null;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role))
      return res.status(403).send("Unauthorized");
    next();
  };
}

module.exports = { checkAuth, restrictTo };
