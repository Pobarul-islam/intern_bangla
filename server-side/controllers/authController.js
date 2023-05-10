import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validate
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and greater than 6 character");
  }

  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    next("Email Already Registerd Please Login");
  }
  const user = await userModel.create({ name, email, password });
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user,
  });
};
