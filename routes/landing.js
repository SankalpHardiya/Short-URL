const express = require("express");
const router  = express.Router();

// Public landing page
router.get("/", (_req, res) => res.render("welcome"));

module.exports = router;
