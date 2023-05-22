const express = require('express');
const routerSite = express.Router();

const SiteController = require("../app/Controllers/SiteController")

routerSite.use("/:slug",SiteController.search)
routerSite.use("/",SiteController.index)

module.exports.routerSite = routerSite;