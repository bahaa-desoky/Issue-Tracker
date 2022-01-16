import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

export const signUp = async (request, response) => {
  const { firstName, lastName, email, password, rePassword } = request.body;

  try {
    // verify that the user doesn't exist in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return response.status(400).json({ message: "User already exists." });

    // check password === rePassword
    if (password !== rePassword)
      return response.status(400).json({ message: "Passwords don't match." });

    // hash the password for security purposes, then create the user and token
    const hash = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hash,
    });
    const token = jwt.sign(
      { id: result._id, email: result.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    return response.status(200).json({ result: result, token: token });
  } catch (error) {
    response.status(500).json({ message: "An error occured" });
  }
};

export const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    // verify that the user exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return response.status(404).json({ message: "User does not exist" });

    // otherwise check that the user's password matches the one in the db
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isCorrectPassword)
      return response.status(400).json({ message: "Incorrect password" });

    // everything is good
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    return response.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    response.status(500).json({ message: "An error occured" });
  }
};
