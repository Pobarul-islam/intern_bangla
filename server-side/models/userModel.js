import mongoose from "mongoose";
import validator from "validator";
// schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      email: [true, "Email is require"],
      unique: true,
      validator: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is require"],
    },
    location: {
      type: String,
      default: "Bangladesh",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
