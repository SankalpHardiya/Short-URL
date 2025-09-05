// routes/static.js
const express = require("express");
const router  = express.Router();
const URL     = require("../models/url");
const { restrictTo } = require("../middleware/auth");

// Admin dashboard (optional)
router.get("/dashboard/admin", restrictTo(["ADMIN"]), async (_req, res) => {
  const urls = await URL.find({});
  res.render("home", { urls, id: null });
});

// Main dashboard for NORMAL + ADMIN
router.get("/dashboard", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  res.render("home", { urls, id: null });
});

// Existing public pages
router.get("/signup", (_req, res) => res.render("signup"));
router.get("/login",  (_req, res) => res.render("login"));

module.exports = router;
