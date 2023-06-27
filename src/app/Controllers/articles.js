const getArticless = require('../../models/articles')
class Alticles {
    getArticles(req,res){
        getArticless.getArticles((error,articless)=> {
            if(error){
                res.json(error)
            } else {
                res.send(articless)
            }
        })
    };
};
module.exports = new Alticles;