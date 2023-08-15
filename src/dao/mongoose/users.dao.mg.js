import mongoose, { Schema } from "mongoose";
import { DaoMongoose } from "./defaultDaoMongoose.js";

export const SchemaUsers = new mongoose.Schema(
  {
    id: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, min: 14, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
    documents: {
      type: [
        {
          name: String,
          reference: String,
        },
      ],
      default: [],
    },
    photo: { type: String, default: "../api/assets/profile/no-profile.png" },
    cart: { type: String, require: true },
    last_connection: { type: String, required: true },
  },
  { versionKey: false }
);

const userModel = mongoose.model("users", SchemaUsers);

export const umg = new DaoMongoose(userModel);
