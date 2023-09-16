const express = require("express");
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccout } = require("../controllers/userController");
const userRouter = express.Router();






//user Router
userRouter.get('/', getUsers)
userRouter.post('/process-register', processRegister)
userRouter.post('/verify', activateUserAccout);
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)

module.exports = userRouter;