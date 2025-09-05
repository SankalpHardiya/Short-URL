// routes/url.js
const express = require("express");
const { generateShortURL, getAnalytics } = require("../controllers/url");
const URL = require("../models/url");      // ← be sure this is the mongoose model
const router = express.Router();

router.post("/", generateShortURL);
router.get("/analytics/:shortId", getAnalytics);

// DELETE a short-URL that belongs to the logged-in user
router.delete("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const doc = await URL.findOneAndDelete({
      shortId,
      createdBy: req.user._id,            // safety: only owner can delete
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
