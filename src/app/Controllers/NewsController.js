const { response } = require('express');
const newView = require('../../models/new')
class NewsController {


    news(req, res, next) {
        // console.log('checkinput',req.query.hasOwnProperty(''))
        newView.getArticle((error, newViews) => {
            // console.log('newViews ::', )
            const articles = newViews.data
            const totalDelete = newViews.dataTotal
            if (error) {
                res.json(error);
            } else {
                res.render("news", { data: articles, total: totalDelete})
            }
        })

    }
    views(req, res, next) {
        newView.viewss((error, result) => {
            // console.log('result :', result?.data)
            const neww = result?.data
            if (error) {
                res.json(error)
            } else {
                res.render("home", { course: neww })
            }
        })
        // const renderFile = path.join(__dirname,"..","..","resources","views")
        // res.sendFile(renderFile)
    };
    deleteCourse(req, res, next) {
        const input = req.params
        // console.log(input)
        newView.deleteArticle(input, (error, respontent) => {
            const data = respontent.data
            // console.log(data)
            if (error) {
                res.json(error);
            } else {
                res.render("news", { data: data });
            }
        })
    }
    trash(req, res, next) {
        // console.log('trash');
        newView.articlesSaveTheTrash((err, response) => {
            // console.log('response :', response)
            const articles = response?.data
            if (err) {
                res.json(err);
            } else {
                res.render('recovery', { data: articles })
            }
        })
    }
    recove(req, res, next) {
        const id = req.params.id
        // console.log('id:', id)
        newView.recoveryArticle(id, (err, articles) => {
            const data = articles.data
            if (err) {
                res.json(err)
            } else {
                res.render('recovery', { data: data })
            }
        })
    }
    createIs(req, res, next) {
        const input = req.body
        newView.createArticle(input, (error, data) => {
            if (error) {
                res.json(error)
            } else {
                res.send('New article added successfully')
            }
        })
    }
    check(req, res, next) {
        // console.log('check', req.params)

        const { checked } = req.params

        newView.getArticleCopy((error, response) => {
            // console.log('response', response)
            const articles = response?.data
            const totalDelete = response?.dataTotal
            // let checkedss = 9
            // if(checked === 'true'){
            // console.log('bỏ check')
            //     check = ""
            // }else {
            // console.log('check vào')
            //     check = "checked"
            // }
            // console.log('checked', articles)
            if (error) {
                res.json(error)
            } else {
                // console.log('checked', articles)
                res.render("news", { data: articles, total: totalDelete })
            }
        })
    }
    sort(req,res,next){
        const input = req.query
        newView.getArticleFromTimeToTime(input, (error, response) => {
            const data = response?.data
            if(error) {
                res.json(error);
            }else {
                res.render('news', {data})
            }
        })
        // console.log("request ::" , req.query)
    }
}

module.exports = new NewsController;
