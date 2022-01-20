import { Document, Model, model, Schema } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
