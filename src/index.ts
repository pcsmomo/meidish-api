import fs from "fs";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";

import { app } from "./app";

const port = process.env.PORT;

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.listen(port, () => {
  console.log(chalk.blue.italic("Server is on port " + port));
});
