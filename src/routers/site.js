const express = require('express');
const routerSite = express.Router();

const SiteController = require("../app/Controllers/SiteController")
// console.log(SiteController)

routerSite.use("/chat1",SiteController.index)
routerSite.use("/chat2",SiteController.index1)
routerSite.post("/post1",SiteController.postt);
routerSite.post("/post2",SiteController.postt1);
routerSite.delete("/page1/delete/:id",SiteController.delete)
routerSite.delete("/page2/delete/:id",SiteController.delete1)
routerSite.put("/page1/edit/:id",SiteController.edit)
routerSite.put("/page2/edit/:id",SiteController.edit1)
// routerSite.use("/:slug",SiteController.search)

module.exports.routerSite = routerSite;