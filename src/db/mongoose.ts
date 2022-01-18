import mongoose from "mongoose";
import chalk from "chalk";

const MONGODB_URL = process.env.MONGODB_URL || "";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(
      chalk.blue.italic("database is connected via mongoose...")
      // chalk.blueBright.inverse.italic("database is connected via mongoose...")
    );
  })
  .catch((e) => {
    console.log(chalk.hex("#ff5f33")(e));
    console.log(e);
  });
