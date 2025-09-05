// ───────────────────────────────────────── index.js
require("dotenv").config();                   // ① load .env first

const express       = require("express");
const path          = require("path");
const cookieParser  = require("cookie-parser");

const { checkAuth, restrictTo } = require("./middleware/auth");
const { connectToMongoDB }      = require("./connect");

const landingRoute  = require("./routes/landing");
const staticRoute   = require("./routes/staticRouter");
const urlRoute      = require("./routes/url");
const userRoute     = require("./routes/user");
const URL           = require("./models/url");  // for redirect handler

const PORT = process.env.PORT || 8001;

// ② connect using the URI stored in .env  (connect.js reads it)
connectToMongoDB();

const app = express();

// ── Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

// ── Views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ── Public landing page
app.use("/", landingRoute);

// ── Auth-aware routes
app.use("/url",  restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/",     staticRoute);                // contains /dashboard paths

// ── Redirect handler for every short link
app.get("/:shortId", async (req, res) => {
  const entry = await URL.findOneAndUpdate(
    { shortId: req.params.shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!entry) return res.status(404).send("Not found");
  res.redirect(entry.redirectURL);
});

// ── Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
