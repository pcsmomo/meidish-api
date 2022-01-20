import express from "express";

import "./db/mongoose";
import { userRouter } from "./routers/user";

export const app = express();

app.use(express.json());
app.use(userRouter);
