const express = require('express');
const routerSite = express.Router();

const SiteController = require("../app/Controllers/SiteController")
const middleware = require('../app/middleware/Middleware')

routerSite.use("/chat",middleware.authenticate,require("../app/Controllers/SiteController").index)
routerSite.post("/post:id",middleware.authenticate,SiteController.post);
routerSite.delete("/page:id/:deleteId",middleware.authenticate,SiteController.delete)
routerSite.put("/page:id/edit/:fixId",middleware.authenticate,SiteController.edit)
routerSite.post("/comments/parent",middleware.authenticate,SiteController.comments)
routerSite.get("/getComment",middleware.authenticate,SiteController.getComment)
routerSite.get("/notifications:id",middleware.authenticate,SiteController.notification)
routerSite.get("/notifications/bell:id",middleware.authenticate,SiteController.notificationBell)
routerSite.get("/notifications/number:id",middleware.authenticate,SiteController.notificationTotal)
routerSite.post("/watchedMessages",SiteController.watchedMessage)
routerSite.put("/DeleteComment",SiteController.DLTComment)

module.exports.routerSite = routerSite;