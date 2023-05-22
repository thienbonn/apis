const express = require('express');
const router = express.Router();

router.use("/new",require("./news").routerNew);

router.use('/', require("./site").routerSite)


module.exports = router