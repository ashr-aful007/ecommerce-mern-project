const express = require("express");
const { getUsers, getUserById, deleteUserById,
      processRegister, activateUserAccout,
       updateUserById } = require("../controllers/userController");
const upload = require("../middlewares/uploadFille");
const { validateUserRegistration } = require("../validators/auth");
const { runValidation } = require("../validators");
const { isLoggedIn, isLogedOut } = require("../middlewares/auth");
const userRouter = express.Router();






//user Router
userRouter.get('/', getUsers)
userRouter.post('/process-register',
 upload.single("image"),
 isLogedOut,
 validateUserRegistration,runValidation, processRegister)
userRouter.post('/verify',isLogedOut, activateUserAccout);
userRouter.get('/:id',isLoggedIn, getUserById)
userRouter.delete('/:id',isLoggedIn, deleteUserById)
userRouter.put('/:id',upload.single("image"), updateUserById)

module.exports = userRouter;