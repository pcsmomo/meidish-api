import mongoose from "mongoose";

const MONGODB_URL = "mongodb://127.0.0.1:27017/meidish-api";

mongoose.connect(MONGODB_URL).then(() => {
  console.log("database is connected via mongoose...");
});
