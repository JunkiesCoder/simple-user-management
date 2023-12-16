import { Router } from "express";
import { auth } from "../middleware/authentication.js";
import { newUser, getUsers, verifyToken } from "../controllers/newUser.js";
import { addUser } from "../controllers/addUser.js";
import { update } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";

const list = Router();

list.route("/verify-token").post(verifyToken);
list.route("/new-user").post(newUser);
list.route("/users/:id").get(auth, getUsers);
list.route("/users/:id").post(auth, addUser);
list.route("/update/:id").patch(update);
list.route("/delete/:id").patch(deleteUser);

export default list;
