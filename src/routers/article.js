const express = require('express');
const routerArticles = express.Router();

const articles = require('../app/Controllers/articles')

routerArticles.use('/GET_articles',articles.getArticles);

module.exports.routerArticles = routerArticles


