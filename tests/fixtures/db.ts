import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../src/models/user";

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  name: "Scott",
  email: "scott@example.com",
  password: "test!SCO@#$",
  tokens: [
    { token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET || "") },
  ],
};

export const setupDatabase = async () => {
  await User.deleteMany({});
  await new User(userOne).save();
};
