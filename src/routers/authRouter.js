const express = require('express');
const runValidation = require('../validators');
const { handleLogin, handleLogout } = require('../controllers/authController');
const { isLogedOut, isLoggedIn } = require('../middlewares/auth');
const authRouter = express.Router();


authRouter.post('/login',isLogedOut, handleLogin)
authRouter.post('/logout',isLoggedIn, handleLogout)



module.exports = authRouter