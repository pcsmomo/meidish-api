import { Document, Model, model, Schema } from "mongoose";

interface UserType {
  name: string;
  email: string;
  password: string;
}

/**
 * Not directly exported because it is not recommended to
 * use this interface direct unless necessary
 */
export interface UserDocument extends UserType, Document {}

// For model
export interface UserModel extends Model<UserDocument> {}

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
  },
  {
    timestamps: true,
  }
);

export const User = model<UserDocument, UserModel>("User", userSchema);
