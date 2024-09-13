const express = require('express');
const routerArticles = express.Router();

const articles = require('../app/Controllers/articles')
const middleware = require('../app/middleware/Middleware')

routerArticles.use('/GET_articles',middleware.authenticate ,articles.getArticles);

module.exports.routerArticles = routerArticles


