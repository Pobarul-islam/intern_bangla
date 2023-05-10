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

      required: [true, "Email is require"],
      unique: true,
      validator: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
    },
    location: {
      type: String,
      default: "Bangladesh",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
