const db = require('../connects/DBConnect')
const newArticles = {
    getArticles : (callback) =>{
       return db.query('select * from articles, articlesContent where articlesContent.articleID = articles.articleID',callback)
    }
}

module.exports = newArticles