import { addUserModel } from "../model/addUser.js";

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const editId = req.body.formData.id;
    const name = req.body.formData.name;
    const email = req.body.formData.email;
    await addUserModel.findOneAndUpdate(
      { userId: id, "users._id": editId },
      { $set: { "users.$.name": name, "users.$.email": email } }
    );
    res.json({ message: "User Data updated" });
  } catch (error) {
    console.log(error.message);
  }
};
