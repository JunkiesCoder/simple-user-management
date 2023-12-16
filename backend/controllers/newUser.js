import { userModel } from "../model/userModel.js";
import { addUserModel } from "../model/addUser.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const newUser = async (req, res) => {
  try {
    const createToken = (_id) => {
      return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
    };
    const name = req.body.formData.name;
    const email = req.body.formData.email;
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      const token = createToken(existUser._id);
      const existUserId = existUser._id;
      res.json({ id: existUserId, token });
    } else {
      const newUser = await userModel.create({
        name,
        email,
      });
      const token = createToken(newUser._id);
      res
        .status(200)
        .json({ message: "New user is created", id: newUser._id, token });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await addUserModel.findOne({ userId: id });
    res.json(userData.users);
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded._id;
    await userModel.findById(userId).then((user) => {
      if (user) {
        return res.status(200).json({ token: true });
      } else {
        return res.json({ token: false });
      }
    });
  } catch (error) {
    return res.json({ user: false });
  }
};
