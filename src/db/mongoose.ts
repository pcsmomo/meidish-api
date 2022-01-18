import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("database is connected via mongoose...");
  })
  .catch((e) => console.log(e));
