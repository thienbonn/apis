const express = require('express');
const multer = require("multer")

const routerLogIn = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routeLogin = require("../app/Controllers/Login")
const middleware = require('../app/middleware/Middleware')

routerLogIn.post("/login-Account", routeLogin.signUp)
routerLogIn.post("/register_Account", upload.single('avatar'), routeLogin.register)
routerLogIn.post("/post_create", routeLogin.Create)


module.exports.routerLogIn = routerLogIn