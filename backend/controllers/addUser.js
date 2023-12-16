import mongoose from "mongoose";
import { addUserModel } from "../model/addUser.js";

export const addUser = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.formData.name;
    const email = req.body.formData.email;
    const existUser = await addUserModel.findOne({ userId: id });
    const existNewUser = await addUserModel.findOne(
      { userId: new mongoose.Types.ObjectId(id) },
      { users: { $elemMatch: { email: email } } }
    );
    if (existUser) {
      if (existNewUser.users.length === 0) {
        await addUserModel.findOneAndUpdate(
          { userId: id },
          {
            $push: {
              users: {
                name,
                email,
              },
            },
          }
        );
        res.json({ message: "New user added" });
      } else {
        res.json({ message: "This email is already exist" });
      }
    } else {
      addUserModel.create({
        userId: id,
        users: [
          {
            name,
            email,
          },
        ],
      });
      res.status(201).json({ message: "New user created" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
