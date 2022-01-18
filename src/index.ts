import express, { Request, Response } from "express";
import "./db/mongoose";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there");
});

app.listen(port, () => {
  console.log("Server is on port " + port);
});
