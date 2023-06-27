const express = require('express');

const routerLogIn = express.Router()

const routeLogin = require("../app/Controllers/Login")
// console.log("login:",routeLogin)

routerLogIn.post("/login-Account", routeLogin.signUp)
routerLogIn.post("/post_create", routeLogin.Post)

// routerLogIn.post("/signUp",routeLogin.signUp)

module.exports.routerLogIn = routerLogIn