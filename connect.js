const mongoose = require("mongoose");

async function connectToMongoDB() {
  // ① read from env, else fall back to local Mongo
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/short-url";

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected:", uri);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = { connectToMongoDB };
