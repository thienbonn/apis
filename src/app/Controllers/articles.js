const getArticless = require('../../models/articles')
class Alticles {
    getArticles(req,res){
        getArticless.getArticles((error,articless)=> {
            // console.log(error)
            if(error ){
               return res.json(error)
            } else {
                // console.log('success')
               return res.send(articless)
            }
        })
    };
};
module.exports = new Alticles;