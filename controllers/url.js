const shortid = require("shortid");
const URL = require("../models/url");

// controllers/url.js
async function generateShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });

    const shortId = shortid();
    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    // Store latest id in session-like flash via query-param
    return res.redirect("/dashboard?new=" + shortId); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function getAnalytics(req, res) {
  try {
    const { shortId } = req.params;
    const url = await URL.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });

    return res.json({
      totalClicks: url.visitHistory.length,
      analytics: url.visitHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { generateShortURL, getAnalytics };
