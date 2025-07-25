import { Request, Response } from "express";
import { handleError } from "../utils/errorHandling";
import UserModel from "../models/users";
import { encryptPassword } from "../utils/hashPassword";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password"); // or only use "email username" to get these fields (see Postman)
    res.status(users.length === 0 ? 204 : 200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const getUserByUN = async (req: Request, res: Response) => {
  try {
    const search = req.params.search;
    const user = await UserModel.findOne({ username: search }).select(
      // perhaps consider lowercase handling with regex
      "-password"
    );
    if (user) {
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "no user found" });
  } catch (error) {
    handleError(error, res);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "both email and password are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "user already exists" });
    }
    const encryptedPassword = await encryptPassword(password);
    console.log(encryptedPassword);
    const newUser = await UserModel.create({
      ...req.body,
      password: encryptedPassword,
    });
    console.log(newUser);
    //  res.status(201).json({ success: true, _id: newUser.id });
    res.status(201).json({
      user: {
        email: newUser.email,
        username: newUser.username,
        _id: newUser._id,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params._id;
    const body = req.body;
    console.log(_id, body);

    const updateUser = await UserModel.findByIdAndUpdate(_id, body, {
      new: true,
    }).select("-password -updatedAt");
    res.status(200).json(updateUser);
  } catch (error) {
    handleError(error, res);
  }
};
