import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: "Invalid Authorization" });
  }
};
