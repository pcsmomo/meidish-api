import { NextFunction } from "express";
import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema<UserDocument, UserModel>(
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

interface Token {
  token: string;
}
interface UserType {
  name: string;
  email: string;
  password: string;
  tokens: Token[];
}

/**
 * Not directly exported because it is not recommended to
 * use this interface direct unless necessary
 */
interface UserBaseDocument extends UserType, Document {
  generateAuthToken(): string;
}

// export this for strong type
export interface UserDocument extends UserBaseDocument {}

// For model
export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}

// .methods. : this methods is used by user instances
// No arrow function. It needs to be bound
userSchema.methods.generateAuthToken = async function (
  this: UserBaseDocument
): Promise<string> {
  const user = this;
  const token = jwt.sign(
    { _id: user._id?.toString() },
    process.env.JWT_SECRET || ""
  );

  user.tokens = user.tokens.concat({ token });
  // user.tokens = user.tokens.push({ token })  // it doesn't work
  await user.save();

  return token;
};

// .statics. : Model Methods for uppser case User model
userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to sign in");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to sign in");
  }

  return user;
};

// Hash the plain text password before saving
// Must use a stand function to bind, not an arrow function
userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

export const User = model<UserDocument, UserModel>("User", userSchema);
