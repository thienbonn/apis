const db = require('../connects/DBConnect')
const newArticles = {
    // getArticles:  (callback) => {
    getArticles: async (callback) => {
        //    return db.query('select * from articles, articlesContent where articlesContent.articleID = articles.articleID',callback)
        try {
             const [rows] = await db.query('select * from articles, articlesContent where articlesContent.articleID = articles.articleID');
             callback(null, rows)
        } catch (error) {
            console.error("Error registering account:", error);
            callback(error, null);
        }
    }
}

module.exports = newArticles