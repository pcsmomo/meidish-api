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

      const token = await user.generateAuthToken();

      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// Sign in
userRouter.post(
  "/users/signin",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();

      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  }
);
