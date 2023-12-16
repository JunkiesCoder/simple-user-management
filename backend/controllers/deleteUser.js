import mongoose from "mongoose";
import { addUserModel } from "../model/addUser.js";

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.id;
    
    await addUserModel.findOneAndUpdate(
      { userId: id },
      { $pull: { users: { _id: userId } } }
    );
    res.json({ message: "User data deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
