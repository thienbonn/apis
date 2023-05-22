const express = require('express');
const routerNew = express.Router();

const newsController = require("../app/Controllers/NewsController")

routerNew.use("/test",newsController.test)
routerNew.use("/home",newsController.home)
routerNew.use("/:slug",newsController.show)
routerNew.use("/",newsController.index)

module.exports.routerNew = routerNew;