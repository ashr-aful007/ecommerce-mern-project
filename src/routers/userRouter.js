const express = require("express");
const { getUsers, getUserById, deleteUserById, processRegister } = require("../controllers/userController");
const userRouter = express.Router();






//GET: All user profile
userRouter.get('/', getUsers)
userRouter.post('/process-register', processRegister)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)

module.exports = userRouter;