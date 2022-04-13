const userRouter = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/users");
userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
module.exports = userRouter;
