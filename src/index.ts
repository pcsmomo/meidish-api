import express, { Request, Response } from "express";
import chalk from "chalk";
import "./db/mongoose";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there");
});

app.listen(port, () => {
  console.log(chalk.blue.italic("Server is on port " + port));
});
