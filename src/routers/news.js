const express = require('express');
const routerNew = express.Router();
// const middleware = require('../app/middleware')

const newsController = require("../app/Controllers/NewsController")
const middleware = require('../app/middleware/Middleware')

routerNew.get("/views",newsController.views)
routerNew.get("/news",newsController.news)
routerNew.delete("/article/delete:id",newsController.deleteCourse)
routerNew.get("/trash",newsController.trash)
routerNew.use("/recove/article:id",newsController.recove)
routerNew.post("/createIs",newsController.createIs)
routerNew.use("/checkedAll:checked", middleware.check ,newsController.check)
routerNew.get("/sort",newsController.sort)

module.exports.routerNew = routerNew;