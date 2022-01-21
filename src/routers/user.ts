import { Router, Request, Response } from "express";
import { User } from "../models/user";

export const userRouter = Router();

// Create a user
userRouter.post(
  "/users",
  async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);

    try {
      await user.save();
      res.status(201).send({ user });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// Log in
userRouter.post(
  "/users/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      res.send({ user });
    } catch (e) {
      res.status(400).send();
    }
  }
);
