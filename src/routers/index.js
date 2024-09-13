const express = require('express');
const router = express.Router();

// router.use("/new",require("./news").routerNew);

router.use('/', require("./site").routerSite);
router.use('/', require("./login").routerLogIn);
router.use('/', require("./article").routerArticles);
router.use('/', require("./news").routerNew);


module.exports = router