const express = require("express");
const userRouter = express.Router();
const {
	createUser,
	getUser,
	updateUser,
	deleteUser,
} = require("../controllers/userController");

userRouter.post("/createUser", createUser);
userRouter.get("/users", getUser);
userRouter.put("/updateUser/:id", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);
module.exports = userRouter;
